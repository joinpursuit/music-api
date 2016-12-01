const express = require('express');
const Artist = require('../models/artist-model');
const Song = require('../models/song-model');
const router = express.Router();

///Functions///

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

const getArtistsExcept_ = (req,res) => (
  Artist.findAll({ 
  	where: { 
  		$not: [ {name: req.params.name} ] 
  	} 
  })
    .then((artists)=> res.send(artists)
    	)
	)

const getArtist1orArtist2 = (req,res) => {
  Song.findAll({ 
  	include: [{
  		model: Artist,
  		where: {
  			$or: [
  				{name: [req.params.name1, req.params.name2]}
  			]
  		}
  	}]
  })
    .then((songs)=> res.send(songs)
    	)
	}

const postArtist = (req,res) => {
	let body = req.body;
  Artist.create({ name: body.name })
  .then((info)=> console.log('Artist with name: '+info+', created!'))
  }

const deleteArtist = (req,res) => (
  Artist.destroy({ where: { id: req.params.id } })
    .then((id)=> res.send(id.name+' has been deleted'))
  )

const updateArtist = (req,res) => {
	let body = req.body;
	 Artist.findOne({ where: { id: req.params.id} })
	.then( (artistInfo)=>
		artistInfo.update( {
  	  name: body.name }
    )
  )
  .then((artistInfo)=> res.send(artistInfo.name+' has been updated') )
	}

///Routes///

router.route('/')
  .get(getArtists)
  .post(postArtist)

router.route('/id/:id')
  .get(getArtistsById)

router.route('/name/:name')
  .get(getArtistsByName)

router.route('/no-:name')
  .get(getArtistsExcept_)

router.route('/:name1-or-:name2')
  .get(getArtist1orArtist2)

router.route('/:id')
  .delete(deleteArtist)
  .put(updateArtist)

module.exports = router;