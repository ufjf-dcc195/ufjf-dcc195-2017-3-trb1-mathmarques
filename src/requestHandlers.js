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
            response.write('<ul>');
            for(;N1 <= N2; N1++) {
                if(isPrime(N1))
                    response.write('<li>'+N1+'</li>');
            }
            response.write('</ul>');
        }
    }
    response.write(template.footer);
    response.end();
}

function intervalo(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<!DOCTYPE html><html><head></head><body>');
    response.write('<h2>Intervalo!</h2>');
    response.write('<form method="POST">De: <input type="text" name="from"/>  Ate: <input type="text" name="to"/>  <input type="submit" value="Enviar"/></form><p>');
    if(request.method === 'POST'){
        var from = parseInt(request.post.from);
        var to = parseInt(request.post.to);

        if(isNaN(from) || isNaN(to) || to < from)
            response.write('Valores invalido!');
        else
            for(;from <= to; from++)
                response.write(from + " ");
    }
    response.write('</p></body></html>');
    response.end();
}

exports.staticFiles = staticFiles;
exports.notFound = notFound;
exports.index = index;
exports.about = about;
exports.random = random;
exports.prime = prime;
exports.intervalo = intervalo;
