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

app.get('/api/songs', (req, res) => {
  Song.findAll({include: [Artist]}).then((data) => (
    res.send(data)
  ))
})

app.post('/api/songs', (req, res) => {
  Artist.findOrCreate({where: {name: req.body.artist}}).then((data) => {
    let newSong = {}
    newSong.title = req.body.title;
    newSong.youtube_url = (req.body.youtube_url) ? req.body.youtube_url : null;
    newSong.artistId = data[0].id;

    return newSong;

  }).then((newSong) => {
    Song.create(newSong);
  }).then(() => {
    res.sendStatus(200);
  })
})

app.get('/api/songs/id/:id', (req, res) => {
  Song.findById(req.params.id, {include: [Artist]}).then((data) => (
    res.send(data)
  ))
})

app.get('/api/songs/name/:name', (req, res) => {
  Song.findOne({where: {title: req.params.name}, include: [Artist]}).then((data) => {
    res.send(data)
  })
})

app.get('/api/songs/artist/:name', (req, res) => {
  Artist.findOne({where: {name: req.params.name}}).then((data) => {
    Song.findAll({where: {artistId: data.id}, include: [Artist]}).then((songs) => {
      res.send(songs);
    })
  })
})

app.get('/api/songs/sort/by-date', (req, res) => {
  Song.findAll({order: ['createdAt'], include: [Artist]}).then((data) => {
    res.send(data);
  })
})

app.get('/api/songs/sort/a-z', (req, res) => {
  Song.findAll({order: ['title'], include: [Artist]}).then((data) => {
    res.send(data);
  })
})

app.get('/api/songs/count', (req, res) => {
  Song.count().then((data) => {
    console.log(data);
    res.send({count: data.toString()});
  })
})

app.get('/api/songs/first-five', (req, res) => {
  Song.findAll({order: ['createdAt'], limit: 5, include: [Artist]}).then((data) => {
    res.send(data);
  })
})

app.get('/api/artists', (req, res) => {
  Artist.findAll().then((data) => {
    res.send(data);
  })
})

app.post('/api/artists', (req, res) => {
  Artist.create(req.body).then((data) => {
    res.sendStatus(200);
  })
})

app.get('/api/artists/sort/a-z', (req, res) => {
  Artist.findAll({order: ['name']}).then((data) => {
    res.send(data);
  })
})


app.get('/api/artists/id/:id', (req, res) => {
  Artist.findById(req.params.id).then((data) => (
    res.send(data)
  ))
})

app.delete('/api/artists/:id', (req, res) => {
  Artist.findById(req.params.id).then((artist) => {
    artist.destroy();
  }). then(() => {
    res.sendStatus(200);
  })
})

app.put('/api/artists/:id', (req, res) => {
  Artist.findById(req.params.id).then((artist) => {
    artist.update(req.body)
  }).then(() => {
    res.sendStatus(200);
  })
})

app.get('/api/artists/name/:name', (req, res) => {
  Artist.findOne({where: {name: req.params.name}}).then((data) => {
    console.log(data);
    res.send(data)
  })
})

app.get('/api/artists/no-jungle', (req, res) => {
  Artist.findAll({
    where: {
      $not: [{name: 'Jungle'}]
    }
  })
    .then((data) => {
      res.send(data)
    });
})

app.get('/api/songs-with-artists', (req, res) => {
  Song.findAll({include: [Artist]}).then((data) => {
    res.send(data);
  })
})

app.get('/api/artists/frank-or-chromeo', (req, res) => {
  Song.findAll({
    where: {
      $or: [{artistId: [1,4]}]
    },
    include: [Artist]
  }).then((data) => {
    res.send(data);
  })
})
