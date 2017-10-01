var fs = require('fs');
var path = require('path');
var template = require('./template').template;

// Static Files
function staticFiles(file) {
    var filePath = 'static/'+file;
    return function (request, response) {
        var extension = path.extname(filePath);
        var contentType = 'text/html';
        switch (extension) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
        }

        fs.readFile(filePath, function(error, content) {
            if (!error) {
                response.writeHead(200, {'Content-Type': contentType});
                response.write(content);
            }
            response.end();
        });
    }
}

// NotFound
function notFound(request, response) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Não encontrado!</h2>');
    response.write(template.footer);
    response.end();
}

// Index
function index(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Trabalho 1 DCC195</h2>');
    response.write('<p class="text-center">Utilize o menu superior para acessar as páginas</p>');
    response.write(template.footer);
    response.end();
}

// Sobre
function about(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Sobre</h2>');
    response.write('<p class="text-center"><b>Nome:</b> Matheus de Oliveira do Carmo Marques</p>');
    response.write('<p class="text-center"><b>Matrícula:</b> 201276052</p>');
    response.write('<p class="text-center"><b>E-mail:</b> matheusocmarques@gmail.com</p>');
    response.write('<p class="text-center"><b>Curso:</b> Sistemas de Informação</p>');
    response.write(template.footer);
    response.end();
}

// Aleatorios
function random(request, response) {
    var even = [];
    var odd = [];

    for(var i = 0; i < 100; i++){
        var num = Math.floor((Math.random() * 10000) + 1);
        if(num%2 === 0)
            even.push(num);
        else
            odd.push(num);
    }

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Aleatórios</h2>');
    response.write('<div class="row"><div class="col-md-6">');
    response.write('<h3 class="text-center">Ímpar</h3><ul>');
    odd.forEach(function (value) {
        response.write('<li>'+value+'</li>');
    });
    response.write('</ul></div><div class="col-md-6">');
    response.write('<h3 class="text-center">Par</h3><ul>');
    even.forEach(function (value) {
        response.write('<li>'+value+'</li>');
    });
    response.write('</ul></div></div>');
    response.write(template.footer);
    response.end();
}

// Primos
function prime(request, response) {
    function isPrime(num) {
        var prime = true;

        if(num === 1 || (num !== 2 && num%2 === 0))
            prime = false;
        else {
            var lim = Math.sqrt(num) + 1;
            for(var i = 3; i < lim; i += 2)
                if(num%i === 0) {
                    prime = false;
                    break;
                }
        }

        return prime;
    }

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Primos</h2>');
    if(!request.parsedUrl.query.N1 || !request.parsedUrl.query.N2){
        response.write('<p class="text-center">Parâmetros ausentes! Envie N1 e N2 pela query</p>');
    } else {
        var N1 = parseInt(request.parsedUrl.query.N1);
        var N2 = parseInt(request.parsedUrl.query.N2);

        if(isNaN(N1) || isNaN(N2) || N1 >= N2 || N2 >= 100 || N1 <= 0) {
            response.write('<p class="text-center">Parâmetros inválidos! Insira N1 e N2 respeitando: N1 < N2 < 100</p>');
        } else {
            response.write('<p>Lista de primos entre '+ N1 +' e '+ N2 +':</p><ul>');
            var found = false;
            response.write('<ul>');
            for(;N1 <= N2; N1++) {
                if (isPrime(N1)) {
                    found = true;
                    response.write('<li>' + N1 + '</li>')
                }
            }
            if(!found)
                response.write('<li>Não existem números primo neste intervalo!</li>');
            response.write('</ul>');
        }
    }
    response.write(template.footer);
    response.end();
}

