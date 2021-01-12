var socket = io.connect("http://localhost:9000");

var loginName = document.getElementById('loginName');
var loginPassword = document.getElementById('loginPassword');
var button = document.getElementById('login');
var handle = document.getElementById('handle');

button.addEventListener('click',function(){
  console.log('dhshbsuhsh by :', socket.id);
  socket.emit('login',{
    handle: loginName.value,
    password: loginPassword.value,
    id: socket.id
  });
});

socket.on('login',function(data){
  console.log(data.id);
  handle.value = data.handle;
});


//This should be in the account_create script but it doesn't work there for some reason and ive spent hours trying to work out why
socket.on('create',function(data){
    window.alert(data);
});
