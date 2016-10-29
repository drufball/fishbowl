'use strict';

var express = require('express');
var path = require('path');

var app = express();
app.use('/static', express.static('static'));

app.get('*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname + '/index.html'));
});

// Start the server
var server = app.listen(process.env.PORT || '8080', function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});
