//since we are using truffle, artifacts is there :)
const SampleContract = artifacts.require("Sample");

module.exports = function (deployer) {
  deployer.deploy(SampleContract);
};
