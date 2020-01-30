var express = require('express');
var app = express();
var port = process.env.PORT || 3030;
var bodyParser = require('body-parser');
var personsURLS = require('./persons/urls');
var sitesURLS = require('./sites/urls');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


personsURLS(app);
sitesURLS(app);


app.listen(port);
console.log('RESTFul API server started on: ' + port);