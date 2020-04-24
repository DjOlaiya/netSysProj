import React, {Component} from 'react';
const updatedb = () => 
{
var AWS = require("../../node_modules/aws-sdk");

// AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});
// const dbConfig = {
//   region: "us-east-1",
//   accessKeyId: 'ASIAZ3RB7TMTOXMXKIZ7',
//   accessSecretKey:'aErixBRF93+IghhuEMiH3LlHsCzArre4DYlNqIwQ',
//   aws_session_token:'FwoGZXIvYXdzEFUaDDQuY4YlWBieygdxkSK9AZXct4t39YsWHNzIhJyv4reEJh/UFZDRNpdHn8G9UqsvziSV66r0Og/Ov2pFqYbPd//nFQjpn59tFfbSgG6+asJdXZRW7+OXh6Shg30WSU1xSeY3+yBBLpVmJJUNz6JaUmTxneVl8IIqAUKa8QqFm41o57pFaR1IatDr06HJPBuRmTLuWAQqXAOsvmVk4yMIL908Cx3tBTNfP7iQlvpYcL2mQuHTDJxEYohc3c/HYTIDvWy57Noah4V/l0QItyjwr4n1BTItDbd9JgAi9DlwRXDB1LnsIzOX6LG4LNz8MH3vLKFDJFU/EPH1rehJgi7N1G1r',
//   endpoint: "https://dynamodb.us-east-1.amazonaws.com"
// }
// AWS.config.update({dbConfig });

// var dynamodb = new AWS.DynamoDB();
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'ASIAZ3RB7TMTCG3R6637',
  accessSecretKey:'cYHzNEfsHu6lVhm2xBTO8kBoIktUhUQtQYbgNSZ7',
  aws_session_token:'FwoGZXIvYXdzEFgaDGkqfVdgLGwqGjYv2SK9AdOhF1cv9CNJ0qjID7f3owHbKr1IBtE49XOu1EmsVL7mweywiuRCBqSLPFXnzSo5v2nRmxYFbTYeFNN73la63Va7L+ptzIGwliojPjy1pu3JfzLkYElZGQcpJHxqkU5JtGF2fESEt9wpXcIKfNyMfnsQYcSXSC8hru4EBZHyKmfIahAH3rm81KXrKQpQnfmhVCdnxqo55KOCuI7wV2jc4PHsHD81YYELqW4tKQFi3IR6yFvKYra9RAUQe3w35ii9hIr1BTItDciaNWyn6uMFQ6aCf4ZSto10LdLDMNMtwLODvady8PeSfcXAaTvDh2OLZnV8',
  endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

const dynamodb = new AWS.DynamoDB()
const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
var params = {
  TableName : "netSysProj-IPtbl",
  Item: {
    "ipid" : {S: '1' },
    "name" : {S : 'fakeuser3' },
    "IP" : {S : '69.172.152.217' },
    "region" : {S : "British Columbia" },
    "country" : {S : 'Canada' }
  }
}
  var param1 = {
    TableName : "netSysProj-Users",
    Item: {
        "pid" : {S: ''},
        "first_name" : {S : 'bob'},
        "IP" : {S : '10.0.0.1' },
        "region" : {S : "BC" },
        "country" : {S : 'Canada' },
        "IPcounter" : {N : '1'}
    }
  };

  var param2 = {
    TableName : "netSysProj-Users",
    Item: {
        "pid" : {S: '003'},
        "first_name" : {S : 'Eve'},
        "IP" : {S : '10.0.0.3' },
        "region" : {S : "QC" },
        "country" : {S : 'Canada' },
        "IPcounter" : {N : '1'}
    }
  };
  // var items = [params,param1,param2];
  // items.forEach(item => {
        // Call DynamoDB to add the item to the table
  // dynamodb.putItem(params, function(err, data) {
    dynamoDbClient.put(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  // });
}
export default updatedb;