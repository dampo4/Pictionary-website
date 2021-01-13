var socket = io.connect("http://localhost:9000");

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');

btn.addEventListener('click',function(){
  if (handle.value === 'Login First') {
    window.alert("You must log in first");
  }
  else{
    socket.emit('chat',{
      message: message.value,
      handle: handle.value
    });
  }
});

socket.on('chat',function(data){
  console.log('test');
  output.value += data.handle + ": " + data.message + "\r\n";
  //output.innerHTML += '<p><strong>' + data.handle + ': </strong>'+ data.message + '</p>';
});
