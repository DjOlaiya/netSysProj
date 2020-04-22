const AWS = require("aws-sdk");

AWS.config.update({ region: "us-east-1" });
// details to connect to api
exports.handler = async (event, context, callback) => {
  console.log("EVENT:");
  console.log(event);
  const {
    name,
    request: {
      userAttributes: {
        sub,
        name,
        family_name,
        email
      }
    }
  } = event;

  const params = {
    TableName: "netSysProj-IPtbl",
    Item: {
      ipid: ipid,
      name: name,
      ip : ip,
      region: region,
      country: country
    }
  };

  const response = {
    headers: {
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
    },
    statusCode: 200,
    body: JSON.stringify("new data stored!")
  };

  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: "us-east-1"
  });
  try {
    const data = await documentClient.put(params).promise();
    console.log("exports.handler -> data", data);
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.body = JSON.stringify("USER INSERTION ERROR");
  }

  callback(null, event);
};
