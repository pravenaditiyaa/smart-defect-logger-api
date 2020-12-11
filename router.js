var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
const { createBug } = require('./workItem')

var jsonParser = bodyParser.json()

router.post('/createBug', jsonParser, createBug)
module.exports = router;