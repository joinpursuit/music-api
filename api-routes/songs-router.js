const router = require ("express").Router();
const Song = require ("../models/song-model");

function getAllSongs(req, res){
	Song
		.findAll() //will return our data
		.then(function(data){
			res.send(data)
		})
}

router.route('/')
	.get(getAllSongs)


// POST a new song. The song should have an id for its artist as the 'artistId' field. In other words, if I created I have a 'Frank Ocean' entry in my 'artists' table that has an id of '1', a new Frank Ocean song would look like {title: 'Sweet Life', artistId: 1}. You should use findOrCreateto either find or create the artist, then use the id from that artist when you're creating your song:


router.route('/id/:id')
	.get(function (req, res){
		Song.findById(req.params.id)
		.then((data) => {
			res.send(data)
		})
	})




router.route('/name/:name')
	.get(function (req, res){
		Song.findOne({where: {title:req.params.name}} )
		.then((data) => {
			res.send(data)
		})
	})


router.route('/sort/by-date')
	.get(function (req, res){
		Song.findAll({order: [['createdAt','ASC']] })
		.then((data) => {
			res.send(data)
		})
	})

router.route('/sort/a-z')
	.get(function (req, res){
		Song.findAll({order: [['title','ASC']] })
		.then((data) => {
			res.send(data)
		})
	})

router.route('/count')
	.get(function (req, res){
		Song.findAndCountAll()
		.then((data) => {
			res.send(data)
		})
	})



	router.route('/first-five')
	.get(function (req, res){
		Song.findAll({order: [['createdAt','ASC']], limit: 5 })
		.then((data) => {
			res.send(data)
		})
	})

// router.route('/add-song/:artist/:title')
// 	.post(function(req,res){
// 		Song.findOrCreate({where: req.params.artist} )
// 	})

// POST a new song. The song should have an id for its artist as the 'artistId' field. In other words, if I created I have a 'Frank Ocean' entry in my 'artists' table that has an id of '1', a new Frank Ocean song would look like {title: 'Sweet Life', artistId: 1}. You should use findOrCreateto either find or create the artist, then use the id from that artist when you're creating your song:






	module.exports = router;