'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  acquired: String,
  values: Object
});

module.exports = mongoose.model('Stock', Stock);
