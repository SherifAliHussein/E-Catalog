(function() {
    angular
      .module('home')
      .factory('WaiterResource', ['$resource', 'appCONSTANTS', WaiterResource]);
  
    function WaiterResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Waiters/:waiterId', {}, {
        getAllWaiters: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteWaiter: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    
  }());
  