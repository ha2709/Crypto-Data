// function to fetch the USD Values from CryptoCompare
var getLatestValPerTokenInUSD = require('./getLatestValPerTokenInUSD');


function getPortfoByDate(date) {
    console.log("Given a date, return the portfolio value per token in USD on that date");
    getLatestValPerTokenInUSD("",date).then(function (result) { console.log(result); });
}

module.exports = getPortfoByDate;