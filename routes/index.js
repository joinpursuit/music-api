const songRouter= require('./songRoute');
const artistRouter= require('./artistRoute');
const SWARouter = require('./SWARoute');

module.exports = {
    songRouter: songRouter,
    artistRouter: artistRouter,
    SWARouter: SWARouter
}