var http = require("http");
var url = require("url");
var routes = require("./routes");

var port = 8080;

http.createServer(requestCallback).listen(port);

function requestCallback(req, res) {
    
    var path = url.parse(req.url).pathname;
    
    switch(req.method) {
            
        case 'GET':
            routes.staticHandler(req,res, path);     
        break;
            
        case 'POST':
            routes.serviceHandler(req, res, path);
        break;  
    }
}