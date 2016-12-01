const Song = require('../models/song-model');
const Artist = require('../models/artist-model');
const express = require('express');
const router = express.Router();

///////////////////////////////
////////// FUNCTIONS //////////
///////////////////////////////


//////////
/// #8 ///
//////////

function getAllArtists(request, response) {
  Artist.findAll()
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      response.send('Error Getting All Artists')
    })
}

//////////
/// #9 ///
//////////

function getArtistsInAlphabeticalOrder(request, response) {
  Artist.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting Artists In Alphabetical Order!')
  })
}

//////////
/// #10 ///
//////////

function getSpecificArtistById(request, response) {
  Artist.findById(request.params.id)
    .then((data) => {
      response.send(data)
    }).catch((error) => {
      response.send('Error Getting Artist By Id!')
    })
}

//////////
/// #11 ///
//////////

function getSpecificArtistByName(request, response) {
  Artist.findAll({
    where: {
      name: request.params.name
    }
  })
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      response.send('Error Getting Specific Artist By Name')
    })
}

//////////
/// #12 ///
//////////

function getAllArtistsExceptSelected(request, response) {
  Artist.findAll({
    where: {
      $not: [
        { 
          name: request.params.name 
        }
      ]
    }
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Excluding Specific Artist')
  })
}

//////////
/// #15 ///
//////////

function getFrankOrChromeoSongs(request, response) {
  Artist.findAll({
    where: {
      $or: [
        {
          name: 'Frank Ocean'
        },
        {
          name: 'Chromeo'
        }
      ]
    }
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting Songs By Frank Ocean Or Chromeo!')
  })
}

//////////
/// #16 ///
//////////

function postNewArtist(request, response) {
  Artist.create({
    name: request.body.name
  })
  .then((data) => {
    response.send('New Artist Created!')
  })
  .catch((error) => {
    response.send('Error Creating New Artist!')
  })
}

//////////
/// #17 ///
//////////

function deleteArtist(request, response) {
  Artist.destroy({
    where: {
      id: request.params.id
    }
  })
  .then((data) => {
    response.send('Artist Deleted')
  })
  .catch((error) => {
    response.send('Error Deleting Artist!')
  })
}

//////////
/// #18 ///
//////////

function updateArtist(request, response) {
  return Artist.update(
    {
      name: request.body.name
    },
    {
      where: 
        { 
          id: request.params.id
        }
    }
  )
    .then((data) => {
      response.send(data)
    })
    .catch((error) => {
      console.log(error)
      response.send('Error Updating Artist Name!')
    })
}

////////////////////////////
////////// ROUTES //////////
////////////////////////////

router.route('/') 
  .get(getAllArtists)
  .post(postNewArtist)

router.route('/:id')
  .put(updateArtist)

router.route('/sort/a-z')
  .get(getArtistsInAlphabeticalOrder)

router.route('/id/:id')
  .get(getSpecificArtistById)
  .delete(deleteArtist)

router.route('/name/:name')
  .get(getSpecificArtistByName)

router.route('/no-:name')
  .get(getAllArtistsExceptSelected)

router.route('/frank-or-chromeo')
  .get(getFrankOrChromeoSongs)

module.exports = router;
