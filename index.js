const mongoose = require('mongoose');
var express = require('express');
var socket = require('socket.io');
const assert = require('assert');

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  name: String,
  password: String
})

const Account = mongoose.model('Account', AccountSchema);


var app = express();
var server = app.listen(9000, function(){
  console.log('listening to reqs on prt 9000')
});



mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/accounts');

mongoose.connection.once('open', function(){
  console.log('connection made');
}).on('error', function(error){
  console.log('connection error:', error);
})

app.use(express.static('public'));

var io = socket(server);

io.on('connection',function(socket){
  console.log('made socket connection',socket.id)

  socket.on('chat',function(data){
  console.log(data);
  io.emit('chat', data);
})


  socket.on('drawing',function(data){
  //console.log('made it here');
  io.emit('drawing',data);
})


  socket.on('clear',function(){
    io.emit('clear');
  })


  socket.on('beep',function(data){
  console.log('made it here');
  var id = data.id;
  console.log(data);
  Account.find({
    name: data.handle
  }).then(function(result){
    if (result[0] != null) {
      console.log('the id is:', id);
      io.to(id).emit('create', 'Username already taken');
    }
    else {
      var account = new Account({
          name: data.handle,
          password:  data.password
          });
          account.save();
          io.to(data.id).emit('create', 'Account Created');
    }
  })
})


  socket.on('login',function(data){
    Account.find({
      name: data.handle,
      password: data.password
    }).then(function(result){
      //console.log('result:', result[0].name);
      if (result[0] != null) {
        if (result[0].name === data.handle && result[0].password === data.password) {
          io.to(data.id).emit('login', data);
        }
      }
      else {
        console.log('bad');
      }
    })
  console.log(data);
  })


})
