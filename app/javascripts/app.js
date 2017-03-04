var accounts;
var account;
var balance;

var congress;

function init(event){
    Congress.deployed().then(function(instance){
      congress = instance;
      return instance.addMember("John", 100, 100, 50, "buyer", {from:accounts[1]});
    }).then(function(txs){
          console.log("txs");
          console.log(txs);
    });

    //傾聽事件
    // congress.createTime().watch(function(error, result){
    //   if (!error)
    //     alert("contract created!");
    // });

    console.log(congress.address)
    printConsole("<p>合約位址："+congress.address+"</p><p>交易Hash："+congress.transactionHash+"</p>", "建立成功");

}


function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
    init();
  });
}
