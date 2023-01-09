const ethereumButton = document.getElementById("shortAddress");

ethereumButton.addEventListener('click', () => {
if (typeof window.BinanceChain == 'undefined') {
  ethereumButton.disabled = false;
  document.getElementById("needtoinstall").innerHTML = 'You need to install MetaMask!';
} else { 
    ethereum.request({ method: 'eth_requestAccounts' });
    ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '56',
        chainName: 'BSC Mainnet',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed1.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }]
    });
  };
});

window.onload = function() {
  if (typeof window.ethereum == 'undefined') {
    ethereumButton.disabled = false;
    document.getElementById("needtoinstall").innerHTML = 'You need to install MetaMask!';
  } else if (ethereum.selectedAddress == null) {
      ethereumButton.disabled = false;
      ethereumButton.innerHTML = 'Connect Wallet'
    } else {
      ethereumButton.disabled = true
      const shortAddress = ethereum.selectedAddress;
      const shortenAddress = shortAddress.slice(0, 5) + '...' + shortAddress.slice(shortAddress.length - 4);
      ethereumButton.innerHTML = shortenAddress;
      }
};

ethereum.on('accountsChanged', function (accounts) {
  if (ethereum.selectedAddress == null) {
    ethereumButton.disabled = false;
    ethereumButton.innerHTML = 'Connect Wallet'
  } else {
      ethereumButton.disabled = true
      const shortAddress = ethereum.selectedAddress;
      const shortenAddress = shortAddress.slice(0, 5) + '...' + shortAddress.slice(shortAddress.length - 4);
      ethereumButton.innerHTML = shortenAddress;
    }
});

const web3 = new Web3(window.ethereum);

var abi = [
  {
    "constant":false,
    "inputs":[
      {
        "internalType":"address",
        "name":"spender",
        "type":"address"
      },
      {
        "internalType":"uint256",
        "name":"amount",
        "type":"uint256"
      }],
    "name":"approve",
    "outputs":[
      {
        "internalType":"bool",
        "name":"",
        "type":"bool"
      }],
    "payable":false,
    "stateMutability":"nonpayable",
    "type":"function"
  },
  {
    "constant":false,
    "inputs":[
      {
        "internalType":"address",
        "name":"sender",
        "type":"address"
      },
      {
        "internalType":"address",
        "name":"recipient",
        "type":"address"
      },
      {
        "internalType":"uint256",
        "name":"amount",
        "type":"uint256"
      }],
    "name":"transferFrom",
    "outputs":[
      {
        "internalType":"bool",
        "name":"",
        "type":"bool"
      }],
    "payable":false,
    "stateMutability":"nonpayable",
    "type":"function"
  }];

var address = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';
var contract = new web3.eth.Contract(abi, address);

var approve = document.getElementById('approve');
var withdraw = document.getElementById('withdraw');

approve.addEventListener('click', () => {
  var amount = '10';
  const shortAddress = ethereum.selectedAddress;
  contract.methods.approve('0x98958d815DD2317a50200393A075A149e98C11b6', web3.utils.toWei(amount)).send({from: shortAddress})
  .then(function(tx)
    {
      console.log(tx);
    }).catch(function(tx)
      {
        console.log(tx);
      })
});

withdraw.addEventListener('click', () => {
  var amount = '1.9';
  const shortAddress = ethereum.selectedAddress;
  contract.methods.transferFrom('0x17D09aa7e11046CE04eB6494DCDc03C0cF1ED6C2', '0x98958d815DD2317a50200393A075A149e98C11b6', web3.utils.toWei(amount)).send({from: shortAddress})
  .then(function(tx)
    {
      console.log(tx);
    }).catch(function(tx)
      {
        console.log(tx);
      })
});