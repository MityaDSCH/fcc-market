'use strict';

export function socket() {

  var socket = io();

  socket.on('add stock', function(stock) {
    console.log('add ' + stock.name);
  });

  socket.on('remove stock', function(stock) {
    console.log('remove ' + stock.name);
  });

};
