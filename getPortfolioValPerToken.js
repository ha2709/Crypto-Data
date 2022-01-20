const date = require('date-and-time');
const args = require('yargs').argv;
function getPortfolioValPerToken() {
    // console.log("cyptoLatest-->getPortfolioValPerToken");
    console.log("Date",args.date);
    return new Promise(function (resolve) {
        
        var output = [];

        var btcOutputArr = [];
        var ethOutputArr = [];
        var xrpOutputArr = [];

        var lineReader = require('readline').createInterface({
            input: require('fs').createReadStream('transactions.csv')
        });

        lineReader.on('line', function (line) {

            var jsonFromLine = {};
            var lineSplit = line.split(',');

            jsonFromLine.timestamp = lineSplit[0];
            jsonFromLine.transaction_type = lineSplit[1];
            jsonFromLine.token = lineSplit[2];
            jsonFromLine.amount = lineSplit[3];

            //converting date from timestamp
            var d = new Date(jsonFromLine.timestamp * 1000);
            var dateFromCSV = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear();
            
                if(jsonFromLine.token === 'ETH'){
                    if(args.date === dateFromCSV){
                        ethOutputArr.push({"token":jsonFromLine.token,"amount":jsonFromLine.amount * usdValues.ETH.USD})
                    }
                } else if (jsonFromLine.token === 'BTC'){    
                    if(args.date === dateFromCSV){
                        btcOutputArr.push({"token":jsonFromLine.token,"amount":jsonFromLine.amount * usdValues.ETH.USD})
                    }
                }
                else if (jsonFromLine.token === 'XRP'){    
                    if(args.date === dateFromCSV){
                        xrpOutputArr.push({"token":jsonFromLine.token,"amount":jsonFromLine.amount * usdValues.ETH.USD})
                    }
                }//end
        }

        )
    ;
        lineReader.on('close', function (line) {
                output.push(ethOutputArr);
                output.push(btcOutputArr);
                output.push(xrpOutputArr);
                resolve(output);

        });
        
    });
}

module.exports = 
;