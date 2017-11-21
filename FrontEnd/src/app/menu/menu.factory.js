(function() {
    angular
      .module('home')
      .factory('MenuResource', ['$resource', 'appCONSTANTS', MenuResource])  
      .factory('CategoriesResource', ['$resource', 'appCONSTANTS', CategoriesResource])

    function MenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId', {}, {
        getAllMenus: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteMenu: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    
    function CategoriesResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/Categories', {}, {
          getAllCategories: { method: 'GET', useToken: true, params:{lang:'@lang'} }
        })
    }


}());
  