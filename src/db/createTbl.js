var AWS = require("../../node_modules/aws-sdk");

AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "netSysProj-Users",
    KeySchema: [       
        { AttributeName: "pid", KeyType: "HASH"}  //Partition key
    ],
    AttributeDefinitions: [       
        { AttributeName: "pid", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
