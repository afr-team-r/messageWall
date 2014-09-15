var fs = require("fs");
var db = require("./dao").db;

var deliverStaticResources = function(req, res, path) {
    
    var pathfile = __dirname;
            
    if(path === '/') {
        path += 'index.html';
    }
    
    pathfile += path;
    pathfile = pathfile.replace('/server/','/public/');
    
    res.setHeader('Content-Type','text/html; charset="utf-8"');
    
    var fileStream = fs.createReadStream(pathfile);
    
    fileStream.on('error', function(err) {
        console.log('Error on reading file...' + err);
        res.end('File not found :(');
    });
    
    fileStream.pipe(res); 
};

var handleServices = function(req, res, path) {
    
    var response = '';
    
    switch(path) {
    
        case '/add':
            var item = '';
            
            req.setEncoding("utf8");
            
            req.on("data", function(chunk) {
                console.log("Data received: " + chunk);
                item += chunk;
            });
    
            req.on("end", function() {
                
                try {
                    db.message.save(JSON.parse(item));
                } catch(err) {
                    console.log("Invalid JSON object");
                    res.end("Invalid JSON object");
                }

                res.end('OK');
            });
            
        break;
            
        case '/all':
            db.message.find(function(err, data) {
                data.forEach(function(obj) {
                    res.write(obj.author + ": " + obj.text + '\n');
                });
                
                res.end();
            });
        break;    
            
        default:
            res.end('Invalid service');
        break;
    }           
};

exports.staticHandler = deliverStaticResources;
exports.serviceHandler = handleServices;
                
/*
mongo.db.tasks.find(function(ee,data) {         
    data.forEach(function (e) {
        body += e.msg;
});

mongo.db.tasks.save(item);
*/