const express = require('express');
const Sequelize = require('sequelize');
const Song = require('../models/song-model');
const router = express.Router();

const getSongs = (req,res) => (
  Song.findAll()
    .then((songs)=>res.send(songs)
  )
)

const getSongById = (req,res) => (
  Song.findById( req.params.id )
    .then((song)=>res.send(song)
     )
  )

const getSongByName = (req,res) => (
  Song.findOne({ where: {title: req.params.name} })
    .then((song)=>res.send(song)
     )
  )

const getSongsByDate = (req,res) => (
  Song.findAll({ order: [ ['createdAt', 'DESC'] ] })
    .then((songs)=>res.send(songs)
      )
	)

const getSongsByTitle = (req,res) => (
  Song.findAll({ order: [ ['title'] ] })
    .then((songs)=>res.send(songs)
      )
	)

const getSongsCount = (req,res) => (
  Song.count()
    .then((count)=>res.send('There are '+count+' songs in this database.')
	    )
	)

const getFirstFiveSongs = (req,res) => (
  Song.findAll({ order: [ ['createdAt', 'DESC'] ], limit: 5 })
    .then((songs)=>res.send(songs)
    	)
	)

const postSong = (req,res) => {
	let body = req.body;
  Song.create({ title: body.title, youtube_url: body.url })
  .then((info)=> console.log('Post with '+info+' created!'))
	}

const updateSong = (req,res) => (
  Song.update( where: { id: 16}, { artistId: 9 }, {fields: ['artistId']})
    .then(())
	)

//task.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(function() {
 // title will now be 'foooo' but description is the very same as before
//})

router.route('/')
  .get(getSongs)
  .post(postSong)
//  .put(updateSong)

router.route('/id/:id')
  .get(getSongById)

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