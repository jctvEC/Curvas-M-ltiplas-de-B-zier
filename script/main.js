// Adiciona um ponto de controle na tela.
document.addEventListener("click", e => {
    inserirPonto({
        x: e.offsetX,
        y: e.offsetY
    });
});

// Permite mover um ponto ao clicar e arrastar.
var move = false;
document.addEventListener("mousedown", e => {
    move = checaProximidadeEntrePontos(new Ponto(e.offsetX, e.offsetY));
});

document.addEventListener("mousemove", e => {
    if(curva === undefined)
        return
    if(move !== false) {
        pontosDeControle[curva][move] = new Ponto(e.offsetX, e.offsetY);
    }
});

document.addEventListener("mouseup", e => {
    move = false;
});

// Remover um ponto.
document.addEventListener("contextmenu", e => {
    e.preventDefault();

    deletarPonto(new Ponto(e.offsetX, e.offsetY));
});


