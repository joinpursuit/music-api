const express = require('express');
const app = express();
const path = require('path');//module built into node js, has a bunch of methods that will help you get absolute file paths
const bodyParser = require('body-parser');//middleware built into express.
const Sequelize = require('sequelize');//setups connections to database
const sequelizeConnection = require('./db');//importing the file where we actually make our database. whereas mongodb lets us make a database on one line, sequelize requires a couple more lines of code
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//body-parser middleware adds .body property to req (if we make a POST AJAX request with some data attached, that data will be accessible as req.body)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.get('/api/songs', (req,res) => {
  Song.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
})

app.get('/api/songs/id/:id', (req, res) => {
  Song.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
})

app.get('/api/songs/name/:name', (req,res)=>{
    Song.findOne({ where: {title: req.params.name} })
    .then((data)=>{
        res.send(data)
    })
})

//es5 way of finding by name -- works
// app.get('/api/songs/name/:name', function (req, res) {
//   Song.find({name: {'$in' : [req.params.name]}})
//     .then (function (err, data) {
//       if(err) {
//         res.send(err);
//       } else {
//         res.json(data);
//       }
//     })
// })

app.get('/api/songs/sort/by-date', (req, res) => {
  Song.findAll({
    order:[['createdAt',  'DESC']]
  })
    .then((data) => {
      res.send(data)
    })
})

//es5
// app.get('/api/songs/sort/by-date', function (req, res) {
//   Song.findAll({order: [['updatedAt', 'DESC']] })
//     .then(function(err, data) {
//       if(err) {
//         res.send(err);
//       } else {
//         res.json(data);
//       }
//     })
// })

app.get('/api/songs/sort/a-z', (req, res) => {
  Song.findAll({
    order:[['title', 'ASC']]
  })
    .then((data) => {
      res.send(data)
    })
})

//es5
// app.get('/api/songs/sort/a-z', function (req, res) {
//   Song.findAll({order: 'title' })
//     .then(function(err, data) {
//       if(err) {
//         res.send(err);
//       } else {
//         res.send(data);
//       }
//     })
// })

app.get('/api/songs/count', (req,res) => {
  Song.findAndCountAll()
    .then((data) => {
      res.send(data)
    })
})

//es5
// app.get('/api/songs/count', (req, res) => {
//   Song.findAndCountAll()
//   .then(function(err,data){
//     if(err){
//       res.send(err)
//     }else{
//       res.json(data)
//     }
//   })
// })


app.get('/api/songs/first-five', (req, res) => {
  Song.findAll({
    order:[['updatedAt',  'DESC']],
    limit:5
  })
    .then((data) => {
      res.send(data)
    })
})


// //////////////////////////////////////////

app.get('/api/artists', (req,res) => {
  Artist.findAll()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
})

app.get('/api/artists/sort/a-z', (req, res) => {
  Artist.findAll({
    order:[['name', 'ASC']]
  })
    .then((data) => {
      res.send(data)
    })
})


app.get('/api/artists/id/:id', (req, res) => {
  Artist.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
})

app.get('/api/artists/name/:name', (req,res)=>{
    Artist.findOne({ where: {name: req.params.name} })
    .then((data)=>{
        res.send(data)
    })
})

app.get('/api/artists/no-jungle', (req, res) => {
  Artist.findAll({
  where: [{
        $not: [
          { name: "Jungle" }
        ]
      }]
})
  .then((data) => {
    res.send(data)
  })
})

app.get('/api/songs-with-artist', (req,res) => {
  Song.findAll({include:[Artist]})
    .then((data) => {
      res.send(data);
    })
})

//es5
// app.get('/api/songs-with-artist', function (req, res) {
//   Song.findAll({include: [Artist]})
//     .then(function(err, data) {
//       if (err) {
//         res.send(err)
//       } else {
//         res.send(data)
//       }
//     })
// })

app.get('/api/artists/frank-or-chromeo', (req, res) => {
  Song.findAll({
    include: [{
      model: Artist,
      where: {
        $or: [
          {name: 'Frank Ocean'},
          {name: 'Chromeo'}
        ]
      }
    }]
  })
  .then((data) => {
    res.send(data)
  })
})

// app.post('/api/artists', (req,res)=>{
//     Artist.create({ name: req.params.name})
//       .then((data)=>{
//         res.send(data)
//     })
// })

app.post('/api/artists', function(req, res) {
	Artist.create({ name: req.body.name}) //We are not using params, we are using the body!!!!!
	.then(function(err) {
		if (err) {
			res.send(err);
		} else {
			res.json({message: 'New Artist created!'});
		}
	})
})

app.delete('/api/artists/:id', function(req, res) {
	Artist.findById(req.params.id) //We are not using params, we are using the body!!!!!
	.then(function(artist) {
		artist.destroy()
	})
	.then(function(data) {
		console.log('Deleted!')
		res.send(data)
	})
})

app.put('/api/artists/:id', function(req, res) {
	Artist.findById(req.params.id)
	.then(function(artist) {
		artist.update({name: req.body.name})
	})
	.then(function(data) {
		console.log('Updated!')
		res.send(data)
	})
})

app.post('/api/songs', (req, res) => {
    Artist.findOrCreate({
        where: {name: req.body.name},
        defaults: {}
    })
    .then( (artist) =>{
        return Song.create({
            title: req.body.title,
            youtube_url: req.body.url,
            artistId: artist[0].dataValues.id
        })
    }).then(function(err, data) {
		err ? res.send(err) : res.send(data)
	})
});

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


// MY VERSION
// app.post('/api/songs', function(req, res) {
// 	Artist.findOrCreate({
// 		where: {
// 			name: req.body.name
// 		},
// 		defaults: {}
// 	}).then(function(artist) {
// 		Song.findOrCreate({
// 			where: {
// 				title: req.body.title,
// 				artistId: artist[0].dataValues.id
// 			},
// 			defaults: {}
// 		})
// 	}).then(function(err, data) {
// 		if (err) {
// 			res.send(err)
// 		} else {
// 			res.send(data)
// 		}
// 	})
// })
// app.get('/api/songs/name/:name', function (req, res) {
// 	Song.find({name: req.params.name})
// 		.then (function (err, data) {
// 			if(err) {
// 				res.send(err);
// 			} else {
// 				res.json(data);
// 			}
// 		})
// })
