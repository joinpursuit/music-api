const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));

//listen on port 8888
app.listen('8888', () => console.log('Listening on port 8888'));

//serve all of the HTML views, which we'll eventually use to build a simple user interface
app.get('/view/all-songs', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-songs.html'))});
app.get('/view/all-artists', (req, res) => {res.sendFile(path.join(__dirname, '/views/all-artists.html'))});
app.get('/view/artists-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/artists-search.html'))});
app.get('/view/youtube-search', (req, res) => {res.sendFile(path.join(__dirname, '/views/youtube-search.html'))});

//////////
// YOUR CODE HERE:
//////////

//if using the routes/router
//app.use("/api",require('./api-routes'))

app.get('/api/songs', (req, res) => {
	Song.findAll()
	.then(data => {
			res.send(data)
	})
})

app.get('/api/songs/id/:id', (req, res) => {
	Song.findById(req.params.id)
	.then(data => {
			res.send(data)
	})
})

app.get('/api/songs/name/:name', (req, res) => {
	Song.findOne({
		where: {
			title: req.params.name
		}
	})
	.then(data => {
			res.send(data)
	})
})

app.get('/api/songs/sort/by-date', (req, res) => {
	Song.findAll({
		order: [["createdAt", "DESC"]]
	})
	.then(data => {
			res.send(data)
	})
})

app.get('/api/songs/sort/a-z', (req, res) => {
	Song.findAll({
		order: [["title"]]
	})
	.then(data => {
			res.send(data)
	})
})

app.get('/api/songs/count', (req, res) => {
	Song.count()
	.then((count) => res.send("this is the songs count: "  count))
})

app.get('/api/songs/first-five', (req, res) => {
	Song.findAll({
		limit: 5,
		order: [["createdAt", "DESC"]]
	})
	.then(data => {
			res.send(data)
	})
})

app.get('/api/artists', (req, res) => {
	Artist.findAll()
	.then(data => {
			res.send(data)
	})
})

app.get('/api/artists/sort/a-z', (req, res) => {
	Artist.findAll({
		order: [["name"]]
	})
	.then(data => {
			res.send(data)
	})
})

app.get('/api/artists/id/:id', (req, res) => {
	Artist.findById(req.params.id)
	.then(data => {
			res.send(data)
	})
})

app.get('/api/artists/name/:name', (req, res) => {
	Artist.findOne({
		where: {
			name: req.params.name
		}
	})
	.then(data => {
			res.send(data)
	})
})

//12
app.get('/api/artists/no-jungle', (req, res) => {
	Artist.findAll({
		where: {
			$not: [{name: "Jungle"}]}
	})
	.then(data => {
			res.send(data)
	})
})

//13
app.get('/api/songs-with-artists', (req, res) => {
	Song.findAll({
		include: [Artist]
	})
	.then(data => {
			res.send(data)
	})
})

//15
app.get('/api/artists/frank-or-chromeo', (req, res) => {
	Song.findAll({
		include: [Artist],
		where: {
		    $or: { artistId: [1,4] }
		}
	})
	.then(data => {
			res.send(data)
	})
})

//16
app.post('/api/artists', (req, res) => {
	//console.log(req.body.name)
	Artist.create({
		name: req.body.name
	})
	.then(() => {
			res.send(req.body.name)
	})
})

//17
app.delete('/api/artists/:id', (req, res) => {
	Artist.destroy({where: { 
			id: req.params.id 
		}})
	.then(data => {
			res.send(req.params.id)
	})
})

//18
app.put('/api/artists/:id', (req, res) => {
	Artist.update(
	{name: req.body.name}, 
	{where: {
			id: req.params.id
		}
	})
	.then(data => {
			res.send("name updated")
	})
})

//19
app.post('/api/songs', (req, res) => {
	Artist.findOrCreate(
	{name: req.body.name}, 
	{where: {
			id: req.params.id
		}
	})
	Song.findOrCreate
	.then(data => {
			res.send()
	})
})

app.post('/api/songs', (req,res)=>{
 	//console.log('request: ', req.body)
 	Artist.findOrCreate({ 
 		where: {
 			name: req.body.name
 		}
 	})
 	.then((artist)=>{
 		console.log('artist: ', artist[0].dataValues.id)
 		Song.findOrCreate({
 			where: {
 				title: req.body.title,
 				artistId: artist[0].dataValues.id
 			},
 			include: [Artist]
 		})
 		.then((song)=>{
 			console.log("artist: ", artist);
 			res.send(song);
 		})
 	})
 })
