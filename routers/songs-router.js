const express = require('express');
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');
const router = express.Router();

///Functions///

const getSongs = (req,res) => (
  Song.findAll()
    .then((songs)=>res.send(songs)
  )
)

const getSongById = (req,res) => (
  Song.findOne({ where: {id: req.params.id}, include: [Artist] })
    .then((song)=>res.send(song)
     )
  )

const getSongByName = (req,res) => (
  Song.findOne({ where: {title: req.params.name}, include: [Artist] })
    .then((song)=>res.send(song)
     )
  )

const getSongsByDate = (req,res) => (
  Song.findAll({ order: [ ['createdAt', 'ASC'] ], include: [Artist] })
    .then((songs)=>res.send(songs)
      )
	)

const getSongsByTitle = (req,res) => (
  Song.findAll({ order: [ ['title'] ], include: [Artist] })
    .then((songs)=>res.send(songs)
      )
	)

const getSongsCount = (req,res) => (
  Song.count()
    .then((count)=>res.send('There are '+count+' songs in this database.')
	    )
	)

const getFirstFiveSongs = (req,res) => (
  Song.findAll({ order: [ ['createdAt', 'ASC'] ], limit: 5, include: [Artist] })
    .then((songs)=>res.send(songs)
    	)
	)

const postSong = (req,res) => {
	let body = req.body;
	Artist.findOrCreate({ where: {name: body.artistName} })
  .then( (artistInfo) => {
  	Song.create({ 
  		title: body.title, 
  		youtube_url: body.youtube_url, 
  		artistId: artistInfo[0].dataValues.id}) 
  })
  .then(()=> res.send('Song with '+body+' created!'))
	}

const updateSong = (req,res) => {
  let body = req.body;
	Song.findOne({ where: { id: req.params.id} })
	.then( (songInfo)=>
		songInfo.update( {
  	  artistId: body.artistId,
  	  title: body.title,
  	  youtube_url: body.youtube_url
  	   }, {
  	  fields: ['artistId', 'title', 'youtube_url']
  	  }
    )
  )
  .then((id)=> res.send(id.title+ ' has been updated') )
	}

const deleteSong = (req,res) => (
  Song.destroy({ where: { id: req.params.id } })
    .then(()=> res.send('Song with id: '+req.params.id+' has been deleted'))
  )

///Routes///

router.route('/')
  .get(getSongs)
  .post(postSong) // requires artistName, youtube_url, and title

router.route('/id/:id')
  .get(getSongById)
  .put(updateSong) // requires artistId, title, youtube_url
  .delete(deleteSong)

router.route('/name/:name')
	.get(getSongByName)

router.route('/sort/by-date')
  .get(getSongsByDate)

router.route('/sort/a-z')
  .get(getSongsByTitle)

router.route('/count')
  .get(getSongsCount)

router.route('/first-five')
  .get(getFirstFiveSongs)

module.exports = router;