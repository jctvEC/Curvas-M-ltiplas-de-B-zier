// Algoritmo de De Casteljau
function deCasteljau(pontosDeControle, SubCurvaEsq, SubCurvaDir, t) {
    
    if(pontosDeControle.length === 0)
        return [];

    // Ponto na curva.
    if(pontosDeControle.length === 1) 
        return pontosDeControle[0];
    
    // Pontos intermediários.
    var proxNivel = [];    
    for(let i = 0; i < pontosDeControle.length - 1; i++) {
        let p1 = multiplication(pontosDeControle[i], 1 - t);
        let p2 = multiplication(pontosDeControle[i + 1], t);
        proxNivel.push(addPonto(p1, p2));
    }
    
    return deCasteljau(proxNivel, SubCurvaEsq, SubCurvaDir, t);
}
