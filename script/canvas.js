let numeroDeCurvas = 0
let curvasDeletadas = []

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight - 28);

function desenharCurva(j) {
    var inputs = document.getElementById('avaliations');
    let curva = getPontosDaCurva(pontosDeControle[j], inputs.value);
    pontosDeBezier[j] = curva;
 
    if(curva.length > 0) {
        ctx.moveTo(curva[0].x, curva[0].y);
        for(i = 0; i < curva.length - 1; i++)
            ctx.lineTo(curva[i + 1].x, curva[i + 1].y);
        ctx.stroke();
    }
}

function desenhaPoligono(j) {
    for(i = 0; i < pontosDeControle[j].length; i++) { 
        ctx.beginPath();
        if (document.getElementById('showPoints').checked) 
            ctx.arc(pontosDeControle[j][i].x, pontosDeControle[j][i].y, radius, 0, 2 * Math.PI);
        if(i < pontosDeControle[j].length - 1 && document.getElementById('showPoli').checked) 
            desenharLinha(pontosDeControle[j][i].x, pontosDeControle[j][i + 1].x, pontosDeControle[j][i].y, pontosDeControle[j][i + 1].y);
        ctx.stroke();
        ctx.fill();
    }
}

function animate() {
    requestAnimationFrame(animate);
    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.lineWidth = 1;
    
    for(j = 0; j < numeroDeCurvas; j++) {
        if(curvasDeletadas[j]){
            prepararContexto(j);
            desenhaPoligono(j);
            if(document.getElementById('mostrarCurvas').checked)
                desenharCurva(j);  
        }
    }
}

function prepararContexto(index) {
    ctx.beginPath();
    let r = getRandomArbitrario(0,255)
    let g = getRandomArbitrario(0,255)
    let b = getRandomArbitrario(0,255)
    ctx.strokeStyle = "rgb("+r+", "+g+", "+b+")";        
}

function getRandomArbitrario(min, max) {
    return Math.random() * (max - min) + min;
  }

function desenharLinha(initialX, finalX, initialY, finalY) {
    ctx.moveTo(initialX, initialY);
    ctx.lineTo(finalX, finalY);
}

function getPontosDaCurva(pontosDeControle, iterations) {
    let pontosDeBezier = [];
    for(let t = 0; t < 1; t += 1/iterations) {
        pontosDeBezier.push(deCasteljau(pontosDeControle, [], [], t));
    }
    pontosDeBezier.push(deCasteljau(pontosDeControle, [], [], 1));
    
    return pontosDeBezier;
}

function addCurva(){
    pontosDeControle[numeroDeCurvas] = []
    pontosDeBezier[numeroDeCurvas] = []
    curvasDeletadas[numeroDeCurvas] = true
    numeroDeCurvas += 1
    var select = document.getElementById("mySelect");
    var option = document.createElement("option");
    option.text = numeroDeCurvas+" ";
    select.add(option);
}

function deletarCurva(){
    curva = document.getElementById("mySelect").value;
    curva -= 1
    curvasDeletadas[curva] = false

    let x = document.getElementById("mySelect");
    x.remove(x.selectedIndex);
}

animate();