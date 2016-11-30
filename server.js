const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

// const router = require('./routers')


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
app.get('/api/songs',(req,res)=>{
  Song.findAll({
  include: [Artist]
  })
    .then((data)=>{
    res.send(data)
  })
});

app.get('/api/songs/id/:id', (req,res)=> {
  Song.findById(req.params.id,
    {include: [Artist]
  })
  .then((data)=>{
    res.send(data)
  })
});

//find out how to pass params as lower case and it still works
app.get('/api/songs/name/:name', (req,res)=>{
  Song.findOne({
    where: {title: req.params.name},
    include: [Artist]
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/songs/sort/by-date',(req,res)=>{
  Song.findAll({
    order: [['createdAt', 'DESC']],
    include: [Artist]
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/songs/sort/a-z',(req,res)=>{
  Song.findAll({
    order:[['title']],
    include: [Artist]
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/songs/count',(req,res)=>{
  Song.count()
  .then((count)=>{
  res.send('there are '+count+' songs in the database!')
  })
});

app.get('/api/songs/first-five', (req,res)=>{
  Song.findAll({
    order: [['createdAt', 'DESC']],
    include: [Artist],
    limit: 5
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists',(req,res)=>{
  Artist.findAll()
    .then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists/sort/a-z',(req,res)=>{
  Artist.findAll({
    order:[['name']]
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists/id/:id', (req,res)=>{
  Artist.findOne({
    where: {id: req.params.id}
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists/name/:name',(req,res)=>{
  Artist.findOne({
    where: {name: req.params.name}
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists/no-:artist',(req,res)=>{
  Artist.findAll({
        where: {
         $not: [{
         name: req.params.artist}]}
  }).then((data)=>{
    res.send(data)
  })
});


app.get('/api/songs-with-artists',(req,res)=>{
  Song.findAll({
  include: [Artist]
  }).then((data)=>{
    res.send(data)
  })
});

app.get('/api/artists/frank-or-chromeo',(req,res)=>{
  Song.findAll({
      include: [{
        model: Artist,
        where: {
          $or: [{name:'Chromeo'},
                {name: 'Frank Ocean'}]}
              }]
  }).then((data)=>{
      res.send(data)
    })
});
