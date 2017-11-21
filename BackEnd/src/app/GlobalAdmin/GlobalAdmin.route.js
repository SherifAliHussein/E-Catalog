(function() {
    'use strict';

    angular
        .module('home')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
              .state('restaurantType', {
					url: '/restaurantType',
                    templateUrl: './app/GlobalAdmin/templates/restaurantType.html',
                    controller: 'restaurantTypeController',
                    'controllerAs': 'restaurantTypeCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurantType'
                    },
                    resolve: {
                        restaurantTypePrepService: restaurantTypePrepService
                    }
                 
                })
				.state('restaurants', {
					url: '/restaurants',
                    templateUrl: './app/GlobalAdmin/templates/restaurant.html',
                    controller: 'restaurantController',
                    'controllerAs': 'restaurantCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
                        restaurantsPrepService: restaurantsPrepService
                    }
                 
                })
				.state('newRestaurant', {
					url: '/newRestaurant',
                    templateUrl: './app/GlobalAdmin/templates/newRestaurant.html',
                    controller: 'newRestaurantController',
                    'controllerAs': 'rewRestCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
						englishRestaurantPrepService: englishRestaurantPrepService,
                        allRestaurantTypePrepService: allRestaurantTypePrepService
                    }                 
                })
				.state('editRestaurant', {
					url: '/Restaurant/:restaurantId',
                    templateUrl: './app/GlobalAdmin/templates/editRestaurant.html',
                    controller: 'editRestaurantController',
                    'controllerAs': 'editRestCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
						restaurantPrepService:restaurantPrepService,
                        allRestaurantTypePrepService: allRestaurantTypePrepService
                    }                 
                })
        });

	restaurantTypePrepService.$inject = ['RestaurantTypeResource']
    function restaurantTypePrepService(RestaurantTypeResource) {
        return RestaurantTypeResource.getAllRestaurantType().$promise;
    }

	restaurantsPrepService.$inject = ['RestaurantResource']
    function restaurantsPrepService(RestaurantResource) {
        return RestaurantResource.getAllRestaurant().$promise;
    }
	
	allRestaurantTypePrepService.$inject = ['RestaurantTypeResource']
    function allRestaurantTypePrepService(RestaurantTypeResource) {
        return RestaurantTypeResource.getAllRestaurantType().$promise;
    }
	
	restaurantPrepService.$inject = ['RestaurantResource','$stateParams']
    function restaurantPrepService(RestaurantResource,$stateParams) {
        return RestaurantResource.getRestaurant({ restaurantId: $stateParams.restaurantId }).$promise;
    }
	
	englishRestaurantPrepService.$inject = ['RestaurantResource','$localStorage','appCONSTANTS']
    function englishRestaurantPrepService(RestaurantResource,$localStorage,appCONSTANTS) {
		if($localStorage.language != appCONSTANTS.defaultLanguage){
			return RestaurantResource.getAllRestaurant({pagesize:0, lang:'en'}).$promise;
		}
		else
			return null;
        
    }
}());
