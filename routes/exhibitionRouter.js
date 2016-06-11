var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Exhibitions = require('../models/exhibitions');
var Verify = require('./verify');

var exhibitionRouter = express.Router();

exhibitionRouter.use(bodyParser.json());

exhibitionRouter.route('/')

.get(function(req,res,next){
    Exhibitions.find(req.query, function (err, exhibition) {
        if (err) next(err);
        res.json(exhibition);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
    Exhibitions.create(req.body, function (err, exhibition) {
        if (err) next(err);
        console.log('Exhibition created!');
        var id = exhibition._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the exhibition with id: ' + id);
    });    
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Exhibitions.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

exhibitionRouter.route('/:exhibitionId')

.get(function(req,res,next){
        Exhibitions.findById(req.params.exhibitionId, function (err, exhibition) {
        if (err) next(err);
        res.json(exhibition);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Exhibitions.findByIdAndUpdate(req.params.exhibitionId, {
        $set: req.body
    }, {
        new: true
    }, function (err, exhibition) {
        if (err) next(err);
        res.json(exhibition);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Exhibitions.findByIdAndRemove(req.params.exhibitionId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = exhibitionRouter;