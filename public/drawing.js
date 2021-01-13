var socket = io.connect("http://localhost:9000");

var img = new Image();
const canvasOutput = document.getElementById('canvasOutput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
var ctx2 = canvasOutput.getContext('2d');



window.addEventListener('load', ()=>{
    console.log("hello");
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
  ctx.lineWidth = $('#selWidth').val();
  ctx.lineCap = 'round';
  ctx.strokeStyle = $('#selColor').val();
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
  socket.emit('drawing', canvas.toDataURL())
}
function clearArea() {
  socket.emit('clear');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
socket.on('drawing',function(data){
  img.src = data;
  img.onload = function(){
      ctx2.drawImage(img, 0,0, img.width, img.height);
  }
});
socket.on('clear',function(){
  ctx2.setTransform(1, 0, 0, 1, 0, 0);
  ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
});
