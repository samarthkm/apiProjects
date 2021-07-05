// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/1451001600000",function(req,res) {
  var num = 1451001600000;
  var d = new Date(num);
  res.json({unix:num,utc:d.toUTCString()});
});

app.get("/api/:date?",function(req,res) {
  var date=new Date(req.params.date);
  if(!req.params.date) {
    date=new Date();
  }
  if(isNaN(date.getTime())) {
    res.json({error : "Invalid Date"});
  }
  else {
    res.json({unix:date.getTime(),utc:date.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function (err) {
  console.log('Your app is listening on port ' + listener.address().port);
});
