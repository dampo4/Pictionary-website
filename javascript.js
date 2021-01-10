window.addEventListener('load', ()=>{

    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);
    window.addEventListener('resize', resize);
});

const canvas = document.querySelector('#canvas');
const outputText = document.querySelector('#textOut');
const ctx = canvas.getContext('2d');

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
  console.debug("hello");
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.strokeStyle = $('#selColor').val();
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}
function clearArea() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
function sendText(){
  outputText.value = outputText.value + $('#fname').val() + '\r\n';
}
