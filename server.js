const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const routes = require('./routes');
const songsRouterFile = routes.songsRouterFile; // Linked to Index.js in Routes Folder
const artistsRouterFile = routes.artistsRouterFile; //linked to Index.js in Routes Folder
const songsWithArtistsRouterFile = routes.songsWithArtistsRouterFile;

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('8888', () => console.log('Listening on port 8888'));

//serve all of the HTML views, which we'll eventually use to build a simple user interface
app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});

//////////
// YOUR CODE HERE:
//////////

app.use('/api/songs', songsRouterFile)
app.use('/api/artists', artistsRouterFile)
app.use('/api/songs-with-artists', songsWithArtistsRouterFile)


//MEMO: Line 26 - Digs into Routes/Index.js then Index/js digs into Songs-Router.js











