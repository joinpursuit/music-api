const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');
const Artist = require('./artist-model');

var Song = sequelizeConnection.define('song', {
  title: {
    type: Sequelize.STRING
  },
  youtube_id: {type: Sequelize.STRING}
});

Song.belongsTo(Artist);

module.exports = Song;
