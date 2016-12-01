const Song = require('../models/song-model');
const Artist = require('../models/artist-model');
const express = require('express');
const router = express.Router();

///////////////////////////////
////////// FUNCTIONS //////////
///////////////////////////////


//////////
/// #13 ///
//////////

function getAllTrackInformation(request, response) {
  Song.findAll({
    include: [
      Artist
    ]
  })
  .then((data) => {
    response.send(data)
  })
  .catch((error) => {
    response.send('Error Getting All Track Information!')
  })
} 

//////////
/// #15 ///
//////////

//////////
/// #16 ///
//////////

//////////
/// #17 ///
//////////

//////////
/// #18 ///
//////////

//////////
/// #19///
//////////

////////////////////////////
////////// ROUTES //////////
////////////////////////////

router.route('/') 
  .get(getAllTrackInformation)

module.exports = router;