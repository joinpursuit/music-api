const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: false }));

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

//This is where we are obtaining all of the songs from the database 
//'Song' is coming from the song-model.js file where I created the song schema 
app.get('/api/songs', (req,res) =>{
	Song.findAll()
	.then((data) => {
		console.log(data, 'this is all the songs');
		res.send(data);
	})
})

//This is where we can find a specific song by their id from the database 
//Req.params.id is referring to the url containing our http://localhost:8888
app.get('/api/songs/id/:id', (req,res) =>{
	Song.findById(req.params.id)
	.then((data) =>{
		console.log(data, 'we found this song for you!')
		res.send(data);
	})
})

//This is where we can find a specific song by their title
app.get('/api/songs/name/:title', (req,res) =>{
	Song.findOne({
	where:{title: req.params.title},include:[Artist]})
	.then((data) =>{
		console.log(req.params.title,'this is the name');
		console.log(data, 'we found this title for you!')
		res.send(data);
	})
})

// The title property is what we are specifying where we want the api to find the song name of our choice 
//req.params.title is how we will reference that information from our database using our localhost url in POSTMAN . 
app.get('/api/songs/sort/by-date', (req,res) =>{
	Song.findAll({order: '"createdAt" DESC' })
	.then((data)=>{
		console.log(data, 'this is sorted');
		res.send(data);

	})
})

//This is where I sorted the data of songs in alphabetical order
app.get('/api/songs/sort/a-z', (req,res) =>{
	Song.findAll({order: '"title" ASC'})
	.then((data) =>{
	console.log(data, 'this was sorted alphabetically!');
	res.send(data);
	})
})

//Here I applied sequelize method of count to count the total amount of songs within the database

app.get('/api/songs/count', (req,res) =>{
	Song.count()
	.then((data) =>{
		console.log(data, 'we counted all the songs!');
		res.send(data.toString());
	})
})
//Here I limited the amount of songs in the databse and obtained those songs by sorting it in order by their title
app.get('/api/songs/first-five', (req,res)=>{
	Song.findAll({limit:5, order:'title ASC'})
	.then((data)=>{
		console.log(data, 'I have the first five!');
		res.send(data);
	})
})

//This is where I obtained all of the artists from the database 
app.get('/api/artists', (req,res)=>{
	Artist.findAll()
	.then((data)=>{
		console.log(data, 'we have all the artists!');
		res.send(data);
	})
})
//This is where I sorted the data of artists in alphabetical order
app.get('/api/artists/sort/a-z',(req,res)=>{
	Artist.findAll({order: '"name" ASC'})
	.then((data) =>{
		console.log(data, 'we sorted all the artists alphabetically!');
		res.send(data);
	})
})

//This is where we can find a specific artist by their id from the database 
app.get('/api/artists/id/:id', (req,res) =>{
	Artist.findById(req.params.id)
	.then((data)=>{
		console.log(data, 'This is your artist by their id');
		res.send(data);
	})
})
//This is where we can find a specific artist by their name 
app.get('/api/artists/name/:name', (req,res) =>{
	Artist.findOne({
	where:{name: req.params.name} })
	.then((data) =>{
		console.log(req.params.name,'this is the name');
		console.log(data, 'we found this title for you!');
		res.send(data);
	})
})
//This is where I obtained all of the artist from the database except the artist with the name of No Jungle
app.get('/api/artists/no-jungle', (req,res)=>{
	Artist.findAll({where: {id:[1,2,4,5]}, $not:[{name:'Jungle'}]}).then((data) =>{
		console.log(data, 'all artists except for jungle');
		res.send(data);
	})
})
//Here is where I obtained all of the songs with the artists information included 
app.get('/api/songs-with-artists', (req,res) =>{
	Song.findAll({include:[Artist]})
	.then((data) =>{
		console.log(data, 'these are the songs from this artists')
		res.send(data);
	})
})
//Here is where I obtained all of the songs from the artist Frank Ocean or Chromeo 
app.get('/api/artists/frank-or-chromeo', (req,res)=>{
	Song.findAll({include:[Artist],where: {artistId: 1}, $or:[{artistId: 4}]}).then((data)=>{
		console.log(data, 'Great Choice!');
		res.send(data);
	})

})
//Here I am creating a new arrtist 
app.post('/api/artists', (req,res) =>{
	Artist.create({name:req.body.name}).then((data)=>{
		console.log(data, 'New Artists!');
		res.send(data);
	})
})
//Here is where I can remove an artist from the database permeantly by using their ID number
app.delete('/api/artists/:id', (req,res)=>{
	Artist.destroy({where: {id: req.params.id}}).then((data,error)=>{
		console.log(data, 'you deleted it!');
		res.send(data);
	})
}).catch((err)=>{
	console.log(err, 'Error!')
})

//Here is where I updated the artists by referencing it by its ID number 
app.put('/api/artists/:id', (req,res) =>{
	Artist.update({name:req.body.name}, {where:{id:req.params.id} }).then((data)=>{
		console.log(data, 'you made an update! ');
		res.send(data);
	})
})

//Here I am using a special method within sequelize and to find a specific artists or create a new one within the database
app.post('/api/songs', (req,res) =>{
Artist.findOrCreate({
	where: {
		name: req.body.name
	}
}).then((artist)=>{
	console.log(artist[0].dataValues.id, 'this is the artist')
	return Song.findOrCreate({
		where:{
			title:req.body.title,
			artistId: artist[0].dataValues.id,
			youtube_url:req.body.youtube_url
		},
		include:[Artist]
	})
}).then((song)=>{
	console.log(artist,' New Artist');
	res.send(song);
}).catch((err)=>{
	console.log(err);
})




