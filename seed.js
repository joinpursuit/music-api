'use strict';

const Sequelize = require('sequelize');
const sequelizeConnection = require('./db');
const Song = require('./models/song-model');
const Artist = require('./models/artist-model');

Artist.sync({force: true})
.then(() => {
  return Song.sync({force: true});
})
.then(() => {
  return Artist.bulkCreate([
    {name: 'Frank Ocean'},
    {name: 'Odesza'},
    {name: 'Jungle'},
    {name: 'Chromeo'},
    {name: 'Nas'},
  ])
})
.then(() => {
  return Artist.findAll()
})
.then((artists) => {
  // let artistId = artist.dataValues.id;
  var artistIDsMap = Sequelize.Utils._.reduce(artists, (obj, artist) => Object.assign(obj, {[artist.dataValues.name]: artist.dataValues.id}), {});
  // console.log(artists.forEach(artist) => console.log(artist.dataValues.id));
  // Table created
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
      title: 'Ivy',
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
  // console.log(data);
});

// //artistId will be added to Song model
// Song.belongsTo(Artist);
// //songId will be added on Artist model
// Song.hasOne(Artist);
// //songIds will be added to Artist
// Song.hasMany(Artist, {as: 'Artists'})
//
//
// //This will create a new model called UserProject with the equivalent foreign keys projectId and  userId.
// Project.belongsToMany(User, {through: 'UserProject'});
// User.belongsToMany(Project, {through: 'UserProject'});
