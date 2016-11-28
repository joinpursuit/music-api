const Sequelize = require('sequelize');
const sequelizeConnection = new Sequelize('postgres://natemaddrey@localhost:5432/test-music-db');

//Test to see if the connection worked
sequelizeConnection
.authenticate()
.then((err) => console.log('Sequelize connection successful'))
.catch((err) => console.log('Unable to connect to the database:', err));

module.exports = sequelizeConnection;
