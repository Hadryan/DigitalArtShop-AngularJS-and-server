var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Artists = require('../models/artists');
var Verify = require('./verify');

var artistRouter = express.Router();

artistRouter.use(bodyParser.json());

artistRouter.route('/')

.get(function(req,res,next){
    Artists.find(req.query, function (err, artist) {
        if (err) next(err);
        res.json(artist);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Artists.create(req.body, function (err, artist) {
        if (err) throw err;
        console.log('Artist created!');
        var id = artist._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the artist with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Artists.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

artistRouter.route('/:artistId')

.get(function(req,res,next){
        Artists.findById(req.params.artistId)
        
        .exec(function (err, artist) {
        if (err) next(err);
        res.json(artist);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Artists.findByIdAndUpdate(req.params.artistId, {
        $set: req.body
    }, {
        new: true
    }, function (err, artist) {
        if (err) NEXT(err);
        res.json(artist);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Artists.findByIdAndRemove(req.params.artistId, function (err, resp) {
		if (err) next(err);
        res.json(resp);
    });
});

module.exports = artistRouter;