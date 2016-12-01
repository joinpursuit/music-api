const express = require('express');
const SWARouter  = express.Router();
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');

const getSongsWithArtists = (req, res)=>{
    Song.findAll({
        include: [Artist]
    }).then((data)=>{
        res.send(data)
    })
}


SWARouter.route('/')
    .get(getSongsWithArtists)

module.exports = SWARouter;