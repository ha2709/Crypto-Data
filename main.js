'use strict';

const args = require('yargs').argv;
// const date = require('date-and-time');

// function to get the latest portfolio value per token in USD
var getPortfo = require('./getPortfo');

//function to get the portfolio value per token in USD
var getPortfoByToken = require('./getPortfoByToken')

//function to get the portfolio value by date in USD
var getPortfoByDate = require('./getPortfoByDate')

//function to get the portfolio value per token and date in USD
var getPortfoByTokenDate = require('./getPortfoByTokenDate')

// based on the type of the parameters we pass as cmd, corresponding function will be called
if(args.token === undefined && args.date === undefined){
    getPortfo();
}
else if (args.token != undefined && args.date === undefined){
    getPortfoByToken(args.token)
    // getPortfo(args.token);
}
else if (args.date != undefined && args.token === undefined){
    getPortfoByDate(args.date);
    
}
else if (args.token != undefined && args.date != undefined){
    // console.log(47, args.token)
    getPortfoByTokenDate(args.token, args.date);
}
