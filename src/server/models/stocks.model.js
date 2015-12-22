'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var api = new require('../markitApi/markitApi.js');
api = new api();

var Stock = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  acquired: String,
  interactiveChart: Object
});

module.exports = mongoose.model('Stock', Stock);
