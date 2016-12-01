const songs = require('./songs-router.js');
const artists = require('./artists-router.js');
const songsWithArtists = require('./songs-with-artists.js')

module.exports = {
  songsRouterFile: songs,
  artistsRouterFile: artists,
  songsWithArtistsRouterFile: songsWithArtists
}