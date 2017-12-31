(function() {
    angular
      .module('home')
      .factory('BackgroundResource', ['$resource', 'appCONSTANTS', BackgroundResource])  

      function BackgroundResource($resource, appCONSTANTS) {  
              return $resource(appCONSTANTS.API_URL + 'Backgrounds/GetAllBackground', {}, { 
                getAllBackgrounds: { method: 'GET', useToken: true, params:{lang:'@lang'} }
        })
    }
   
}());
  