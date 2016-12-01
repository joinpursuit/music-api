const router = require ("express").Router();
const Song = require ("../models/song-model");
const Artist= require ("../models/artist-model");


// task: GET all songs with artist fully populated (in other words, the full artist information should be displayed, including artist name and id)

// attempt 1) w/lev: ignore all the instructions on this one and used a simple includes song already associated with artist

router.route('/')
	.get(function (req,res){
		Song.findAll({
			include: [Artist]
		})
		.then(function(songs){
			console.log(songs);
			res.send(songs);
		})
	})



module.exports = router;

