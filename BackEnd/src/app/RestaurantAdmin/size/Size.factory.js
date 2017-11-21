(function() {
    angular
      .module('home')
      .factory('SizeResource', ['$resource', 'appCONSTANTS', SizeResource]);
  
    function SizeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Sizes/:SizeId', {}, {
        getAllSizes: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteSize: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    
  }());
  