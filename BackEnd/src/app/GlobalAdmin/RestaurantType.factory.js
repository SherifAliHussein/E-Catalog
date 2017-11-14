(function() {
  angular
    .module('home')
    .factory('RestaurantTypeResource', ['$resource', 'appCONSTANTS', RestaurantTypeResource]);

  function RestaurantTypeResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/Type/:restaurantTypeId', {}, {
      getAllRestaurantType: { method: 'GET', useToken: true,isArray: true, params:{lang:'@lang'} },
	  create: { method: 'POST', useToken: true },
	  deleteType: { method: 'DELETE', useToken: true },
	  update: { method: 'PUT', useToken: true }
    })
  }
  
}());
