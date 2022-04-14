var http = require('http');
var fs = require('fs');
let url = require('url');
let path = require('path');

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css",
    "gif": "image/gif"
};

http.createServer((request, response) => {
    var pathname = url.parse(request.url).pathname;
    var filename = "";
    if (pathname === "/"){
        filename = "main/index.html";
    }
    else {
        console.log(pathname)
        filename = path.join(process.cwd(), pathname)
    }
    
    try{
        fs.accessSync(filename, fs.F_OK);
        var fileStream = fs.createReadStream(filename);
        var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
        response.writeHeader(200, {'Content-Type':mimeType});
        fileStream.pipe(response);
    }
    catch(e) {
        console.log('File not exists: ' + filename);
        response.writeHeader(404, {'Content-Type': 'text/plain'});
        response.write('404 Not Found\n');
        response.end();
        return;
    }
    return;
}).listen(8080);