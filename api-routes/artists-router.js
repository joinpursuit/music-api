const router = require ("express").Router();
const Artist = require('../models/artist-model');

function getAllArtists(req, res){
	Artist
		.findAll() //will return our data
		.then(function(data){
			res.send(data)
		})
}

router.route('/')
	.get(getAllArtists)

router.route('/sort/a-z')
	.get(function (req, res){
		Artist.findAll({order: [['name','ASC']] })
		.then((data) => {
			res.send(data)
		})
	})


router.route('/id/:id')
	.get(function (req, res){
		Artist.findById(req.params.id)
		.then((data) => {
			res.send(data)
		})
	})



//onlhy works with a name without spaces, get help from josh***
router.route('/name/:name')
	.get(function (req, res){
		Artist.findOne({where: {name:req.params.name}} )
		.then((data) => {
			res.send(data)
		})
	})


router.route('/sort/by-date')
	.get(function (req, res){
		Artist.findAll({order: [['createdAt','ASC']] })
		.then((data) => {
			res.send(data)
		})
	})

router.route('/not-')
	.get(function (req, res){
		Song.findOne({where: {name:""
		}} )
		.then((data) => {
			res.send(data)
		})
	})



module.exports = router;