'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var routes = require('./routes.js');

var mongoURI = process.env.MONGOLAB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/fcc-market';
mongoose.connect(mongoURI);

if (process.env.NODE_ENV === 'development') {
  require('./models/devSeed.js');
  // if in development cd to dist folder (current cwd == / b/c run from gulp)
  process.chdir('./dist');
}

app.use('/', express.static('./client'));
app.use('/api', express.static('./server'))

app.use(bodyParser.json());

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {

});
