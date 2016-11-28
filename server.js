const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/posts', (req, res) => {
  Song.findAll({include: [Artist]})
  .then((data) => res.send(data));
});

app.get('/api/posts/:id', (req, res) => {

});

app.get('/api/posts/sort/by-date', (req, res) => {

});

app.get('/api/posts/sort/a-z', (req, res) => {

});

app.get('/api/authors', (req, res) => {

});

app.get('/api/authors/sort/a-z', (req, res) => {

});

app.get('/api/authors/:id', (req, res) => {

});

app.get('/api/posts-with-authors', (req, res) => {

});


app.get('/api/posts/tags/react', (req, res) => {

});

app.delete('/api/posts/:id', (req, res) => {
});

app.listen('8888', () => {
  console.log('Listening on port 8888');
});
// force: true will drop the table if it already exists
// Song.sync({force: true}).then(function () {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });

//create a single instance
// Puppy.create({name: 'puppy1', type: 'lab'});

//create multiple puppies at once
// Puppy.bulkCreate([
//   {name: 'puppy2', type: 'lab'},
//   {name: 'puppy3', type: 'lab'},
//   {name: 'puppy4', type: 'lab'},
//   {name: 'puppy5', type: 'golden'}
// ]);


//note: query will return large query Object with a bunch of data about results
//UNLESS pass {raw: true} as argument to query ('findAll'), OR .toJSON() off of data (users.toJSON())
// User.findAll()
// .spread((users) => {console.log('FOUND USERS!', users.toJSON())});
//
// Puppy.findAll({
//   //pass in an attribute array to only return specific columns from the table, insteaf of the entire entry
//   // attributes: ['type'],
//   where: {
//     type: 'lab'
//   },
//   raw: true
// })
// .then((err, data) => {
//   if(err) console.log(err);
//   else console.log(data.toJSON())
// });


// Puppy.findAll({
//   //pass in an attribute array to only return specific columns from the table, insteaf of the entire entry
//   // attributes: ['type'],
//   where: {
//     type: 'lab'
//   },
//   raw: true
// })
// .then((err, data) => {
//   if(err) console.log(err);
//   else console.log(data.toJSON())
// });
