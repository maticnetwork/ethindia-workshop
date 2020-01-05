const Airbnb = artifacts.require("Airbnb");

module.exports = async function(deployer) {
  await deployer.deploy(Airbnb);
  airbnbInstance = await Airbnb.deployed();
  await airbnbInstance.initialize().then(console.log('initialised!'));
};
