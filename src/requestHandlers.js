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

// Index
function index(request, response) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('Ola a todos!');
    response.write(template.footer);
    response.end();
}

// NotFound
function notFound(request, response) {
    response.writeHead(404, {'Content-Type': 'text/html'});
    response.write(template.header);
    response.write('<h2 class="text-center">#Não encontrado!</h2>');
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
exports.index = index;
exports.notFound = notFound;
exports.intervalo = intervalo;
