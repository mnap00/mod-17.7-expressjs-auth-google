/*eslint-disable no-console*/
var express = require('express');
var app = express();

app.use(express.static('assets'));

app.get('/', function(req, res) {
    console.log('Received GET request on main site');
    res.send('Hello World!');
});

var server = app.listen(3000, 'localhost', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening on http://' + host + ':' + port);
});
