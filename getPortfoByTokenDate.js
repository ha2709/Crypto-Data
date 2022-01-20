var getLatestValPerTokenInUSD = require('./getLatestValPerTokenInUSD');
 
const args = require('yargs').argv;

function filterByProperty(array, prop, value){
    var filtered = [];
    for(var i = 0; i < array.length; i++){
        var obj = array[i];
        for(var key in obj){
            if(typeof(obj[key] == "object")){
                var item = obj[key];
                if(item[prop] == value){
                    filtered.push(item);
                }
            }
        }
    }   
    return filtered;

}

function getPortfoByTokenDate (coin, date) {
    console.log("Given a date and a token, return the portfolio value of that token in USD on that date");
    getLatestValPerTokenInUSD(coin, date).then(function (result) { 
        console.log( result) 
    })
}

module.exports = getPortfoByTokenDate