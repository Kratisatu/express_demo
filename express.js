const express = require('express');

const PORT = 3000;

const bodyParser = require('body-parser');

// start express server

const server = express();

// Necessary middleware to gather data from request body

server.use(bodyParser.json());



// test endpoint for Postman

server.get('/employee', async (req,res) => {

    // we dont have to set req.method because express does this for us in the background on top of http

    // .get('/endpoint', (request, response)) express already set req.method as GET

    res.status(200).send("How are you doing?")

})

// start listener/handler to listen for HTTP requests

server.listen(PORT, '127.0.0.1', () => {

    console.log(`Listening on port ${PORT}`);

});