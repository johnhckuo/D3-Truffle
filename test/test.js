var Congress = artifacts.require("./Congress.sol");
var usingProperty = artifacts.require("./usingProperty.sol");
var MainActivity = artifacts.require("./MainActivity.sol");


var CongressAddr;
//account0 = founder

//acount1 = new member

contract('Congress', function(accounts) {
  it("adding new member", function() {
    return Congress.deployed().then(function(instance){
        return instance.addMember("John", 100, 100, 50, "buyer", {from:accounts[1]});
      }).then(function(txs){
            console.log("txs");
            console.log(txs);
        });
  });

  it("get Stakeholder Length", function() {
    return Congress.deployed().then(function(instance){
        return instance.getStakeholdersLength.call({from:accounts[0]});
      }).then(function(result){
          console.log("get Stakeholder Length");
          console.log(result);
    });
  });

  it("show new stakeholder ID", function() {
    return Congress.deployed().then(function(instance){
        return instance.stakeholderId.call(accounts[1]);
      }).then(function(result){
          console.log("stakeholderId " +result);
    });
  });
// });
//
// contract('usingProperty', function(accounts) {
  it("show congress contract address ", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getCongressAddr.call(accounts[1]);
      }).then(function(addr){
            CongressAddr = addr;
            console.log("=========================")
            console.log(addr);
        });
    });


  it("adding new property", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.addProperty("Egg", 100, [accounts[0], accounts[1]], "unit", 1, ":D", 30, {from:accounts[1]});
      }).then(function(txs){
            console.log(txs);

    }).catch(function(e){
      console.log(e);
    });

  });

  it("check property length", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertiesLength.call({from:accounts[0]});
      }).then(function(length){
            console.log(length);

        });


  });

  it("check property rating length", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertyRatingLength.call(0, {from:accounts[0]});
      }).then(function(length){
            console.log(length);

        });
  });

  it("get property", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getProperty.call(0, {from: accounts[1]});
      }).then(function(name, since, propertyCount, unit, minUnit, owner, extraData){
            console.log(name+ '-' +since+ '-' +propertyCount+ '-' +unit+ '-' +minUnit+ '-' +owner+ '-' +extraData);

        });
  });

  it("get property rating", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertyRating.call(0, 1, {from: accounts[0]});
      }).then(function(rating){
            console.log(rating);
        });
  });



  it("adding new member", function() {
    var congress;
    var property;

    return Congress.deployed().then(function(instance){
            congress = instance;
            return congress.addMember("Bill", 200, 200, 100, "buyer", {from:accounts[2]});
        }).then(function(txs){

            console.log("txs");
            console.log(txs);
            return usingProperty.deployed();
        }).then(function(instance){
            property = instance;
            return property.getPropertiesLength.call({from:accounts[1]});

        }).then(function(length){
            console.log(length);
            return property.updatePropertiesRating(length, 0, "new", {from:accounts[1]});
        });
  });

  it("get Stakeholder Length", function() {
    return Congress.deployed().then(function(instance){
        return instance.getStakeholdersLength.call({from:accounts[0]});
      }).then(function(result){
          console.log("get Stakeholder Length");
          console.log(result);
    });
  });


  it("adding new property", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.addProperty("Pikachu", 1000, [accounts[0], accounts[1]], "unit", 10, "C:", 50, {from:accounts[2]});
      }).then(function(txs){
            console.log(txs);

    }).catch(function(e){
      console.log(e);
    });

  });

  it("check property length", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertiesLength.call({from:accounts[0]});
      }).then(function(length){
            console.log(length);

        });
  });

  it("check property rating length", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertyRatingLength.call(0, {from:accounts[0]});
      }).then(function(length){
            console.log(length);

        });
  });

  it("updae rating by john", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.updatePropertiesRating(1, 25, "update",  {from:accounts[1]});
      }).then(function(txs){
            console.log(txs);

        });
  });

  it("updae rating by bill", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.updatePropertiesRating(0, 100, "update",  {from:accounts[2]});
      }).then(function(txs){
            console.log(txs);

        });
  });

  it("get property rating from bill", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertyRating.call(0, 2, {from: accounts[0]});
      }).then(function(rating){
            console.log(rating);
        });
  });

  it("get property rating from john", function() {
    return usingProperty.deployed().then(function(instance){
        return instance.getPropertyRating.call(1, 1, {from: accounts[0]});
      }).then(function(rating){
            console.log(rating);
        });
  });

  it("get property length", function() {
    return MainActivity.deployed().then(function(instance){
        return instance.startMatching.call({from:accounts[0]});
      }).then(function(result){
            console.log(result);
        });
  });

  // it("start Match", function() {
  //   return MainActivity.deployed().then(function(instance){
  //       return instance.startMatching({from:accounts[0]});
  //     }).then(function(result){
  //           console.log(result);
  //       });
  // });



});
