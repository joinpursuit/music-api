const Sequelize = require('sequelize');
const sequelizeConnection = require('../db');

var Artist = sequelizeConnection.define('artist', {
  name: {
    type: Sequelize.STRING
  }
});

module.exports = Artist;
