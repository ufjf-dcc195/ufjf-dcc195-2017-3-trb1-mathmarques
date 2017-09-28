var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handlers = {};
handlers['/'] = requestHandlers.hello;
handlers['/notfound'] = requestHandlers.notFound;
handlers['/intervalo.html'] = requestHandlers.intervalo;

server.start(router, handlers);
