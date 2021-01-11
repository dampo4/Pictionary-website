var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(9000, function(){
  console.log('listening to reqs on prt 9000')
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
  console.log('made socket connection',socket.id)

  socket.on('chat',function(data){
  console.log('made it here');
  io.emit('chat', data);
})
  socket.on('drawing',function(data){
  console.log('made it here');
  io.emit('drawing',data);
})
})
