
// function to get the latest portfolio value per token in USD
var getLatestValPerTokenInUSD = require('./getLatestValPerTokenInUSD');


function getPortfo() {
    let coin = "";
    let date = "";
    console.log("Given no parameters, return the latest portfolio value per token in USD");
    getLatestValPerTokenInUSD(coin,date).then(function (result) { console.log(result); });

}

module.exports = getPortfo;