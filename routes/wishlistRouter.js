var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Artworks = require('../models/artworks');
var Wishlists = require('../models/wishlists');
var Verify = require('./verify');

var wishlistRouter = express.Router();

wishlistRouter.use(bodyParser.json());

wishlistRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    	
	Wishlists.findOne({postedBy:req.decoded._id})
		.populate('postedBy')
	    .populate('artworks._id')
        .exec(function (err, wishlist) {
        if (err) throw err;
        res.json(wishlist);
		});
})

.post(function (req, res, next) {
    	
	Wishlists.findOne({postedBy:req.decoded._id}, function(err, wishlist){
		
		if (err) {next(err)};
		if (wishlist == null){
			console.log('no record');
			Wishlists.create({postedBy:req.decoded._id}, function (err, wishlist) {
				if (err) throw err;
				wishlist.artworks.push(req.body._id);
				console.log('Wishlist = ' + wishlist);
				wishlist.save(function (err, dish) {
					if (err) throw err;
					console.log('Saving wishlists');
					res.json(wishlist);
				});
			});
		} else {
			console.log("wishlist already exists");
			
			var NewArtworkId = true;
			for (var i = 0 ; i < (wishlist.artworks.length); i++){
				if (wishlist.artworks[i]._id == (req.body._id)  ){
					NewArtworkId = false;
				}
			};
			
			if (NewArtworkId){
				wishlist.artworks.push(req.body._id);
				wishlist.save(function(err,wishlist){
					if (err) next(err);
					console.log(wishlist);
					res.json(wishlist);
				});
			} else {
				res.json({
					failure: "This artwork is already in your wishlist list."
				});
			};
		};
	});
})

.delete(function (req, res, next) {
    
	Wishlists.findOne({postedBy:req.decoded._id}, function(err, wishlist) {
	
		wishlist.remove({postedBy:req.decoded._id});
		wishlist.save(function (err, resp) {
			if (err) throw err;
			res.json(resp);
		});
	});	
});	

wishlistRouter.route('/:wishlistId')

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
	
	Wishlists.findOne({postedBy:req.decoded._id}, function(err, wishlist){
		
		if (err) {next(err)};
		
		wishlist.artworks.id(req.params.wishlistId).remove();
        wishlist.save(function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });
});
 
module.exports = wishlistRouter;