// Equação
function equation(request, response) {
    var isPost = (request.method === 'POST');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Equação</h2>');
    response.write('<p class="text-center">Resolver a equação: <b>a</b>x<sup>2</sup>+<b>b</b>x+<b>c</b>=0</p>');
    response.write('<form class="form-inline" method="POST">');
    response.write('<div class="form-group"><label for="a">Valor A: </label> <input type="text" class="form-control" name="a" id="a" value="'+ (isPost? request.post.a : '') +'"></div>');
    response.write(' <div class="form-group"><label for="b">Valor B: </label> <input type="text" class="form-control" name="b" id="b" value="'+ (isPost? request.post.b : '') +'"></div>');
    response.write(' <div class="form-group"><label for="c">Valor C: </label> <input type="text" class="form-control" name="c" id="c" value="'+ (isPost? request.post.c : '') +'"></div>');
    response.write(' <button type="submit" class="btn btn-default">Resolver</button></form><br/><br/>');

    if(isPost){
        var a = parseInt(request.post.a);
        var b = parseInt(request.post.b);
        var c = parseInt(request.post.c);
        if(isNaN(a) || isNaN(b) || isNaN(c) || (a === 0 && b === 0))
            response.write('<p class="text-center">Valores inválidos! a,b e c devem ser números inteiros e a ou b diferente de 0!</p>');
        else {
            var eq = '';
            eq += (a === 0? '' : '<b>'+(a === 1? '': a)+'</b>x<sup>2</sup>');
            eq += (b === 0? '' : (b < 0? ' - ': (a === 0? '' : ' + '))+ '<b>'+(b === 1? '': Math.abs(b))+'</b>x');
            eq += (c === 0? '' : (c < 0? ' - ':' + ')+ '<b>'+Math.abs(c)+'</b> = 0');
            response.write('<p class="text-center">Resolvendo a equação: ' + eq +'</p><br/>');

            if(a === 0) {
                response.write('<p class="text-center"><b>Solução: </b> x = '+ (-c)/b +'</p>');
            } else {
                var delta = (b*b) - (4*a*c);
                if(delta < 0)
                    response.write('<p class="text-center">Não existem raízes reais (delta < 0)</p>');
                else if(delta === 0)
                    response.write('<p class="text-center"><b>Solução: </b> raíz única(delta = 0) = '+ (-b)/(2*a) +'</p>');
                else
                    response.write('<p class="text-center"><b>Solução: </b> x\' = '+ ((-b)+Math.sqrt(delta))/(2*a) +' e x\' = '+ ((-b)-Math.sqrt(delta))/(2*a) +'</p>');
            }
        }

    }
    response.write(template.footer);
    response.end();
}


// Xadrez
function isReacheable(cLinha, cColuna, tLinha, tColuna){
    return ((cColuna + 2 === tColuna && (cLinha + 1 === tLinha || cLinha - 1 === tLinha))
         || (cColuna - 2 === tColuna && (cLinha + 1 === tLinha || cLinha - 1 === tLinha))
         || (cLinha + 2 === tLinha && (cColuna + 1 === tColuna || cColuna - 1 === tColuna))
         || (cLinha - 2 === tLinha && (cColuna + 1 === tColuna || cColuna - 1 === tColuna)));
}

function chess(request, response) {
    var isPost = (request.method === 'POST');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Xadrez</h2>');
    response.write('<form class="form-inline" method="POST">');
    response.write('<div class="form-group"><label for="linha">Linha: </label> <input type="text" class="form-control" name="linha" id="linha" value="'+ (isPost? request.post.linha : '') +'" placeholder="valor de 1 a 8"></div>');
    response.write(' <div class="form-group"><label for="coluna">Coluna: </label> <input type="text" class="form-control" name="coluna" id="coluna" value="'+ (isPost? request.post.coluna : '') +'" placeholder="valor de A a H"></div>');
    response.write(' <button type="submit" class="btn btn-default">Adicionar cavalo</button></form><br/><br/>');

    if(isPost) {
        var linha = parseInt(request.post.linha);
        var coluna = request.post.coluna;

        if(isNaN(linha) || !(typeof coluna === 'string') || coluna.length !== 1 || linha < 1 || linha > 8 || coluna.charCodeAt(0) < 65 || coluna.charCodeAt(0) > 72) {
            response.write('<p class="text-center">Valores inválidos da posição!</p>');
            isPost = false;
        } else {
            linha = 8-linha;
            coluna = coluna.charCodeAt(0) - 65;
        }
    }

    response.write('<table id="chess"><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th></th></tr></thead><tbody>');
    for(var i = 0; i < 8; i++){
        response.write('<tr><th>'+(8-i)+'</th>');
        for(var j = 0; j < 8; j++){
            if(isPost) {
                if(i === linha && j === coluna)
                    response.write('<td>&#9816;</td>');
                else if (isReacheable(linha, coluna, i, j))
                    response.write('<td>&otimes;</td>');
                else
                    response.write('<td></td>');
            } else
             response.write('<td></td>');
        }
        response.write('<th>'+(8-i)+'</th>');
        response.write('</tr>');
    }
    response.write('<tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th><th>G</th><th>H</th><th></th></tr></tbody></table>');
    response.write(template.footer);
    response.end();
}

exports.staticFiles = staticFiles;
exports.notFound = notFound;
exports.index = index;
exports.about = about;
exports.random = random;
exports.prime = prime;
exports.equation = equation;
exports.chess = chess;