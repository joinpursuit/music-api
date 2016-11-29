const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('8888', () => console.log('Listening on port 8888'));
//this is the port we're using for our actual app
//5432 is just whatwe're using internally for our app to connect with our postgres database

//serve all of the HTML views, which we'll eventually use to build a simple user interface
app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});

//////////
// YOUR CODE HERE:
//////////

//GET all songs from the database
app.get('/api/songs', (req, res) => {
	Song.findAll()
	.then( (data) => {
		//console.log(data)
		res.send(data);
	});
});

//GET specific song by id
app.get('/api/songs/id/:id', (req, res) => {
	//console.log(req.params)
	Song.findById(req.params.id)
	.then( (data) => {
		console.log(data)
		res.send(data)
	});
});


//GET specific song by name
app.get('/api/songs/name/:name', (req, res)=>{
  Song.findOne({
    where: {title: req.params.name}
  }).then((data)=>{
    res.send(data)
  });
});


//GET all songs and order by date created
app.get('/api/songs/sort/by-date', (req, res)=>{
  Song.findAll({
    order: [['createdAt', 'DESC']]
  }).then((data)=>{
    res.send(data)
  });
});


// GET all songs sorted alphabetically by title
app.get('/api/songs/sort/a-z', (req, res)=>{
  Song.findAll({
    order:[['title', 'ASC']]
  }).then((data)=>{
    res.send(data)
  });
});


// GET the count of the number of songs in the database
app.get('/api/songs/count', (req, res) => {
	Song.count()
	.then( (total) => {
		res.send("There are " + total + " songs in our database!");
	});
});


//GET the first five songs, ordered by date created. You should return exactly five songs.
app.get('/api/songs/first-five', (req, res) => {
	Song.findAll({
		order:[ ['createdAt', 'ASC'] ],
		limit: 5
	})
	.then( (data) => {
		res.send(data)
	});
});

////////////////////////////////////ARTISTS////////////////////////////////////////
//GET all artists
app.get('/api/artists', (req, res)=>{
  Artist.findAll()
  .then((data)=>{
    res.send(data)
  });
});


// GET all artists sorted alphabetically
app.get('/api/artists/sort/a-z', (req, res)=>{
  Artist.findAll({
    order: [['name', 'ASC']]
  })
  .then((data)=>{
    res.send(data);
  });
});

// GET specific artist by id
app.get('/api/artists/id/:id', (req, res)=>{
  Artist.findById(req.params.id)
  .then((data)=>{
    res.send(data)
  });
});
