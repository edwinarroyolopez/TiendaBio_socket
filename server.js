/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

/* Server ---- socket */
const express = require('express');
const http = require('http');
const engine = require('socket.io');

const request = require('request');

/* postgre */
   const pg = require('pg');

const port = 3000;
const app = express();

let data = [
        {id:1, author:'Robert Kiyosaki',text:'Cuadrantes del dinero'},
        {id:2, author:'Walter Isaacson',text:'La biografía de Steve Jobs'}
]

/* postgre */
             let pool = new pg.Pool({
                    user:'zero',
                    database: 'prueba_bd',
                    password:'abcd.1234',
                    port :8485,
                    ssl: false,
                    max: 20, //set pool max size to 20
                    min: 4, //set min pool size to 4
                    idleTimeoutMillis: 1000 //close idle clients after 1 second
                });
/* postgre */


let server = http.createServer(app).listen(port, () => {
    console.log("port listening in "+port);
});

const io = engine.listen(server);

io.on('connection', (socket) => {

          /*  request('https://randomuser.me/api/',(err, response, body) => {
                io.emit('people', body);
            }); */

            socket.on('read', () => {

                                    /* postgre  ---> conexion */
                                    pool.connect(function(err,db,done){
                                                  if(err){
                                                      console.error(err);
                                                  //    response.status(500).send({ 'error' : err});
                                                  } else{
                                                      db.query('select * from "tblComment" order by id_comment desc', function(err, table){
                                                          done();
                                                          if(err){
                                                              //return response.status(400).send({error:err})
                                                                console.log(" Error: "+err);
                                                          } else
                                                          {
                                                              //return response.status(200).send(table.rows) => application/json  ---> header
                                                              console.log(" Comments: "+JSON.stringify(table.rows));
                                                              data = table.rows; /* postgre rows */
                                                              io.emit('data',data);
                                                          }
                                                      })
                                                  }
                                              })
                                  /* postgre  ---> conexion */
            });/* socket : read */


            socket.on('sign', (sign) => {

                              /* insert comment */
                              console.log('add Comment: '+JSON.stringify(sign));

                              let id = sign.id_comment;
                              let comment_values = [sign.author_name,sign.text_comment];

                              console.log('Comment values: '+JSON.stringify(comment_values));
                              /* postgre  ---> conexion */
                                                pool.connect((err, db, done) => {

                                                          // Call `done(err)` to release the client back to the pool (or destroy it if there is an error)
                                                          done();
                                                          if(err){
                                                              console.error('error open connection', err);
                                                              //return response.status(400).send({error: err});
                                                          }
                                                          else {
                                                              db.query('INSERT INTO "tblComment"(author_name, text_comment) VALUES ($1,$2)',
                                                                  [...comment_values], (err, table) => {
                                                                  if(err) {
                                                                      console.error('error running query', err);
                                                                    //  return response.status(400).send({error: err});
                                                                  }
                                                                  else {
                                                                      console.log('Data Inserted: ' + id );
                                                                      //response.status(201).send({ message: 'Data Inserted! ' + id})
                                                                      /* Aquí podría agregar el "comment" a data  */
                                                                  }
                                                              })
                                                          }
                                                });
                              /* postgre  ---> conexion */


                              //data.unshift(sign);
                              io.emit('data',data);/* Regresamos la data para pintarla */
            });/* socket sign */

              socket.on('remove', (id_comment) => {

                              console.log('Id comment: ## : '+id_comment);

                              pool.connect(function(err,db,done){
                                          if(err){
                                              console.log('Error remove: '+err);
                                              //return response.status(400).send(err)
                                          } else{
                                              db.query('DELETE FROM "tblComment" WHERE id_comment = $1', [Number(id_comment)], function(err, result){
                                                      done();
                                                      if(err){
                                                    //      return response.status(400).send(err)
                                                            console.log('Error remove: '+err);
                                                      } else
                                                      {
                                                          //return response.status(200).send({message:'success delete record'})
                                                          console.log('Success remove record :D');
                                                      }
                                              })
                                          }
                              })
                              console.log('Id comment: '+id_comment);

                //    io.emit('data',data);/* Regresamos la data para pintarla: Realmente no me interesa leer de nuevo! */
              });/* socket delete */

});
/* Server ---- socket */


/**
 * Flag indicating whether webpack compiled for the first time.
 * @type {boolean}
 */
let isInitialCompilation = true;

const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
.listen(config.port, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:' + config.port);
});

compiler.plugin('done', () => {
  if (isInitialCompilation) {
    // Ensures that we log after webpack printed its stats (is there a better way?)
    setTimeout(() => {
      console.log('\n✓ The bundle is now ready for serving!\n');
      console.log('  Open in iframe mode:\t\x1b[33m%s\x1b[0m',  'http://localhost:' + config.port + '/webpack-dev-server/');
      console.log('  Open in inline mode:\t\x1b[33m%s\x1b[0m', 'http://localhost:' + config.port + '/\n');
      console.log('  \x1b[33mHMR is active\x1b[0m. The bundle will automatically rebuild and live-update on changes.')
    }, 350);
  }
  isInitialCompilation = false;
});
