(function() {
  angular
    .module('home')
    .factory('RestaurantResource', ['$resource', 'appCONSTANTS', RestaurantResource])
    .factory('ActivateRestaurantResource', ['$resource', 'appCONSTANTS', ActivateRestaurantResource])
    .factory('DeactivateRestaurantResource', ['$resource', 'appCONSTANTS', DeactivateRestaurantResource]);

  function RestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId', {}, {
      getAllRestaurant: { method: 'GET', useToken: true,params:{lang:'@lang'} },
      getRestaurant: { method: 'GET', useToken: true },
	    create: { method: 'POST', useToken: true },
	    deleteRestaurant: { method: 'DELETE', useToken: true },
	    update: { method: 'PUT', useToken: true }
    })
  }

  function ActivateRestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId/Activate', {}, {
	    Activate: { method: 'GET', useToken: true }
    })
  }
  function DeactivateRestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId/DeActivate', {}, {
	    DeActivate: { method: 'GET', useToken: true }
    })
  }
  
}());
