
var http = require('http')
var	express = require('express');
var	bodyParser = require("body-parser");
var methodOverride = require("method-override");

var port = process.env.PORT || 8082;
var app = express();


app.use(bodyParser.json({
	limit: '50mb'
}));

app.use(bodyParser.urlencoded({
	limit: '50mb',
	extended: true
}));

app.use(methodOverride());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	// intercept OPTIONS method
	if ('OPTIONS' == req.method) {
		res.sendStatus(200);
	} else {
		next();
	}
});

var router = express.Router();

function logError(err, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.write("Error: " + err);
	res.end("");
}

router.get('/tutorials', function (req, res) {
    let tutorials = require('./tutorials.json');
    res.send(tutorials);
});

app.use(router);

app.listen(port, function () {
	console.log("Node server running on http://localhost:" + port);
});
