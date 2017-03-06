var express =  require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var thingsToDo = require('./routes/thingsToDo');
var port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());//use with Postman App

app.use('/thingsToDo', thingsToDo);

app.get('/', function (req, res){
  res.sendFile(path.resolve('./server/public/views/index.html'));
});

app.use(express.static('./server/public'));

app.listen(port, function(){
  console.log('Listening on port: ', port);
});
