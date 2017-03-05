var express =  require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var thingsToDo = require('./routes/thingsToDo.js');
var port = 5000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use('/thingsToDo', thingsToDo);

app.get('/', function (req, res) {
  res.sendFile(path.resolve('./public/views/index.html'));
});

app.listen(port, function() {
  console.log('Listening on port: ', port);
});
