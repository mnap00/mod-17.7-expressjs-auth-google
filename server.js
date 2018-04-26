var express = require('express');
var app = express();

app.get('/', function(req, res) {
    console.log('Received GET request on main site');
    res.send('Hello GET!');
});

app.post('/', function(req, res) {
    console.log('Received POST request on main site');
    res.send('Hello POST!');
});

var server = app.listen(3000, function() {
    console.log('Example app is listening on localhost port 3000');
});
