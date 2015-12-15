'use strict';

var express = require('express');
var mongoose = require('mongoose');

var app = express();

// if in development cd to dist folder (current cwd == / b/c run from gulp)
if (process.env.NODE_ENV === 'development') {
  process.chdir('./dist');
}

app.use('/', express.static(process.cwd() + '/client'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/client/index.html');
});

var port = process.env.PORT || 8080;
app.listen(port, function() {

});
