## Question 1 - Programming
_We're looking at your programming ability. It must not only work, it should be maintainable._

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip). Write a command line program that does the following

 - Given no parameters, return the latest portfolio value per token in USD
 - Given a token, return the latest portfolio value for that token in USD
 - Given a date, return the portfolio value per token in USD on that date
 - Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns
 - timestamp: Integer number of seconds since the Epoch
 - transaction_type: Either a DEPOSIT or a WITHDRAWAL
 - token: The token symbol
 - amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from [cryptocompare](https://min-api.cryptocompare.com/) where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.


## Submission

Please take no more than 7 days to finish. Your answers should comprise of the following

  - Source code that you used for deriving the results
  - README that explains various design decisions that you took.
  
Commit your answers in a private Github repository(it's free) and add Zan(liangzan), Kyle(kyled7), Thanh(thanhnpp), Viswanath(viswanathkgp12) as collaborators. Inform us that it is done at zan@propine.com, kyle.dinh@propine.com, thanh.nguyen@propine.com, viswanath.kapavarapu@propine.com.

## Design
I choose the `Factory Design Pattern`, because it parameterizes the input: base on the input param, it will call other function instead of block of code. These make code easy to scale, debug. It follows SOLID principle.

### put the [transactions.csv](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip) file into these folder
This file is big, so the reading process is quite slow. I can make these process faster within 1-2 seconds or even within 0.2 second depend on requirements. 
## In `Crypto-Data` folder, run command to install libraries:
```npm install request promise parser await yargs date-and-time```
### Given no parameters, return the latest portfolio value per token in USD
```node ./main.js```

### Given a token, return the latest portfolio value for that token in USD
```node ./main.js --token=BTC```

### Given a date, return the portfolio value per token in USD on that date
```node ./main.js --date=10/25/2019```

### Given a date and a token, return the portfolio value of that token in USD on that date
```node ./main.js --date=10/25/2019 --token=BTC```

## [Source code](https://gist.github.com/devops-nfq/ccd1f4936ef46dc06631942afec394a3/revisions) 
that I used for deriving the results. I make some changes in calculation of balance based on deposit (+) and withdrawal (-) `amount`, `date`, `token`.
