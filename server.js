const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/songs', (req, res) => {
  Song.findAll({include: [Artist]})
  .then((data) => res.send(data));
});

app.get('/api/song/:id', (req, res) => {

});

app.get('/api/song/sort/by-date', (req, res) => {

});

app.get('/api/song/sort/a-z', (req, res) => {

});

app.get('/api/authors', (req, res) => {

});

app.get('/api/authors/sort/a-z', (req, res) => {

});

app.get('/api/authors/:id', (req, res) => {

});

app.get('/api/song-with-authors', (req, res) => {

});


app.get('/api/song/tags/react', (req, res) => {

});

app.delete('/api/song/:id', (req, res) => {
});

app.listen('8888', () => {
  console.log('Listening on port 8888');
});

app.get('/view/all-songs', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/all-songs.html'))
});

app.get('/view/all-artists', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/all-artists.html'))
});
