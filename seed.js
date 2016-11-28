'use strict';

const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

//create the artists table. using {force: true} will forcefully drop (aka delete) the artists table if it already exists
Artist.sync({force: true})
.then(() => {
  //create the songs table
  Song.sync({force: true});
})
.then(() => {
  //create all of the artists
  Artist.bulkCreate([
    {name: 'Frank Ocean'},
    {name: 'Odesza'},
    {name: 'Jungle'},
    {name: 'Chromeo'},
    {name: 'Nas'},
  ])
})
.then(() => {
  //find all of the newly created arists and return the results
  //(if we try to immediately return the artists after bulkCreate, the ids may all show up as 'null')
  return Artist.findAll()
})
.then((artists) => {
  //map the artists into an object that has artist name as key and artist id as values. this makes it a little easier to make sure we're getting the correct artist ids when we create new songs
  var artistIDsMap = Sequelize.Utils._.reduce(artists, (obj, artist) => Object.assign(obj, {[artist.dataValues.name]: artist.dataValues.id}), {});
  //create all of the songs
  return Song.bulkCreate([
    {
      title: 'White Ferrari',
      artistId: artistIDsMap['Frank Ocean']
    },
    {
      title: 'Pyramids',
      artistId: artistIDsMap['Frank Ocean']
    },
    {
      title: 'Sweet Life',
      artistId: artistIDsMap['Frank Ocean']
    },
    {
      title: 'Time',
      artistId: artistIDsMap['Jungle']
    },
    {
      title: 'Busy Earnin',
      artistId: artistIDsMap['Jungle']
    },
    {
      title: 'The Heat',
      artistId: artistIDsMap['Jungle']
    },
    {
      title: 'My Friends Never Die',
      artistId: artistIDsMap['Odesza']
    },
    {
      title: 'Bloom',
      artistId: artistIDsMap['Odesza']
    },
    {
      title: 'Kusanagi',
      artistId: artistIDsMap['Odesza']
    },
    {
      title: 'Old 45s',
      artistId: artistIDsMap['Chromeo']
    },
    {
      title: 'Jealous',
      artistId: artistIDsMap['Chromeo']
    },
    {
      title: 'Night by Night',
      artistId: artistIDsMap['Chromeo']
    },
    {
      title: 'The World Is Yours',
      artistId: artistIDsMap['Nas']
    },
    {
      title: 'If I Ruled The World',
      artistId: artistIDsMap['Nas']
    },
    {
      title: 'NY State of Mind',
      artistId: artistIDsMap['Nas']
    }
  ])
})
.then((data) => {
  if(data) console.log('Database seed successful!');
})
.catch((err) => {
  if(err) console.error('Seed error!', err);
});
