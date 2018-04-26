/*eslint-disable no-console*/
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

app.delete('/del_user', function(req, res) {
    console.log('Received DELETE request on del_user site');
    res.send('Hello DELETE!');
});

app.get('/list_user', function(req, res) {
    console.log('Received GET request on list_user site');
    res.send('Users list');
});

app.get('/ab*cd', function(req, res) {
    console.log('Received GET request on ab*cd site');
    res.send('Pattern found');
});

var server = app.listen(3000, function() {
    console.log('Example app is listening on localhost port 3000');
});
