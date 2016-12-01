const songs = require('./songs-router');
const artists = require('./artist-router');
const songsWithArtists = require('./songsWithArtists')

module.exports = {
  songsRouterFile: songs,
  artistsRouterFile: artists,
  songsWithArtistsRouterFile: songsWithArtists
}