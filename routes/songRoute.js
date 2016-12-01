var Song  = require('../models/song-model');
const Artist =require('../models/artist-model')
var express = require('express');
var songRouter  = express.Router();


const getAllSongs = (req, res)=>{
        Song.findAll({include: [Artist]})
            .then((songs)=> {
                // res.render('index', {
                //     title: 'Sequelize: Express Example',
                //     users: users
                // });
                res.send(songs)
            })
}

const getOneSong = (req, res)=>{
    Song.findById(req.params.id, {include: [Artist]})
        .then((data)=>{
        res.send(data)
})
}
const getSongsByTitle = (req,res)=> {
    Song.findOne(
        {
            where: {title: req.params.name},

        include: [Artist]

        })
        .then((data)=>{
        res.send(data)
})

}

const orderSongsByDate = (req,res)=> {
    Song.findAll(
        {
            order: [
                // Will escape username and validate DESC against a list of valid direction parameters
                ['updatedAt', 'DESC']
            ]
            ,
            include: [Artist]

            // // Will order by max(age)
            // sequelize.fn('max', sequelize.col('age')),

        })
        .then((data)=> {
        res.send(data)
    })
}

const orderSongsByTitle = (req,res)=> {
        Song.findAll(
            {
                order: [
                    // Will escape username and validate DESC against a list of valid direction parameters
                    ['title', 'DESC']
                ]
                // // Will order by max(age)
                // sequelize.fn('max', sequelize.col('age')),
                ,
                include: [Artist]


            })
            .then((data)=>{
            res.send(data)
    })
}

const countSongs = (req,res)=>{
    Song.count({
        include: [Artist]
        })
        .then((data) => {
        res.send(data.toString())
    })

}
const getFirstSongs = (req,res)=>{
    Song.findAll({ limit: 5,
                    order:
                        [['updatedAt','DESC']],
                    include: [Artist]
                })
        .then((data) => {
        res.send(data)
})

}

const deleteSong = (req,res)=> {
    Song.findOne({where:{id:req.params.id},new:true}).then((song)=>{
        return song.destroy({force:true})
    })
.then((data)=>{
        res.send(data)
})
}

const updateSong = (req,res)=> {
    Song.findOne({include:[Artist],where:{id:req.params.id}}).then((song)=>{
        return song.update({title: 'hello world'})
    })
.then((data)=>{
        res.send(data)
})
}

// const createSong= (req,res)=>{
//     Artist.findOrCreate(
//         {where:{name: req.body.name}}
//
//     ).then(artist=>{
//
//         Song.findOrCreate({where:{
//             title:req.body.title,
//             artistId: req.body.artist[0].dataValues.id
//         }})
//
//         .then(song=>{res.send(song)})
//
//     })
//
// }





const createSong = (req,res)=> {
    Artist
        .findOrCreate({where: {name: req.body.name}})
        .then((artist)=>{
            console.log('artist:',artist)
            Song.findOrCreate({
                 where:{
                title:req.body.title,
                artistId: artist[0].dataValues.id
            }
            }).then(song=>{
                res.send(song)
            })
        })
}



songRouter.route('/')
    .get(getAllSongs)
    .post(createSong)
songRouter.route('/id/:id')
    .get(getOneSong)
    .delete(deleteSong)
    .put(updateSong)
songRouter.route('/name/:name')
    .get(getSongsByTitle);
songRouter.route('/sort/by-date')
    .get(orderSongsByDate);
songRouter.route('/sort/a-z')
    .get(orderSongsByTitle);
songRouter.route('/count')
    .get(countSongs);
songRouter.route('/first-five')
    .get(getFirstSongs)

module.exports = songRouter;