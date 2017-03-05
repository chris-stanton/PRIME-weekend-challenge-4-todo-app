var express = require('express');
var router = express.Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect( function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase){
      res.sendStatus(500);
    } else {
      client.query('SELECT * FROM todolist ORDER BY status DESC;', function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });//end of client.query
    }
  });//end of pool.connect
});//end of router.get

router.post('/', function(req, res){
  var newToDo = req.body;
  pool.connect(function(errorConnectingToDatabase, client, done) {
    if(errorConnectingToDatabase){
      res.sendStatus(500);
    } else {
    client.query(
      'INSERT INTO todolist (description, status) ' +
      'VALUES ($1, $2);',
      [newToDo.description, newToDo.status],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });//end of function(errorMakingQuery, result)
    }
  });//end of pool.connect
});//end of router.post


router.delete('/:id', function(req, res){
  toDoID = req.params.id;
  pool.connect(errorConnectingToDatabase, function(errorMakingQuery, client, done){
    if(errorMakingQuery) {
      console.log('connection error: ', errorMakingQuery);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM todolist WHERE id = $1;',
      [toDoID],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery){
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });//end of client.query
    });//end of pool.connect
});//end of router.delete

module.exports = router;
