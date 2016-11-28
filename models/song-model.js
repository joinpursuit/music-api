const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');

// create the Song model
var Song = sequelizeConnection.define('song', {
  title: {type: Sequelize.STRING},
  youtube_id: {type: Sequelize.STRING}
});

//joining Song and Artist tables. this will aumatically add an 'artistId' field to the songs table
//see the docs for more info: http://docs.sequelizejs.com/en/latest/docs/associations/
Song.belongsTo(Artist);

module.exports = Song;
