var AWS = require("../../node_modules/aws-sdk");

AWS.config.update({region: "us-east-1", endpoint: "https://dynamodb.us-east-1.amazonaws.com"});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "netSysProj-Users",
    Item: {
        "pid" : {S: '67a3a0fa-773b-4bf1-a37d-a1056daf1606'},
        "name" : {S : 'fakueuser1'},
        "email" : {S:'fake@user.com' },
        "init_ip" : {S: '10.234.12.12'}
    }
  };
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
  dynamodb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
  // });
