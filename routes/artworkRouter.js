var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Artworks = require('../models/artworks');
var Verify = require('./verify');

var artworkRouter = express.Router();

artworkRouter.use(bodyParser.json());

artworkRouter.route('/')

.get(function(req,res,next){
    Artworks.find(req.query)
        .populate('comments.postedBy')
        .exec(function (err, artwork) {
        if (err) next(err);
        res.json(artwork);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Artworks.create(req.body, function (err, artwork) {
        if (err) next(err);
        console.log('Artwork created!');
        var id = artwork._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the artwork with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Artworks.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

artworkRouter.route('/:artworkId')

.get(function(req,res,next){
        Artworks.findById(req.params.artworkId)
        .populate('comments.postedBy')
        .exec(function (err, artwork) {
        if (err) next(err);
        res.json(artwork);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Artworks.findByIdAndUpdate(req.params.artworkId, {
        $set: req.body
    }, {
        new: true
    }, function (err, artwork) {
        if (err) next(err);
        res.json(artwork);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Artworks.findByIdAndRemove(req.params.artworkId, function (err, resp) {
		if (err) next(err);
        res.json(resp);
    });
});

artworkRouter.route('/:artworkId/comments')

.get(function (req, res, next) {
    Artworks.findById(req.params.artworkId)
        .populate('comments.postedBy')
        .exec(function (err, artwork) {
        if (err) next(err);
        res.json(artwork.comments);
    });
})

.post(Verify.verifyOrdinaryUser,function (req, res, next) {
    Artworks.findById(req.params.artworkId, function (err, artwork) {
        if (err) next(err);
		req.body.postedBy = req.decoded._id;
        artwork.comments.push(req.body);
        artwork.save(function (err, artwork) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(artwork);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Artworks.findById(req.params.artworkId, function (err, artwork) {
        if (err) next(err);
        for (var i = (artwork.comments.length - 1); i >= 0; i--) {
            artwork.comments.id(artwork.comments[i]._id).remove();
        }
        artwork.save(function (err, result) {
            if (err) next(err);
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Deleted all comments!');
        });
    });
});

artworkRouter.route('/:artworkId/comments/:commentId')

.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Artworks.findById(req.params.artworkId)
        .populate('comments.postedBy')
        .exec(function (err, artwork) {
        if (err) next(err);
        res.json(artwork.comments.id(req.params.commentId));
    });
})

.put(Verify.verifyOrdinaryUser, function (req, res, next) {
    // We delete the existing commment and insert the updated
    // comment as a new comment
    Artworks.findById(req.params.artworkId, function (err, artwork) {
        if (err) next(err);
        artwork.comments.id(req.params.commentId).remove();
		req.body.postedBy = req.decoded._id;
        artwork.comments.push(req.body);
        artwork.save(function (err, artwork) {
            if (err) next(err);
            console.log('Updated Comments!');
            res.json(artwork);
        });
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Artworks.findById(req.params.artworkId, function (err, artwork) {
		if (artwork.comments.id(req.params.commentId).postedBy
           != req.decoded._id) {
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }
        artwork.comments.id(req.params.commentId).remove();
        artwork.save(function (err, resp) {
            if (err) next(err);
            res.json(resp);
        });
    });
});

module.exports = artworkRouter;