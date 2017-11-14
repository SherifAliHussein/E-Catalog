(function() {
    angular
      .module('home')
      .factory('MenuResource', ['$resource', 'appCONSTANTS', MenuResource])
      .factory('ActivateMenuResource', ['$resource', 'appCONSTANTS', ActivateMenuResource])
      .factory('DeactivateMenuResource', ['$resource', 'appCONSTANTS', DeactivateMenuResource])
      .factory('CheckRestaurantReadyResource', ['$resource', 'appCONSTANTS', CheckRestaurantReadyResource])
      .factory('PublishRestaurantResource', ['$resource', 'appCONSTANTS', PublishRestaurantResource]);
  
    function MenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId', {}, {
        getAllMenus: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteMenu: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    function ActivateMenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/Activate', {}, {
        Activate: { method: 'GET', useToken: true}
      })
    }
    function DeactivateMenuResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }
    
    function CheckRestaurantReadyResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Restaurants/IsReady', {}, {
        IsReady: { method: 'GET', useToken: true }
      })
    }
    function PublishRestaurantResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Restaurants/Publish', {}, {
        Publish: { method: 'GET', useToken: true }
      })
    }

}());
  