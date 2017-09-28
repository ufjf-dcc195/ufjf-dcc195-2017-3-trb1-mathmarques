var http = require('http');
var url = require("url");

function start(router, handlers) {

    http.createServer(function (request, response) {
        var urlParsed =  url.parse(request.url, true);

        router.route(urlParsed.pathname, handlers, request, response);
    }).listen(80);

    console.log('Servidor rodando em http://localhost:80/');
}

module.exports.start = start;