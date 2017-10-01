function isReacheable(cLinha, cColuna, tLinha, tColuna){
    return ((cColuna + 2 === tColuna && (cLinha + 1 === tLinha || cLinha - 1 === tLinha))
    || (cColuna - 2 === tColuna && (cLinha + 1 === tLinha || cLinha - 1 === tLinha))
    || (cLinha + 2 === tLinha && (cColuna + 1 === tColuna || cColuna - 1 === tColuna))
    || (cLinha - 2 === tLinha && (cColuna + 1 === tColuna || cColuna - 1 === tColuna)));
}

function renderBoard(horseLinha, horseColuna) {
    var board = '<table id="chess"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th></th></tr></thead><tbody>';
    for(var i = 0; i < 8; i++){
        board += '<tr><th>'+(8-i)+'</th>';
        for(var j = 0; j < 8; j++){
            if(horseLinha) {
                if(i === horseLinha && j === horseColuna)
                    board += '<td>&#9816;</td>';
                else if (isReacheable(horseLinha, horseColuna, i, j))
                    board += '<td>&otimes;</td>';
                else
                board += '<td></td>';
            } else
            board += '<td></td>';
        }
        board += '<th>'+(8-i)+'</th>';
        board += '</tr>';
    }
    board += '<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th></th></tr></tbody></table>';

    return board;
}

function renderJson(linha, coluna) {
    var jsonRes = {};
    jsonRes.cavalo = {'linha': linha, 'coluna': coluna};
    jsonRes.movimentos = [];

    linha = 8 - linha;
    coluna = coluna.charCodeAt(0) - 65;


    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            if (isReacheable(linha, coluna, i, j)) {
                jsonRes.movimentos.push({'linha': (8 - i), 'coluna': String.fromCharCode(j + 65)});
            }

    return jsonRes;
}

exports.renderBoard = renderBoard;
exports.renderJson = renderJson;