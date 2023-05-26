//since we are using truffle, artifacts is there :)
const FaucetContract = artifacts.require("FaucetContract");

module.exports = function (deployer) {
  deployer.deploy(FaucetContract);
};
