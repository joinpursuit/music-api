const router = require ("express").Router()

//router is a small version of app

router.use('/songs', require('./songs-router'))
router.use('/artists', require('./artists-router'))

// router.use('/artists')

// router.use('/songs-with-artists')

module.exports = router;