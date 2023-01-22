const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({
    region: "us-east-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();

//Add an user to the list
function addNewUser(user_name, password, role) {
    const params = {
        TableName: 'users',
        Item: {
            user_name,
            password,
            role,
        }
    }

    return docClient.put(params).promise();
}

function retrieveAllUsers() {
    const params = {
        TableName: 'users',
        Item: {
            user_name,
            password,
            role,
        }
    }
    return docClient.scan(params).promise();
}

function retrieveUserByUserName(user_name) {
    const params = {
        TableName: 'users',
        Key: {
            user_name
        }
    }
    return docClient.query(params).promise();
}

const getAllUsers = async () => {
    const params = {
      TableName: "users",
    };
  
    let scanResults = [];
    let items;
  
    do {
      items = await docClient.scan(params).promise();
      items.Items.forEach((item) => scanResults.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey !== "undefined");
  
    return items;
  };

module.exports = addNewUser;
module.exports = retrieveUserByUserName;
module.exports = retrieveAllUsers;
module.exports = getAllUsers;