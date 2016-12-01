var Artist = require('../models/artist-model');
var Song  = require('../models/song-model');
var express = require('express');
var artistRouter  = express.Router();


const getAllArtists = (req, res)=>{
    Artist.findAll()
        .then((songs)=> {
        // res.render('index', {
        //     title: 'Sequelize: Express Example',
        //     users: users
        // });
        res.send(songs)
})
}

const getOneArtist = (req, res)=>{
    Artist.findById(req.params.id)
        .then((data)=>{
        res.send(data)
})
}
const getArtistsByTitle = (req,res)=> {
    Artist.findOne(
        {
            where: {name: req.params.name}
        })
        .then((data)=>{
        res.send(data)
})

}

const orderArtistsByDate = (req,res)=> {
    Artist.findAll(
        {
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['updatedAt', 'DESC']
            ]
            // // Will order by max(age)
            // sequelize.fn('max', sequelize.col('age')),

        })
        .then((data)=> {
        res.send(data)
})
}

const orderArtistsByTitle = (req,res)=> {
    Artist.findAll(
        {
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['name', 'DESC']
            ]
            // // Will order by max(age)
            // sequelize.fn('max', sequelize.col('age')),

        })
        .then((data)=>{
        res.send(data)
})
}

const getAllExpectOne = (req,res)=> {
    Artist.findAll(
        {
        where: {
            name: {
                $not: 'Jungle'

            },
            id: {
                $not: 2
            }
    }
    })
        .then((data)=>{
        res.send(data)
})
}
const getArtistOr = (req,res)=> {
    Song.findAll({
        include: [{
            model:Artist,
            where: {
            $or: [
                {name: 'Frank Ocean'},
                {name: 'Chromeo'}
                 ]
                }
        }]
    }).then((data)=>{
            res.send(data)
    })
    }

const createArtist = (req,res)=> {
    Artist.create({name:req.body.name, youtube_url: req.body.youtube_url})
        .then((data)=>{
        res.send(data)
    })
}

const deleteArtist = (req,res)=> {
    Artist.findOne({where:{id:req.params.id}}).then((artist)=>{
        return artist.destroy({force:true})
    })
.then((data)=>{
        res.send(data)
})
}

const updateArtist = (req,res)=> {
    Artist.findOne({where:{id:req.params.id}}).then((song)=>{
        return song.update({title: 'iliass'})
    })
.then((data)=>{
        res.send(data)
})
}

artistRouter.route('/')
    .get(getAllArtists)
    .post(createArtist);
artistRouter.route('/id/:id')
    .get(getOneArtist)
    .delete(deleteArtist)
    .put(updateArtist)
artistRouter.route('/name/:name')
    .get(getArtistsByTitle);
artistRouter.route('/sort/by-date')
    .get(orderArtistsByDate);
artistRouter.route('/sort/a-z')
    .get(orderArtistsByTitle);
artistRouter.route('/no-jungle')
    .get(getAllExpectOne)
artistRouter.route('/frank-or-chromeo')
    .get(getArtistOr)

module.exports = artistRouter;
