'use strict';

angular.module('digitalartshopApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })
        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

			// route for the exhibition page
            .state('app.exhibition', {
                url: 'exhibition',
                views: {
                    'content@': {
                        templateUrl : 'views/exhibition.html',
                        controller  : 'ExhibitionController'
                    }
                }
            })
			
            // route for the online shop page
            .state('app.onlineshop', {
                url: 'onlineshop',
                views: {
                    'content@': {
                        templateUrl : 'views/onlineshop.html',
                        controller  : 'OnlineshopController'
                    }
                }
            })

            // route for the artwork details page
            .state('app.artworkdetails', {
                url: 'onlineshop/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/artworkdetail.html',
                        controller  : 'ArtworkDetailController'
                   }
                }
            })
        
            // route for the wishlist page
            .state('app.wishlists', {
                url: 'wishlists',
                views: {
                    'content@': {
                        templateUrl : 'views/wishlists.html',
                        controller  : 'WishlistController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
