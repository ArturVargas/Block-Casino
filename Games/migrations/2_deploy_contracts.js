const BlackJack = artifacts.require("./BlackJack.sol");

module.exports = function(deployer) {
  deployer.deploy(BlackJack)
};