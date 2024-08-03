// Create web server
// Load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var comments = [];

// Create web server
http.createServer(function(req, res) {
    var urlParts = url.parse(req.url, true);
    var pathName = urlParts.pathname;

    // Load HTML file
    if (pathName == '/') {
        var fileName = path.join(__dirname, 'index.html');
        var indexFile = fs.readFileSync(fileName, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(indexFile);
        res.end();
    }

    // Load CSS file
    else if (pathName.match('\.css$')) {
        var fileName = path.join(__dirname, pathName);
        var cssFile = fs.readFileSync(fileName, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.write(cssFile);
        res.end();
    }

    // Load JS file
    else if (pathName.match('\.js$')) {
        var fileName = path.join(__dirname, pathName);
        var jsFile = fs.readFileSync(fileName, 'utf8');
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(jsFile);
        res.end();
    }

    // Load comments
    else if (pathName == '/load') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(comments));
        res.end();
    }

    // Save comments
    else if (pathName == '/save') {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });
        req.on('end', function() {
            var params = qs.parse(body);
            comments.push(params.comment);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('Thanks for your comment!');
            res.end();
        });
    }

    // Error
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found\n');
        res.end();
    }
}).listen(3000);
console.log('Server running at http://localhost:3000/');