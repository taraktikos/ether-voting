var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "pull lion float surge below duck illegal heavy rare must attitude shed";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  // Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 470000
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/s8QBatHgsyC8ZrFqpCYs"),
      network_id: 3
    }
  }
};
