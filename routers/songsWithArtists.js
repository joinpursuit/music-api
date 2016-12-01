const express = require('express');
const Sequelize = require('sequelize');
const Song = require('../models/song-model');
const Artist = require('../models/artist-model');
const router = express.Router();

const songsWithArtists = (req,res) => (
  Song.findAll({ include: [Artist] })
    .then((songs)=>res.send(songs)
    	)
	)

router.route('/')
 .get(songsWithArtists)

module.exports = router;