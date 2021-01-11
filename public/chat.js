var socket = io.connect("http://localhost:9000");

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var img = new Image();
var imageData;
const canvasOutput = document.getElementById('canvasOutput');
const canvas = document.getElementById('canvas');
const outputText = document.querySelector('#textOut');
const ctx = canvas.getContext('2d');
var ctx2 = canvasOutput.getContext('2d');

btn.addEventListener('click',function(){
  socket.emit('chat',{
    message: message.value,
    handle: handle.value
  });
});

socket.on('chat',function(data){
  console.log('test');
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>'+ data.message + '</p>';
});



//canvas


window.addEventListener('load', ()=>{

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
});


let coord = {x:0 , y:0};

let paint = false;

function getPosition(event){
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

function startPainting(event){
  paint = true;
  getPosition(event);
}
function stopPainting(){
  paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = $('#selColor').val();
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
  var testCanvas = canvas.toDataURL();
  //console.log(testCanvas);
  socket.emit('drawing', testCanvas)
}
function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
socket.on('drawing',function(data){
  console.log('hello');
  img.src = data;
  console.log(img.src);
  img.onload = function(){
      ctx2.drawImage(img, 0,0, img.width, img.height);
  }
});
