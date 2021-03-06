let PoaNetworkConsensusMock = artifacts.require('./mockContracts/PoaNetworkConsensusMock');
let ProxyStorageMock = artifacts.require('./mockContracts/ProxyStorageMock');
let KeysManagerMock = artifacts.require('./mockContracts/KeysManagerMock');
let VotingToChangeProxyAddress = artifacts.require('./mockContracts/VotingToChangeProxyAddressMock');
let VotingForKeys = artifacts.require('./mockContracts/VotingToChangeKeysMock');
let BallotsStorage = artifacts.require('./mockContracts/BallotsStorageMock');
const ERROR_MSG = 'VM Exception while processing transaction: revert';
const moment = require('moment');

const choice = {
  accept: 1,
  reject: 2
}
require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

let keysManager, poaNetworkConsensusMock, ballotsStorage, voting;
let votingKey, votingKey2, votingKey3;
contract('VotingToChangeProxyAddress [all features]', function (accounts) {
  votingKey = accounts[2];
  masterOfCeremony = accounts[0];
  beforeEach(async () => {
    poaNetworkConsensusMock = await PoaNetworkConsensusMock.new(masterOfCeremony);
    proxyStorageMock = await ProxyStorageMock.new(poaNetworkConsensusMock.address, masterOfCeremony);
    keysManager = await KeysManagerMock.new(proxyStorageMock.address, poaNetworkConsensusMock.address, masterOfCeremony);
    ballotsStorage = await BallotsStorage.new(proxyStorageMock.address);
    await poaNetworkConsensusMock.setProxyStorage(proxyStorageMock.address);
    voting = await VotingToChangeProxyAddress.new(proxyStorageMock.address);
    await proxyStorageMock.initializeAddresses(keysManager.address, masterOfCeremony, masterOfCeremony, voting.address, ballotsStorage.address);
  })
  describe('#createBallotToChangeProxyAddress', async () => {
    let VOTING_START_DATE, VOTING_END_DATE, id;
    beforeEach(async () => {
      await keysManager.addMiningKey(accounts[1]).should.be.fulfilled;
      await keysManager.addVotingKey(votingKey, accounts[1]).should.be.fulfilled;
      VOTING_START_DATE = moment.utc().add(2, 'seconds').unix();
      VOTING_END_DATE = moment.utc().add(30, 'years').unix();
      id = await voting.nextBallotId();
    })
    it('happy path', async () => {
      // uint256 _startTime,
      // uint256 _endTime,
      // address _proposedValue,
      // uint8 _contractType
      const { logs } = await voting.createBallotToChangeProxyAddress(
        VOTING_START_DATE, VOTING_END_DATE, accounts[5], 1, { from: votingKey });
      const startTime = await voting.getStartTime(id.toNumber());
      const endTime = await voting.getEndTime(id.toNumber());
      const keysManagerFromContract = await voting.getKeysManager();

      let votingState = await voting.votingState(id);
      votingState.should.be.deep.equal([
        new web3.BigNumber(VOTING_START_DATE),
        new web3.BigNumber(VOTING_END_DATE),
        new web3.BigNumber(0),
        new web3.BigNumber(0),
        false,
        new web3.BigNumber(1),
        new web3.BigNumber(0),
        new web3.BigNumber(1),
        accounts[5],
        new web3.BigNumber(1)
      ])
      let activeBallotsLength = await voting.activeBallotsLength();
      activeBallotsLength.should.be.bignumber.equal(1);

      let nextBallotId = await voting.nextBallotId();
      nextBallotId.should.be.bignumber.equal(1);

      startTime.should.be.bignumber.equal(VOTING_START_DATE);
      endTime.should.be.bignumber.equal(VOTING_END_DATE);
      keysManagerFromContract.should.be.equal(keysManager.address);
      logs[0].event.should.be.equal("BallotCreated");
      logs[0].args.id.should.be.bignumber.equal(0);
      logs[0].args.creator.should.be.equal(votingKey);
    })
    it('proposed address should not be 0x0', async () => {
      await voting.createBallotToChangeProxyAddress(VOTING_START_DATE, VOTING_END_DATE, '0x0000000000000000000000000000000000000000', 2, { from: votingKey }).should.be.fulfilled.rejectedWith(ERROR_MSG);
    })
    it('can creates multiple ballots', async () => {
      const { logs } = await voting.createBallotToChangeProxyAddress(
        VOTING_START_DATE, VOTING_END_DATE, accounts[5], 1, { from: votingKey });
      const startTime = await voting.getStartTime(id.toNumber());
      const endTime = await voting.getEndTime(id.toNumber());
      const keysManagerFromContract = await voting.getKeysManager();


      let activeBallotsLength = await voting.activeBallotsLength();
      activeBallotsLength.should.be.bignumber.equal(1);

      let nextBallotId = await voting.nextBallotId();
      nextBallotId.should.be.bignumber.equal(1);

      await voting.createBallotToChangeProxyAddress(
        VOTING_START_DATE + 1, VOTING_END_DATE + 1, accounts[5], 2, { from: votingKey });
      let votingState = await voting.votingState(nextBallotId);
      votingState.should.be.deep.equal([
        new web3.BigNumber(VOTING_START_DATE+1),
        new web3.BigNumber(VOTING_END_DATE+1),
        new web3.BigNumber(0),
        new web3.BigNumber(0),
        false,
        new web3.BigNumber(1),
        new web3.BigNumber(1),
        new web3.BigNumber(1),
        accounts[5],
        new web3.BigNumber(2)
      ])
    })
  })

  describe('#vote', async () => {
    let VOTING_START_DATE, VOTING_END_DATE;
    let id;
    beforeEach(async () => {
      VOTING_START_DATE = moment.utc().add(2, 'seconds').unix();
      VOTING_END_DATE = moment.utc().add(30, 'years').unix();
      await proxyStorageMock.setVotingContractMock(accounts[0]);
      await keysManager.addMiningKey(accounts[1]).should.be.fulfilled;
      await keysManager.addVotingKey(votingKey, accounts[1]).should.be.fulfilled;
      id = await voting.nextBallotId();
      await voting.createBallotToChangeProxyAddress(
        VOTING_START_DATE, VOTING_END_DATE, accounts[5], 1, { from: votingKey });
    })

    it('should let a validator to vote', async () => {
      await voting.setTime(VOTING_START_DATE);
      const { logs } = await voting.vote(id, choice.accept, { from: votingKey }).should.be.fulfilled;
      let progress = await voting.getProgress(id);
      progress.should.be.bignumber.equal(1);
      let totalVoters = await voting.getTotalVoters(id);
      totalVoters.should.be.bignumber.equal(1);
      logs[0].event.should.be.equal('Vote');
      logs[0].args.decision.should.be.bignumber.equal(1);
      logs[0].args.voter.should.be.equal(votingKey);
      logs[0].args.time.should.be.bignumber.equal(VOTING_START_DATE);
    })
    it('reject vote should be accepted', async () => {
      await voting.setTime(VOTING_START_DATE);
      const { logs } = await voting.vote(id, choice.reject, { from: votingKey }).should.be.fulfilled;
      let progress = await voting.getProgress(id);
      progress.should.be.bignumber.equal(-1);
      let totalVoters = await voting.getTotalVoters(id);
      totalVoters.should.be.bignumber.equal(1);
      logs[0].event.should.be.equal('Vote');
      logs[0].args.decision.should.be.bignumber.equal(2);
      logs[0].args.voter.should.be.equal(votingKey);
      logs[0].args.time.should.be.bignumber.equal(VOTING_START_DATE);
    })

    it('should allow multiple voters to vote', async () => {
      await voting.setTime(VOTING_START_DATE);
      await voting.vote(id, choice.reject, { from: votingKey }).should.be.fulfilled;
      await keysManager.addVotingKey(accounts[3], accounts[1]).should.be.fulfilled;
      await voting.vote(id, choice.reject, { from: accounts[3] }).should.be.rejectedWith(ERROR_MSG);

      // add new voter
      await keysManager.addMiningKey(accounts[2]).should.be.fulfilled;
      await keysManager.addVotingKey(accounts[4], accounts[2]).should.be.fulfilled;
      await voting.vote(id, choice.reject, { from: accounts[4] }).should.be.fulfilled;

      let progress = await voting.getProgress(id);
      progress.should.be.bignumber.equal(-2);

      let totalVoters = await voting.getTotalVoters(id);
      totalVoters.should.be.bignumber.equal(2);

      await keysManager.addMiningKey(accounts[3]).should.be.fulfilled;
      await keysManager.addVotingKey(accounts[5], accounts[3]).should.be.fulfilled;
      await voting.vote(id, choice.accept, { from: accounts[5] }).should.be.fulfilled;

      progress = await voting.getProgress(id);
      progress.should.be.bignumber.equal(-1);

      totalVoters = await voting.getTotalVoters(id);
      totalVoters.should.be.bignumber.equal(3);
    })
    it('should not let vote nonVoting key', async () => {
      await voting.setTime(VOTING_START_DATE);
      await voting.vote(id, choice.reject, { from: accounts[0] }).should.be.rejectedWith(ERROR_MSG);
    })
    it('should not let vote before startTime key', async () => {
      await voting.setTime(VOTING_START_DATE - 1);
      await voting.vote(id, choice.reject, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
    })
    it('should not let vote after endTime key', async () => {
      await voting.setTime(VOTING_END_DATE + 1);
      await voting.vote(id, choice.reject, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
    })
    it('should not let vote with already voted key', async () => {
      await voting.setTime(VOTING_END_DATE);
      await voting.vote(id, choice.reject, { from: votingKey }).should.be.fulfilled;
      await voting.vote(id, choice.reject, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
    })
    it('should not let vote with invalid choice', async () => {
      await voting.setTime(VOTING_END_DATE);
      await voting.vote(id, 0, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
      await voting.vote(id, 3, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
    })
    it('should not let vote with invalid id', async () => {
      await voting.setTime(VOTING_END_DATE);
      await voting.vote(99, 1, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
      await voting.vote(-3, 1, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
    })
  })

  describe('#finalize', async () => {
    let votingId;
    votingKey = accounts[2];
    votingKey2 = accounts[3];
    votingKey3 = accounts[5];
    let payoutKeyToAdd = accounts[0];
    beforeEach(async () => {
      VOTING_START_DATE = moment.utc().add(2, 'seconds').unix();
      VOTING_END_DATE = moment.utc().add(30, 'years').unix();
      await proxyStorageMock.setVotingContractMock(accounts[0]);
      await keysManager.addMiningKey(accounts[1]).should.be.fulfilled;
      await keysManager.addVotingKey(votingKey, accounts[1]).should.be.fulfilled;

      await keysManager.addMiningKey(accounts[6]).should.be.fulfilled;
      await keysManager.addVotingKey(votingKey2, accounts[6]).should.be.fulfilled;

      await keysManager.addMiningKey(accounts[4]).should.be.fulfilled;
      await keysManager.addVotingKey(votingKey3, accounts[4]).should.be.fulfilled;
      await poaNetworkConsensusMock.setSystemAddress(accounts[0]);
      await poaNetworkConsensusMock.finalizeChange().should.be.fulfilled;
      await proxyStorageMock.setVotingContractMock(voting.address);

    })
    it('doesnot change if it did not pass minimum threshold', async () => {
      let proposedValue = 5;
      let contractType = 1; //keysManager
      votingId = await voting.nextBallotId();
      await voting.createBallotToChangeProxyAddress(
        VOTING_START_DATE, VOTING_END_DATE, accounts[5], contractType, { from: votingKey });
      await voting.setTime(VOTING_START_DATE);
      await voting.vote(votingId, choice.accept, { from: votingKey }).should.be.fulfilled;
      // await voting.vote(votingId, choice.accept, {from: votingKey2}).should.be.fulfilled;
      await voting.setTime(VOTING_END_DATE + 1);
      const { logs } = await voting.finalize(votingId, { from: votingKey }).should.be.fulfilled;
      activeBallotsLength = await voting.activeBallotsLength();
      activeBallotsLength.should.be.bignumber.equal(0);
      true.should.be.equal(await voting.getIsFinalized(votingId));
      // Finalized(msg.sender);
      logs[0].event.should.be.equal("BallotFinalized");
      logs[0].args.voter.should.be.equal(votingKey);

      const votingState = await voting.votingState(votingId);
      votingState.should.be.deep.equal([
        new web3.BigNumber(VOTING_START_DATE),
        new web3.BigNumber(VOTING_END_DATE),
        new web3.BigNumber(1), //totalVoters
        new web3.BigNumber(1), //progress
        true, //isFinalized
        new web3.BigNumber(3), //quorumState enum QuorumStates {Invalid, InProgress, Accepted, Rejected}
        new web3.BigNumber(0), //index
        new web3.BigNumber(3), //minThreshold
        accounts[5], //porposedValue
        new web3.BigNumber(contractType)
      ])
      true.should.be.equal(
        await voting.hasAlreadyVoted(votingId, votingKey)
      );

      const minThresholdOfVoters = await ballotsStorage.getBallotThreshold(1);
      minThresholdOfVoters.should.be.bignumber.equal(3);

    });

    it('should change getKeysManager address', async () => {
      let contractType = 1;
      let newAddress = accounts[5];
      await deployAndTest({contractType, newAddress})
      newAddress.should.be.equal(await proxyStorageMock.getKeysManager());
    })

    it('should change getVotingToChangeKeys', async () => {
      let contractType = 2;
      let newAddress = accounts[5];
      await deployAndTest({contractType, newAddress})
      newAddress.should.be.equal(await proxyStorageMock.getVotingToChangeKeys());
    })
    it('should change getVotingToChangeMinThreshold', async () => {
      let contractType = 3;
      let newAddress = accounts[5];
      await deployAndTest({contractType, newAddress})
      newAddress.should.be.equal(await proxyStorageMock.getVotingToChangeMinThreshold());
    })
    it('should change getVotingToChangeProxy', async () => {
      let contractType = 4;
      let newAddress = accounts[5];
      await deployAndTest({contractType, newAddress})
      newAddress.should.be.equal(await proxyStorageMock.getVotingToChangeProxy());
    })
    it('should change getBallotsStorage', async () => {
      let contractType = 5;
      let newAddress = accounts[5];
      await deployAndTest({contractType, newAddress})
      newAddress.should.be.equal(await proxyStorageMock.getBallotsStorage());
    })

  })
})

async function deployAndTest({
  contractType,
  newAddress
}) {
  votingId = await voting.nextBallotId();
  await voting.createBallotToChangeProxyAddress(
    VOTING_START_DATE, VOTING_END_DATE, newAddress, contractType, { from: votingKey });
  await voting.setTime(VOTING_START_DATE);
  await voting.vote(votingId, choice.accept, { from: votingKey }).should.be.fulfilled;
  await voting.vote(votingId, choice.accept, { from: votingKey }).should.be.rejectedWith(ERROR_MSG);
  await voting.vote(votingId, choice.accept, { from: votingKey2 }).should.be.fulfilled;
  await voting.vote(votingId, choice.reject, { from: votingKey3 }).should.be.fulfilled;
  await voting.setTime(VOTING_END_DATE + 1);
  const { logs } = await voting.finalize(votingId, { from: votingKey }).should.be.fulfilled;

  activeBallotsLength = await voting.activeBallotsLength();
  activeBallotsLength.should.be.bignumber.equal(0);
  true.should.be.equal(await voting.getIsFinalized(votingId));
  // Finalized(msg.sender);
  logs[0].event.should.be.equal("BallotFinalized");
  logs[0].args.voter.should.be.equal(votingKey);

  const votingState = await voting.votingState(votingId);
  votingState.should.be.deep.equal([
    new web3.BigNumber(VOTING_START_DATE),
    new web3.BigNumber(VOTING_END_DATE),
    new web3.BigNumber(3), //totalVoters
    new web3.BigNumber(1), //progress
    true, //isFinalized
    new web3.BigNumber(2), //quorumState enum QuorumStates {Invalid, InProgress, Accepted, Rejected}
    new web3.BigNumber(0), //index
    new web3.BigNumber(3), //minThreshold
    newAddress, //proposedValue
    new web3.BigNumber(contractType)
  ])
  if( contractType !== 1) {
    true.should.be.equal(
      await voting.hasAlreadyVoted(votingId, votingKey)
    );
    true.should.be.equal(
      await voting.hasAlreadyVoted(votingId, votingKey2)
    );
    true.should.be.equal(
      await voting.hasAlreadyVoted(votingId, votingKey3)
    );
  }

}
