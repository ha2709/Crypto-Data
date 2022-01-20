const args = require('yargs').argv;

// function to fetch the USD Values from CryptoCompare
var getLatestValPerTokenInUSD = require('./getLatestValPerTokenInUSD');

function getPortfoByToken(coin) {
    console.log("Given a token, return the latest portfolio value for that token in USD");
    getLatestValPerTokenInUSD(coin,"").then(function (result) { 
        var resultPerToken =  result.filter(function(record) {
            return record.token === coin;
            })
            console.log(resultPerToken);
     });
}

module.exports = getPortfoByToken;