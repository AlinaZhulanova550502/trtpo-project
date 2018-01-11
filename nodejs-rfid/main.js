var url = require('url');
var fs = require('fs');
var path = require('path');

// Work with db (connect)
var mysql = require('mysql');

var bodyParser = require('body-parser');
// template parser, uses by express
var mustache = require('mustache')
var express = require('express');
var app = express();

//--------------------------------------------------
//                Config
//--------------------------------------------------
var viewsFolder = "views";
var indexPage = "index";
var indexWebPage = "/";

//--------------------------------------------------
//              MySQL config
//--------------------------------------------------
var mysqlConnect = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "1111"
});

var mysqlDb = "magic_door";
var mysqlWorkerTable = "worker";
var mysqlEnterTable = "enter";
var mysqlPirTable = "pir";

mysqlConnect.connect(function(err) {
  if (err) {
    console.error("Cannot connect to MySQL");
    throw err;
  }
  console.log("Connected to MySQL database successful!");
});

var mysqlFrom = function (db, table) {
  return (" FROM " + db + "." + table + " ");
}

var mysqlRunQuery = function (query, callback) {
  mysqlConnect.query(query, function (err, result, fields) {
    if (err) throw err;
    callback(result);
  });
}

//--------------------------------------------------
//              ExpressJS config
//--------------------------------------------------

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// static content redirecting
app.use(express.static('static_content'));

var templateParser = function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err))
  // Process view
    var rendered = mustache.render(content.toString(), options.view, options.partials)

    return callback(null, rendered)
  })
};

// Adding the template engine to ExpressJS
app.engine('html', templateParser);
app.engine('js', templateParser);
app.engine('json', templateParser);

app.set('views', viewsFolder); // specify the views directory
app.set('view engine', 'html'); // register the template engine

var returnPage = function (req, res, filePath) {
  var q = url.parse(req.url, true).query;

  // Send response
  res.render(filePath, {
    'view': {
      rfid: q.rfid
    },
    'partials': {// Pick up partials string content from disk
    }
  });
};

var returnWorkerJson = function (req, res) {
  var rfid = url.parse(req.url, true).query.rfid;
  var queryRes = mysqlRunQuery("SELECT * " + mysqlFrom(mysqlDb, mysqlWorkerTable) +
    'where rfid="' + rfid + '"',
    function(queryRes) {
      res.send(queryRes);
    });
}
var returnPirJson = function (req, res) {
  var queryRes = mysqlRunQuery("SELECT * " + mysqlFrom(mysqlDb, mysqlPirTable),
    function(queryRes) {
      res.send(queryRes);
    });
}
var returnEnterJson = function (req, res) {
  var queryRes = mysqlRunQuery("SELECT *, (SELECT surname " +
    mysqlFrom(mysqlDb, mysqlWorkerTable) +
    " WHERE " + mysqlDb + "." + mysqlWorkerTable + ".rfid=" +
    mysqlDb + "." + mysqlEnterTable + ".rfid) as worker " +
    mysqlFrom(mysqlDb, mysqlEnterTable),
    function(queryRes) {
      res.send(queryRes.reverse());
    });
}

var regUser = function(req, res) {
  var user = req.body;
  var queryRes = mysqlRunQuery("INSERT INTO `" + mysqlDb + "`.`" + mysqlWorkerTable +
    "` (`photo`, `name`, `surname`, `second_name`, `email`, `rfid`, `login`, `position`, `place`, `wh`) VALUES (" +
      '"' + user.photo + '",' +
      '"' + user.name + '",' +
      '"' + user.surname + '",' +
      '"' + user.second_name + '",' +
      '"' + user.email + '",' +
      '"' + user.rfid + '",' +
      '"' + user.login + '",' +
      '"' + user.position + '",' +
      '"' + user.place + '",' +
      '"' + user.wh + '");',
    function(queryRes) {
      res.end();
    });
}

app.get(indexWebPage, function (req, res) {
  returnPage(req, res, indexPage);
});
app.get('/worker.json', function (req, res) {
  returnWorkerJson(req, res);
});
app.get('/pir.json', function (req, res) {
  returnPirJson(req, res);
});
app.get('/enter.json', function (req, res) {
  returnEnterJson(req, res);
});
app.get('/*', function (req, res) {
  returnPage(req, res, "." + url.parse(req.url, true).pathname);
});
app.post('/submit', function (req, res) {
  regUser(req, res);
});

//TODO: fix server port
app.listen(3000, function () {
  console.log('Server was started at port 3000!');
});

