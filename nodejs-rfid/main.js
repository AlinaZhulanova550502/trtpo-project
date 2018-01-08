var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

// Work with db (connect)
var mysql = require('mysql');

//config
var htmpFolder = "html/";
var mainPage = htmpFolder + "index.html";
var workerPage = htmpFolder + "worker.html";
var indexWebPage = "/";
var workerWebPage = "/worker";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1111"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected to MySQL database successful!");
});

// con.query("SELECT * FROM mydb.workers", function (err, result, fields) {
// 	if (err) throw err;
// 	console.log(result);
// });

// Create server
var createServerFun = function (req, res) {
	var requiredUrl = url.parse(req.url, true);

	var filePath = "";
	switch (requiredUrl.pathname){
        case indexWebPage:
            filePath = mainPage;
            break;
        case workerWebPage:
            filePath = workerPage;
            break;
        default:
        	filePath = htmpFolder + requiredUrl.pathname;
            break;
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
    }

    fs.readFile(filePath, function(err, data) {
	    if (err) {
	    	res.writeHead(404, {'Content-Type': 'text/html'});
	    	res.write("Error opening " + req.url);
	    	return res.end();
	    }
		
		res.writeHead(200, {'Content-Type': contentType});
		res.write(data);
		return res.end();
	});

    // var q = url.parse(req.url, true).query;
    // console.log(q);
    // var txt = q.year + " " + q.month;
};

http.createServer(createServerFun).listen(80);
console.log("Server was started at port 80");
