const express = require('express');
const Sequelize = require('sequelize');
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');
const router = express.Router();

const getArtists = (req,res) => (
  Artist.findAll()
    .then((artists)=>res.send(artists)
    )
  )

const getArtistsById = (req,res) =>(
  Artist.findById( req.params.id )
    .then((artist)=>res.send(artist)
     )
  )

const getArtistsByName = (req,res) => (
  Artist.findOne({ where: {name: req.params.name} })
    .then((artist)=>res.send(artist)
     )
  )

const getArtistsButNoJungle = (req,res) => (
  Artist.findAll({ 
  	where: { 
  		$not: [ {name: 'Jungle'} ] 
  	} 
  })
    .then((artists)=> res.send(artists)
    	)
	)

const getFrankOrChromeo = (req,res) => (
  Song.findAll({ 
  	where: {
			$or: [
			  { artistId: [ 1, 4 ] }
			  //{name: 'Frank Ocean'}
			]  
  	} 
  })
    .then((songs)=> res.send(songs)
    	)
	)
//include: model: Artist
const postArtist = (req,res) => {
	let body = req.body;
  Artist.create({ name: body.name })
  .then((info)=> console.log('Artist with name: '+info+', created!'))
  }

const deleteArtist = (req,res) => (
  Artist.destroy({ where: { id: req.params.id } })
    .then((id)=> res.send(id+' has been deleted'))
  )

const updateArtist = (req,res) => (
  Artist.update({ where: { id: req.params.id} })
    .then((id)=> res.send(id+ ' has been updated') )
	)

//task.update({ title: 'foooo', description: 'baaaaaar'}, {fields: ['title']}).then(function() {
// title will now be 'foooo' but description is the very same as before
//})

router.route('/')
  .get(getArtists)
  .post(postArtist)

router.route('/id/:id')
  .get(getArtistsById)

router.route('/name/:name')
  .get(getArtistsByName)

router.route('/no-jungle')
  .get(getArtistsButNoJungle)

router.route('/frank-or-chromeo')
  .get(getFrankOrChromeo)

router.route('/:id')
  .delete(deleteArtist)
  .put(updateArtist)

module.exports = router;