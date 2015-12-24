'use strict';

var io;

exports.setup = function(http) {
  io = require('socket.io')(http);
  io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });
  return io;
};

exports.emitAddStock = function(stock) {
  console.log('add ' + stock.name);
  io.emit('add stock', stock);
};

exports.emitRemoveStock = function(stock) {
  console.log('remove ' + stock.name);
  io.emit('remove stock', stock);
};
