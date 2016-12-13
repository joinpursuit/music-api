const router = require ("express").Router();
const Song = require ("../models/song-model");
const Artist = require ("../models/artist-model");
 
 
 function getAllSongs(req, res){
 	Song
 		.findAll({
 			include: [Artist]
 		}) //will return our data
 		.then(function(data){
 			res.send(data)
 		})
 }
 
 router.route('/')
 	.get(getAllSongs)

 
 // changed from using findById to findONe using where and include so it would display artist info
 router.route('/id/:id')
 	.get(function (req, res){
 		Song.findOne({
 			where:{id:req.params.id},
 			include: [Artist]
 	})
 		.then((data) => {
 			res.send(data)
 		})
 	})

 
 router.route('/name/:name')
 	.get(function (req, res){
 		Song.findOne({
 			where: {title:req.params.name},
 			include: [Artist]} )
 		.then((data) => {
 			res.send(data)
 		})
 	})
 
 
 router.route('/sort/by-date')
 	.get(function (req, res){
 		Song.findAll({
 			order: [['createdAt','ASC']],
 			include: [Artist]
 		})
 		.then((data) => {
 			res.send(data)
 		})
 	})
 
 router.route('/sort/a-z')
 	.get(function (req, res){
 		Song.findAll({
 			order: [['title','ASC']],
 			include: [Artist]
 		})
 		.then((data) => {
 			res.send(data)
 		})
 	})
 
 router.route('/count')
 	.get(function (req, res){
 		Song.findAndCountAll({
 			include: [Artist]
 		})
 		.then((data) => {
 			res.send(data)
 		})
 	})
 
 	router.route('/first-five')
 	.get(function (req, res){
 		Song.findAll({
 			order: [['createdAt','ASC']],
 			limit: 5,
 			include: [Artist]
 		})
 		.then((data) => {
 			res.send(data)
 		})
 	})

 
module.exports = router;