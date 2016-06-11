var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Feedbacks = require('../models/feedbacks');
var Verify = require('./verify');

var feedbackRouter = express.Router();

feedbackRouter.use(bodyParser.json());

feedbackRouter.route('/')

.get(function(req,res,next){
    Feedbacks.find(req.query, function (err, feedback) {
        if (err) next(err);
        res.json(feedback);
    });
})

.post(function(req, res, next){
    Feedbacks.create(req.body, function (err, feedback) {
        if (err) next(err);
        console.log('Feedback created!');
        var id = feedback._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the feedback with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Feedbacks.remove({}, function (err, resp) {
        if (err) next(err);
        res.json(resp);
    });
});

feedbackRouter.route('/:feedbackId')

.get(function(req,res,next){
        Feedbacks.findById(req.params.feedbackId)
        
        .exec(function (err, feedback) {
        if (err) next(err);
        res.json(feedback);
    });
})

.put(function(req, res, next){
        Feedbacks.findByIdAndUpdate(req.params.feedbackId, {
        $set: req.body
    }, {
        new: true
    }, function (err, feedback) {
        if (err) NEXT(err);
        res.json(feedback);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Feedbacks.findByIdAndRemove(req.params.feedbackId, function (err, resp) {
		if (err) next(err);
        res.json(resp);
    });
});

module.exports = feedbackRouter;