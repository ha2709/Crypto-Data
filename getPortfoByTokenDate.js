var getLatestValPerTokenInUSD = require('./getLatestValPerTokenInUSD');
 

function getPortfoByTokenDate (coin, date) {
    console.log("Given a date and a token, return the portfolio value of that token in USD on that date");
    getLatestValPerTokenInUSD(coin, date).then(function (result) { 
        console.log( result) 
    })
}

module.exports = getPortfoByTokenDate