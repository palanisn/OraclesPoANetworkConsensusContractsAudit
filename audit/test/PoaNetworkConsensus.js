var pncOutput={
   "contracts" : {
      "PoaNetworkConsensus.sol:PoaNetworkConsensus" : {
         "abi" : "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"pendingList\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_newAddress\",\"type\":\"address\"}],\"name\":\"setProxyStorage\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_validator\",\"type\":\"address\"}],\"name\":\"removeValidator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"currentValidatorsLength\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"validatorsState\",\"outputs\":[{\"name\":\"isValidator\",\"type\":\"bool\"},{\"name\":\"index\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getPendingList\",\"outputs\":[{\"name\":\"\",\"type\":\"address[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getVotingToChangeKeys\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"_validator\",\"type\":\"address\"}],\"name\":\"addValidator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"finalizeChange\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"currentValidators\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getKeysManager\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"isMasterOfCeremonyInitialized\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"proxyStorage\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"finalized\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getValidators\",\"outputs\":[{\"name\":\"\",\"type\":\"address[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"systemAddress\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"masterOfCeremony\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"_someone\",\"type\":\"address\"}],\"name\":\"isValidator\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"name\":\"_masterOfCeremony\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"name\":\"parentHash\",\"type\":\"bytes32\"},{\"indexed\":false,\"name\":\"newSet\",\"type\":\"address[]\"}],\"name\":\"InitiateChange\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"newSet\",\"type\":\"address[]\"}],\"name\":\"ChangeFinalized\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"nameOfContract\",\"type\":\"string\"},{\"indexed\":false,\"name\":\"newAddress\",\"type\":\"address\"}],\"name\":\"ChangeReference\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"name\":\"proxyStorage\",\"type\":\"address\"}],\"name\":\"MoCInitializedProxyStorage\",\"type\":\"event\"}]",
         "bin" : "60606040526000805460ff191690556004805461ffff1916905560058054600160a060020a031916600260a060020a03179055341561003d57600080fd5b60405160208062000de083398101604052808051915060009050600160a060020a038216151561006c57600080fd5b600480546201000060b060020a03191662010000600160a060020a038516021790556020604051908101604052600454620100009004600160a060020a031681526100bb906006906001610159565b50600090505b60065481101561013c5760408051908101604052600181526020810182905260068054600991600091859081106100f457fe5b6000918252602080832090910154600160a060020a0316835282019290925260400190208151815460ff191690151517815560208201516001918201559190910190506100c1565b600680546008819055610151916007916101c0565b505050610227565b8280548282559060005260206000209081019282156101b0579160200282015b828111156101b05782518254600160a060020a031916600160a060020a039190911617825560209290920191600190910190610179565b506101bc929150610200565b5090565b8280548282559060005260206000209081019282156101b05760005260206000209182015b828111156101b05782548255916001019190600101906101e5565b61022491905b808211156101bc578054600160a060020a0319168155600101610206565b90565b610ba980620002376000396000f3006060604052600436106100e25763ffffffff60e060020a60003504166303aca79281146100e7578063108552691461011957806340a141ff1461013a57806340c9cdeb146101595780634110a4891461017e57806345199e0a146101b757806349285b581461021d5780634d238c8e14610230578063752862111461024f578063900eb5a8146102625780639a57378614610278578063a26a47d21461028b578063ae4b1b5b146102b2578063b3f05b97146102c5578063b7ab4db5146102d8578063d3e848f1146102eb578063fa81b200146102fe578063facd743b14610311575b600080fd5b34156100f257600080fd5b6100fd600435610330565b604051600160a060020a03909116815260200160405180910390f35b341561012457600080fd5b610138600160a060020a0360043516610358565b005b341561014557600080fd5b610138600160a060020a0360043516610423565b341561016457600080fd5b61016c610636565b60405190815260200160405180910390f35b341561018957600080fd5b61019d600160a060020a036004351661063c565b604051911515825260208201526040908101905180910390f35b34156101c257600080fd5b6101ca61065b565b60405160208082528190810183818151815260200191508051906020019060200280838360005b838110156102095780820151838201526020016101f1565b505050509050019250505060405180910390f35b341561022857600080fd5b6100fd6106c4565b341561023b57600080fd5b610138600160a060020a036004351661072d565b341561025a57600080fd5b6101386108b4565b341561026d57600080fd5b6100fd600435610981565b341561028357600080fd5b6100fd61098f565b341561029657600080fd5b61029e6109d9565b604051901515815260200160405180910390f35b34156102bd57600080fd5b6100fd6109e7565b34156102d057600080fd5b61029e6109f6565b34156102e357600080fd5b6101ca6109ff565b34156102f657600080fd5b6100fd610a65565b341561030957600080fd5b6100fd610a74565b341561031c57600080fd5b61029e600160a060020a0360043516610a89565b600780548290811061033e57fe5b600091825260209091200154600160a060020a0316905081565b60045433600160a060020a0390811662010000909204161461037957600080fd5b600454610100900460ff161561038e57600080fd5b600160a060020a03811615156103a357600080fd5b600a8054600160a060020a0380841673ffffffffffffffffffffffffffffffffffffffff1990921691909117918290556004805461ff0019166101001790557f600bcf04a13e752d1e3670a5a9f1c21177ca2a93c6f5391d4f1298d098097c229116604051600160a060020a03909116815260200160405180910390a150565b600080600061043061098f565b600160a060020a031633600160a060020a031614151561044f57600080fd5b600160a060020a038416600090815260096020526040902054849060ff16151561047857600080fd5b600160a060020a038516600090815260096020526040902060010154600780549195506000198201945090849081106104ad57fe5b60009182526020909120015460078054600160a060020a0390921693508391869081106104d657fe5b6000918252602080832091909101805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a039485161790559184168152600990915260409020600101849055600780548490811061052d57fe5b60009182526020822001805473ffffffffffffffffffffffffffffffffffffffff191690556007541161055f57600080fd5b6007805490610572906000198301610aa7565b50600160a060020a0385166000908152600960205260408082206001810192909255815460ff1990811690925560048054909216909155600019430140907f55252fa6eee4741b4e24a74a70e9c11fd2c2281df8d6ea13126ff845f7825c89906007905160208082528254908201819052819060408201908490801561062157602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610603575b50509250505060405180910390a25050505050565b60085481565b6009602052600090815260409020805460019091015460ff9091169082565b610663610ad0565b60078054806020026020016040519081016040528092919081815260200182805480156106b957602002820191906000526020600020905b8154600160a060020a0316815260019091019060200180831161069b575b505050505090505b90565b600a54600090600160a060020a03166349285b5882604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561070e57600080fd5b6102c65a03f1151561071f57600080fd5b505050604051805191505090565b61073561098f565b600160a060020a031633600160a060020a031614151561075457600080fd5b600160a060020a038116600090815260096020526040902054819060ff161561077c57600080fd5b600160a060020a038216151561079157600080fd5b60408051908101604090815260018252600754602080840191909152600160a060020a03851660009081526009909152208151815460ff19169015151781556020820151600191820155600780549092509081016107ef8382610aa7565b506000918252602090912001805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0384161790556004805460ff191690554360001901407f55252fa6eee4741b4e24a74a70e9c11fd2c2281df8d6ea13126ff845f7825c8960076040516020808252825490820181905281906040820190849080156108a257602002820191906000526020600020905b8154600160a060020a03168152600190910190602001808311610884575b50509250505060405180910390a25050565b60055433600160a060020a0390811691161480156108d5575060045460ff16155b15156108e057600080fd5b6004805460ff19166001179055600780546108fd91600691610ae2565b506006546008557f8564cd629b15f47dc310d45bcbfc9bcf5420b0d51bf0659a16c67f91d276325361092d6109ff565b60405160208082528190810183818151815260200191508051906020019060200280838360005b8381101561096c578082015183820152602001610954565b505050509050019250505060405180910390a1565b600680548290811061033e57fe5b600a54600090600160a060020a0316639a57378682604051602001526040518163ffffffff1660e060020a028152600401602060405180830381600087803b151561070e57600080fd5b600454610100900460ff1681565b600a54600160a060020a031681565b60045460ff1681565b610a07610ad0565b60068054806020026020016040519081016040528092919081815260200182805480156106b957602002820191906000526020600020908154600160a060020a0316815260019091019060200180831161069b575050505050905090565b600554600160a060020a031681565b600454620100009004600160a060020a031681565b600160a060020a031660009081526009602052604090205460ff1690565b815481835581811511610acb57600083815260209020610acb918101908301610b32565b505050565b60206040519081016040526000815290565b828054828255906000526020600020908101928215610b225760005260206000209182015b82811115610b22578254825591600101919060010190610b07565b50610b2e929150610b4c565b5090565b6106c191905b80821115610b2e5760008155600101610b38565b6106c191905b80821115610b2e57805473ffffffffffffffffffffffffffffffffffffffff19168155600101610b525600a165627a7a7230582043b70f188c6ef1ba832e13d3bee35c1b7de4b8629f1669c4020e69e7daafea550029"
      },
      "interfaces/IPoaNetworkConsensus.sol:IPoaNetworkConsensus" : {
         "abi" : "[{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"pendingList\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"removeValidator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"currentValidatorsLength\",\"outputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getPendingList\",\"outputs\":[{\"name\":\"\",\"type\":\"address[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"addValidator\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[],\"name\":\"finalizeChange\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"currentValidators\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"finalized\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getValidators\",\"outputs\":[{\"name\":\"\",\"type\":\"address[]\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"systemAddress\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[{\"name\":\"\",\"type\":\"address\"}],\"name\":\"isValidator\",\"outputs\":[{\"name\":\"\",\"type\":\"bool\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"}]",
         "bin" : ""
      },
      "interfaces/IProxyStorage.sol:IProxyStorage" : {
         "abi" : "[{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"address\"},{\"name\":\"\",\"type\":\"address\"}],\"name\":\"initializeAddresses\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getBallotsStorage\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getVotingToChangeKeys\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getPoaConsensus\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getKeysManager\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":true,\"inputs\":[],\"name\":\"getVotingToChangeMinThreshold\",\"outputs\":[{\"name\":\"\",\"type\":\"address\"}],\"payable\":false,\"stateMutability\":\"view\",\"type\":\"function\"},{\"constant\":false,\"inputs\":[{\"name\":\"\",\"type\":\"uint256\"},{\"name\":\"\",\"type\":\"address\"}],\"name\":\"setContractAddress\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]",
         "bin" : ""
      }
   },
   "version" : "0.4.18+commit.9cf6e910.Darwin.appleclang"
};
