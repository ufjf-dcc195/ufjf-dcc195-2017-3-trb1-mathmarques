
function hello(request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Ola a todos!');
    response.end();
}

function notFound(request, response) {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Nao encontrado!');
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

exports.hello = hello;
exports.notFound = notFound;
exports.intervalo = intervalo;
