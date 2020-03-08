// set dotenv for API
// const dotenv = require('dotenv');
// dotenv.config();

var path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// express
const app = express();
app.use(cors());
// body-parser for json
app.use(bodyParser.json());
// to use url encoded values
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static('dist'));

// GET route
app.get('/', function(req, res) {
  res.sendFile('dist/index.html');
});

app.listen(8081, function() {
  console.log('Server is listening on port 8081');
});