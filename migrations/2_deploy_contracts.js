// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
//
// module.exports = function(deployer) {
//   deployer.deploy(ConvertLib);
//   deployer.link(ConvertLib, MetaCoin);
//   deployer.deploy(MetaCoin);
// };

var usingProperty = artifacts.require("usingProperty.sol");
var Congress = artifacts.require("Congress.sol");
var ActivityInterface = artifacts.require("ActivityInterface.sol");
var MainActivity = artifacts.require("MainActivity.sol");


module.exports = function(deployer) {
  deployer.deploy(Congress).then(function(){
      return deployer.deploy([[usingProperty, Congress.address],[ActivityInterface, Congress.address]]);
  }).then(function(){
      return deployer.deploy(MainActivity, Congress.address, usingProperty.address);
  });
};
