var getUSDValues = require("./getUSDValues");
const transactionsFile = 'transactions.csv';


function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }
 
function getLatestValPerTokenInUSD(coin, date) {
    
    return new Promise(function (resolve) {
    
        var output = [];
        var amountArr = [];
        var btcOutputArr = { "token": "BTC", "balance": 0, "timestamp": 0, "value": 0 };
        var ethOutputArr = { "token": "ETH", "balance": 0, "timestamp": 0, "value": 0  };
        var xrpOutputArr = { "token": "XRP", "balance": 0, "timestamp": 0, "value": 0  };
        var coinOutputArr = { "token": "", "balance": 0, "timestamp": 0, "value": 0  };
        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream(transactionsFile)
        });

        lineReader.on('line', function (line) {
            
            var jsonFromLine = {};
            var lineSplit = line.split(',');

            jsonFromLine.timestamp = lineSplit[0];
            jsonFromLine.transaction_type = lineSplit[1];
            // read each line
            // Do subtract if withdrawal type
            if (lineSplit[1] == "WITHDRAWAL" ) {
                jsonFromLine.amount = lineSplit[3]*-1;
            }
            else {
                jsonFromLine.amount = lineSplit[3]*1;
            }
            jsonFromLine.token = lineSplit[2]; 
            // no param
            if (coin === "" && date === "") {
                // create data for each token
                if (jsonFromLine.token === 'ETH') {                 
                    
                    // get the latest timestamp
                    if (jsonFromLine.timestamp > ethOutputArr.timestamp) {
                        ethOutputArr.timestamp = jsonFromLine.timestamp;
                        ethOutputArr.balance += jsonFromLine.amount;                
                    }
                }
                else if (jsonFromLine.token === 'BTC') {                 
                    
                    if (jsonFromLine.timestamp > btcOutputArr.timestamp) {
                        btcOutputArr.timestamp = jsonFromLine.timestamp; 
                        btcOutputArr.balance += jsonFromLine.amount;
                    }
                }
                else if (jsonFromLine.token === 'XRP') {
                    
                    if (jsonFromLine.timestamp > xrpOutputArr.timestamp) {
                        xrpOutputArr.timestamp = jsonFromLine.timestamp;
                        xrpOutputArr.balance += jsonFromLine.amount;
                    }
                }
            }
            // coin 
            else if (coin != "" && date === "") {   
                if (jsonFromLine.token === coin) {
                    coinOutputArr.balance += jsonFromLine.amount;
                    coinOutputArr.token = coin;
                    if (jsonFromLine.timestamp > coinOutputArr.timestamp) {
                        coinOutputArr.timestamp = jsonFromLine.timestamp;
                    }
                }
            }
            // date
            else if (coin === ""  && date != "") {   
                const timeStamp = parseInt(toTimestamp(date));
                // time stamp for one day from 00:01:01 to 23:59:59 of these day   
                const start_date = date + " 00:01:01";
                const end_date = date + " 23:59:59";
                const start_timeStamp = toTimestamp(start_date);
                const end_timeStamp = toTimestamp(end_date); 
                 
                ethOutputArr.timestamp = timeStamp;
                btcOutputArr.timestamp = timeStamp;
                xrpOutputArr.timestamp = timeStamp;
                if (jsonFromLine.token === 'ETH') {                 
                    
                    // get the latest timestamp
                    if (jsonFromLine.timestamp >= start_timeStamp && jsonFromLine.timestamp <= end_timeStamp) {               
                        ethOutputArr.balance += jsonFromLine.amount;              
                    }
                }
                else if (jsonFromLine.token === 'BTC') {                 
                    
                    if (jsonFromLine.timestamp >= start_timeStamp && jsonFromLine.timestamp <= end_timeStamp) {                 
                        btcOutputArr.balance += jsonFromLine.amount;                          
                    }
                }
                else if (jsonFromLine.token === 'XRP') {                    
                    if (jsonFromLine.timestamp >= start_timeStamp && jsonFromLine.timestamp <= end_timeStamp) {              
                        xrpOutputArr.balance += jsonFromLine.amount;
                    }
                }
            }
            // date and coin
            else if (coin != ""  && date != "") {                  
                if (jsonFromLine.token === coin) {
             
                    const start_date = date + " 00:01:01";
                    const end_date = date + " 23:59:59";
                    const start_timeStamp = toTimestamp(start_date);
                    const end_timeStamp = toTimestamp(end_date);
                    const timeStamp = parseInt(toTimestamp(date));
                    
                    if (jsonFromLine.timestamp >= start_timeStamp && jsonFromLine.timestamp <= end_timeStamp) {
       
                        coinOutputArr.timestamp = timeStamp;
                        coinOutputArr.balance += jsonFromLine.amount;
                        coinOutputArr.token = coin;

                    }
                }
            }
        });
        lineReader.on('close', function (line) {
            if ((coin === "" && date === "" ) ||(coin === "" && date != "")) {
                var cryptoCompare = getUSDValues();
                cryptoCompare.then(function (result) {
                    usdValues = result; 
      
                    ethOutputArr.value = ethOutputArr.balance * usdValues.ETH.USD;
                    btcOutputArr.value = btcOutputArr.balance * usdValues.BTC.USD;
                    xrpOutputArr.value = xrpOutputArr.balance * usdValues.XRP.USD;
    
                    output.push(ethOutputArr);
                    output.push(btcOutputArr);
                    output.push(xrpOutputArr);
                    resolve(output);
                }, function (err) {
                    console.log(err);
                })
            }
            else if ((coin != "" && date === "" ) ||(coin != "" && date != "")) {
                var cryptoCompare = getUSDValues();
         
                cryptoCompare.then(function (result) {
                    usdValues = result; 
                    
                    coinOutputArr.value = coinOutputArr.balance * usdValues[coin].USD;                   
                    output.push(coinOutputArr);                  
                    resolve(output);
                }, function (err) {
                    console.log(err);
                })
            }
 
        });
    });

 
}

module.exports = getLatestValPerTokenInUSD;