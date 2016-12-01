const Song = require('../models/song-model');
const Artist = require('../models/artist-model');
const express = require('express');
const router = express.Router();

///////////////////////////////
////////// FUNCTIONS //////////
///////////////////////////////

//////////
/// #1 ///
//////////

function getAllSongs(request, response) {
  Song.findAll({
    include: [
      Artist
    ]
  })
    .then((data) => {
      response.send(data)
    }).catch((error) => {
      response.send('Error Getting All Songs!')
    })
}

//////////
/// #2 ///
//////////

function getSpecificSongById(request, response) {
  Song.findOne({
    where: {
      id: request.params.id
      },
    include: [
      Artist
    ]
  })
    .then((data) => {
      response.send(data)
    }).catch((error) => {
      response.send('Error Getting Song By Id!')
    })
}

//////////
/// #3 ///
//////////

function getSpecificSongByName(request, response) {
  Song.findOne({
    include: [
      Artist
    ],
    where: {
      title: request.params.name
    }
  })
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      response.send('Error Getting Specific Song By Name')
    })
}

//////////
/// #4 ///
//////////

function getSongsInOrderByDateCreated(request, response) {
  Song.findOne({
    include: [
      Artist
    ],
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting Songs In Order By Date Created')
  })
}

//////////
/// #5 ///
//////////

function getSongsInAlphabeticalOrder(request, response) {
  Song.findOne({
    include: [
      Artist
    ],
    order: [
      ['title', 'ASC']
    ]
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting Songs In Alphabetical Order!')
  })
}

//////////
/// #6 ///
//////////

function getNumberOfSongsInDatabase(request, response) {
  Song.count({
    include: [
      Artist
    ],
  })
    .then((data) => {
      response.send('There are ' + data + ' in this database!')
    })
    .catch((error) => {
      response.send('Error Getting The Number Of Songs In Database')
    })
}

//////////
/// #7 ///
//////////

function getFirstFiveSongsInOrder(request, response) {
  Song.findOne({
    include: [
      Artist
    ],
    limit: 5,
    order: [
      ['createdAt', 'ASC']
    ]
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting Songs In Order By Date Created')
  })  
}

////////////////////////////
////////// ROUTES //////////
////////////////////////////

router.route('/') 
  .get(getAllSongs)

router.route('/id/:id')
  .get(getSpecificSongById)

router.route('/name/:name')
  .get(getSpecificSongByName)

router.route('/sort/by-date')
  .get(getSongsInOrderByDateCreated)

router.route('/sort/a-z')
  .get(getSongsInAlphabeticalOrder)

router.route('/count')
  .get(getNumberOfSongsInDatabase)

router.route('/first-five')
  .get(getFirstFiveSongsInOrder)

module.exports = router;

