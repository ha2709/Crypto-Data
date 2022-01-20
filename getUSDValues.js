var request = require("request");

function getUSDValues() {
  
    var cryptoURL = 'https://min-api.cryptocompare.com/data/pricemulti';
    var params = {
        "fsyms": "BTC,ETH,XRP",
        "api_key": "7dfd0d7eec34d2413269b3cab5db9e8e8aa178da0128fab4e4ec50f984e8a18e",
        "tsyms":"USD"
    }
    var options = {
        url: cryptoURL,
        headers: {
            'User-Agent': 'request'
        }, 
        qs: params
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
        // Do async job
        request.get(options, function (err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })
 
}

module.exports = getUSDValues;