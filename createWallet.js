import Web3 from 'web3';

// Infura ile Web3 nesnesi oluşturma
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/3720dfa230c24ce891c244b57a1142d6'));

// cüzdan olusturma
const wallet = web3.eth.accounts.create();

console.log('Address:', wallet.address);
console.log('Private Key:', wallet.privateKey);
