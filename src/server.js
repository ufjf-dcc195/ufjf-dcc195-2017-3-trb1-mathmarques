var http = require('http');
var url = require("url");

function start(router, handlers) {

    http.createServer(function (request, response) {
        request.parsedUrl = url.parse(request.url, true);

        router.route(request.parsedUrl.pathname, handlers, request, response);
    }).listen(process.env.PORT || 8080);

    console.log('Servidor rodando em http://localhost:8080/');
}

module.exports.start = start;