const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');

//DAO FUNCTIONS
const addNewUser = require('./users_dao');
const retrieveUserByUserName = require('./users_dao');
const retrieveAllUsers = require('./users_dao');
const getAllUsers = require('./users_dao');

AWS.config.update({
    region: "us-east-1",
});

//Creates Dynamo Database Object
const dynamoDb = new AWS.DynamoDB();

const PORT = 3000;

app.use(express.json());

const users = [];



//Custom Middleware

//Gather data from HTTP REQ BODY
app.use(bodyParser.json());


app.get('/users', (req, res) => {
    getAllUsers();
    res.json(users)

});



app.post('/users', (req, res) => {
    const user = {name: req.body.name, password: req.body.password}
    users.push(user)
    res.status(201).send();

    console.log(typeof(user.name));
    console.log(user.name);

    addNewUser(user.name, user.password).then((data) => {
        console.log('Adding user successful');
    }).catch((err) => {
        console.log('An error occurred!!!')
        console.error(err);
    });
});

app.post('/users/login', (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user');
    } 
    console.log(user.name)
    console.log(req.body.name)
    
    
})

//Read all and read by ID




app.listen(PORT, () => {
    console.log(`Server is listening on Port ${PORT}`);
})