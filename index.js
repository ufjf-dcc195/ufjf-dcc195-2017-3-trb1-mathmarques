var server = require('./src/server');
var router = require('./src/router');
var requestHandlers = require('./src/requestHandlers');

var handlers = {};
//Static
handlers['/css/bootstrap.css'] = requestHandlers.staticFiles('css/bootstrap.css');
handlers['/css/trab1.css'] = requestHandlers.staticFiles('css/trab1.css');
handlers['/css/bootstrap.min.css.map'] = requestHandlers.staticFiles('css/bootstrap.min.css.map');
handlers['/js/bootstrap.js'] = requestHandlers.staticFiles('js/bootstrap.js');
handlers['/js/jquery.js'] = requestHandlers.staticFiles('js/jquery.js');

//Routes
handlers['/notfound.html'] = requestHandlers.notFound;
handlers['/'] = requestHandlers.index;
handlers['/index.html'] = requestHandlers.index;
handlers['/sobre.html'] = requestHandlers.about;
handlers['/aleatorios.html'] = requestHandlers.random;
handlers['/primos.html'] = requestHandlers.prime;
handlers['/equacao.html'] = requestHandlers.equation;
handlers['/xadrez.html'] = requestHandlers.chess;
handlers['/xadrez.json'] = requestHandlers.jsonChess;

server.start(router, handlers);
