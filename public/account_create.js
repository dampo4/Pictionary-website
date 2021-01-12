var socket = io.connect("http://localhost:9000");

var name1 = document.getElementById('name1');
var password = document.getElementById('password');
var button = document.getElementById('createAccount');

button.addEventListener('click',function(){
  console.log('the id is', socket.id);
  socket.emit('beep',{
    handle: name1.value,
    password: password.value,
    id: socket.id
  });
});
