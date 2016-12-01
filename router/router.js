const path = require('path');
const router = require('express').Router();
const Song = require(path.join(__dirname, '../models/song-model'));
const Artist = require(path.join(__dirname, '../models/artist-model'));
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');

// app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
// app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
// app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
// app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});
router.route('/songs').get((req, res) => {
  Song.findAll()
  .then((data) => {
    res.send(data)
  })
})

router.route('/songs/id/:id').get((req, res) => {
  Song.findById(req.params.id)
  .then((data) => {
    res.send(data)
  })
})

router.route('/songs/title/:title').get((req, res) => {
  Song.findOne({ where: {title: req.params.title} })
  .then((data) => {
    res.send(data)
  })
})

router.route('/songs/sort/by-date').get((req, res) => {
  Song.findAll()
  .then((data) => {
    res.send()
  })
})




module.exports = router;
