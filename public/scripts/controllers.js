'use strict';

angular.module('digitalartshopApp')

.controller('OnlineshopController', ['$scope', 'onlineshopFactory', 'wishlistFactory', function ($scope, onlineshopFactory, wishlistFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showWishlists = false;
    $scope.showOnlineshop = false;
    $scope.message = "Loading ...";

    onlineshopFactory.query(
        function (response) {
            $scope.artworks = response;
            $scope.showOnlineshop = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "life";
        } else if (setTab === 3) {
            $scope.filtText = "object";
        } else if (setTab === 4) {
            $scope.filtText = "fiction";
		} else if (setTab === 5) {
            $scope.filtText = "pattern";
        } else if (setTab === 6) {
            $scope.filtText = "philosophy";	
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleWishlists = function () {
        $scope.showWishlists = !$scope.showWishlists;
    };
    
	$scope.toggleCart = function () {
        $scope.showCart = !$scope.showCart;
    };
	
    $scope.addToWishlists = function(artworkid) {
        console.log('Add to wishlists', artworkid);
        wishlistFactory.save({_id: artworkid});
        $scope.showWishlists = !$scope.showWishlists;
    };
	
	$scope.addToCart = function(artworkid) {
		$scope.showCart = !$scope.showCart;
	};
}])

.controller('ExhibitionController', ['$scope', 'exhibitionFactory', function ($scope, exhibitionFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    
    $scope.showExhibition = false;
    $scope.message = "Loading ...";

    exhibitionFactory.query(
        function (response) {
            $scope.exhibitions = response;
            $scope.showExhibition = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "life";
        } else if (setTab === 3) {
            $scope.filtText = "object";
        } else if (setTab === 4) {
            $scope.filtText = "fiction";
		} else if (setTab === 5) {
            $scope.filtText = "pattern";
        } else if (setTab === 6) {
            $scope.filtText = "philosophy";	
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };
    
}])

.controller('ContactController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

    $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
    };

    var channels = [{
        value: "tel",
        label: "Tel."
    }, {
        value: "Email",
        label: "Email"
    }];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

    $scope.sendFeedback = function () {


        if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
            $scope.invalidChannelSelection = true;
        } else {
            $scope.invalidChannelSelection = false;
			
            feedbackFactory.save($scope.feedback);
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: ""
            };
            $scope.feedback.mychannel = "";
            $scope.feedbackForm.$setPristine();
        }
    };
}])

.controller('ArtworkDetailController', ['$scope', '$state', '$stateParams', 'onlineshopFactory', 'commentFactory', function ($scope, $state, $stateParams, onlineshopFactory, commentFactory) {

    $scope.artwork = {};
    $scope.showArtwork = false;
    $scope.message = "Loading ...";

    $scope.artwork = onlineshopFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.artwork = response;
                $scope.showArtwork = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: ""
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
}])

// implement the HomeController and About Controller here

.controller('HomeController', ['$scope', 'onlineshopFactory', 'corporateFactory', 'exhibitionFactory', function ($scope, onlineshopFactory, corporateFactory, exhibitionFactory) {
    $scope.showArtwork = false;
    $scope.showArtist = false;
    $scope.showExhibition = false;
    $scope.message = "Loading ...";
	
    $scope.artist = corporateFactory.query({
           
        })
        .$promise.then(
            function (response) {
                var artists = response;
                $scope.artist = artists[0];
                $scope.showArtist = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
		
    $scope.artwork = onlineshopFactory.query({
            
        })
        .$promise.then(
            function (response) {
                var artworks = response;
                $scope.artwork = artworks[0];
                $scope.showArtwork = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
		
    var exhibitions = exhibitionFactory.query({
        label: "New"
    })
    .$promise.then(
            function (response) {
                var exhibitions = response;
                $scope.exhibition = exhibitions[0];
                $scope.showExhibition = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    $scope.artists = corporateFactory.query();

}])

.controller('WishlistController', ['$scope', '$state', 'wishlistFactory', function ($scope, $state, wishlistFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showWishlist = false;
    $scope.message = "Loading ...";

    wishlistFactory.query(
        function (response) {
            $scope.wishlists = response.artworks;
            $scope.showWishlist = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "life";
        } else if (setTab === 3) {
            $scope.filtText = "object";
        } else if (setTab === 4) {
            $scope.filtText = "fiction";
		} else if (setTab === 5) {
            $scope.filtText = "pattern";
        } else if (setTab === 6) {
            $scope.filtText = "philosophy";	
		} else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };
    
    $scope.deleteWishlist = function(wishlistid) {
        console.log('Delete wishlists', wishlistid);
        wishlistFactory.delete({id: wishlistid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };
    
}])

.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;