const radius = 4;
var pontosDeControle = [];
var pontosDeBezier = [];

function Ponto(x, y) {
    this.x = x;
    this.y = y;
}

let curva 
// Checa se o ponto está próximo a um outro.
function checaProximidadeEntrePontos(ponto) {
    curva = document.getElementById("mySelect").value;
    curva -= 1
    if(curva === undefined)
        return
    for(i = 0; i < pontosDeControle[curva].length; i++) {

        let v = {
            x: pontosDeControle[curva][i].x - ponto.x,
            y: pontosDeControle[curva][i].y - ponto.y
        }

        if(Math.sqrt(v.x * v.x + v.y * v.y) <= radius)
            return i;
    } 
    return false;
}

function inserirPonto(ponto) {
    if(checaProximidadeEntrePontos(ponto) === false && ponto.y >= 28)
        pontosDeControle[curva].push(ponto);
}

function deletarPonto(ponto) {
    let index = checaProximidadeEntrePontos(ponto);
    if(index !== false)
        pontosDeControle[curva].splice(index, 1);
}

function addPonto(point1, point2) {
    return new Ponto(point1.x + point2.x, point1.y + point2.y);
}

function multiplication(ponto, scalar) {
    return new Ponto(ponto.x * scalar, ponto.y * scalar);
}