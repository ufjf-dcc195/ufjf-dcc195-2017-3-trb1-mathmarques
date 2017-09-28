var fs = require('fs');

var header = fs.readFileSync('static/header.html');
var footer = fs.readFileSync('static/footer.html');

exports.template = {'header': header, 'footer': footer};
