const express = require('express');
const router = express.Router();

const aws = require('aws-sdk');
const uuid = require('uuid');
const { DynamoDB } = require('aws-sdk');

aws.config.update({
    region: "us-east-1"
});

const docClient = new DynamoDB.DocumentClient();

