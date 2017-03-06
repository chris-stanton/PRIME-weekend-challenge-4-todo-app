var express = require('express');
var router = express.Router();
var pg = require('pg');
//found an many examples on Stackoverflow using the line below instead of var config.
//Stackoverflow used this variable with pg.connect and not pool.connect like we used in class.
//I had an issue with deleting items from the database until I switched over.
//I am not sure why I needed to do this.
var connectionString = 'postgres://localhost:5432/phi';
// var config = {
//   database: 'phi',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };

router.get('/', function(req, res){
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error to database: ', err);
      res.sendStatus(500);
    }
    client.query('SELECT * FROM todolist ORDER BY status DESC', function(err, result) {
      done();
      if(err) {
        console.log('select query error: ', err);
        res.sendStatus(500);
      }
        res.send(result.rows);
    });
  });
});

router.post('/', function(req, res) {
  var newToDo = req.body;
  pg.connect(connectionString, function(err, client, done) {
    if(err) {
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'INSERT INTO todolist (description, status) ' +
      'VALUES ($1, $2)',
      [newToDo.description, newToDo.status],
      function(err, result) {
        done();
        if(err) {
          console.log('insert query error: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
  });
});


router.delete('/:id', function(req, res){
  toDoID = req.params.id;
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('connection error: ', err);
      res.sendStatus(500);
    }
    client.query(
      'DELETE FROM todolist WHERE id = $1',
      [toDoID],
      function(err, result) {
        done();
        if(err) {
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });//end of client.query
    });//end of pg.connect
});//end of router.delete

module.exports = router;



//Below is the original code that I used.  The code talks with the database except for deleting.
//After doing research from Stackoverflow, I changed the code to whats above and the delete button starting interacting with the database.



// var express = require('express');
// var router = express.Router();
// var pg = require('pg');
// var config = {
//   database: 'phi',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };
//
// var pool = new pg.Pool(config);
//
// router.get('/', function(req, res){
//   pool.connect( function(errorConnectingToDatabase, client, done){
//     if(errorConnectingToDatabase){
//       res.sendStatus(500);
//     } else {
//       client.query('SELECT * FROM todolist ORDER BY status DESC;', function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery){
//           res.sendStatus(500);
//         } else {
//           res.send(result.rows);
//         }
//       });//end of client.query
//     }
//   });//end of pool.connect
// });//end of router.get
//
// router.post('/', function(req, res){
//   var newToDo = req.body;
//   pool.connect(function(errorConnectingToDatabase, client, done) {
//     if(errorConnectingToDatabase){
//       res.sendStatus(500);
//     } else {
//     client.query(
//       'INSERT INTO todolist (description, status) ' +
//       'VALUES ($1, $2);',
//       [newToDo.description, newToDo.status],
//       function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery){
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(201);
//         }
//       });//end of function(errorMakingQuery, result)
//     }
//   });//end of pool.connect
// });//end of router.post
//
//
// router.delete('/:id', function(req, res){
//   toDoID = req.params.id;
//   pool.connect(errorConnectingToDatabase, function(errorMakingQuery, client, done){
//     if(errorMakingQuery) {
//       console.log('connection error: ', errorMakingQuery);
//       res.sendStatus(500);
//     }
//     client.query(
//       'DELETE FROM todolist WHERE id = $1;',
//       [toDoID],
//       function(errorMakingQuery, result){
//         done();
//         if(errorMakingQuery){
//           res.sendStatus(500);
//         } else {
//           res.sendStatus(200);
//         }
//       });//end of client.query
//     });//end of pool.connect
// });//end of router.delete
//
// module.exports = router;
