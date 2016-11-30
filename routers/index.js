const songs = require('./songs-router');
const artists = require('./artist-router');
const songsWithArtists = require('./songsWithArtists')

module.exports = {
  songs: songs,
  artists: artists,
  songsWithArtists: songsWithArtists
}