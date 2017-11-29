(function() {
    'use strict';

    angular
        .module('core')
        .config(function($stateProvider, $urlRouterProvider,) {

            $urlRouterProvider.otherwise('/');

            // main views
            $stateProvider
              .state('root', {
                    url: '/',
               
                    controller: 'loginController',
                   
                    data: {
                       permissions: {
                          
                        }
                    },
                 
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './app/core/login/templates/login.html',
                    'controller': 'loginController'
                })
                .state('menu', {
                    url: '/menu',
                    templateUrl: './app/menu/menu.html',
                    controller: 'menuController',
                    'controllerAs': 'menuCtrl',
                    resolve: {
                        menuPrepService: menuPrepService,
                        ResturantPrepService: ResturantPrepService
                    }
                })


                //$locationProvider.html5Mode(true);
                .state('Items', {
                    url: '/Category/:categoryId/Item',
                    templateUrl: './app/items/Templates/Item.html',
                    controller: 'ItemController',
                    'controllerAs': 'itemCtrl',
                    data: {
                        permissions: {
                            // only: ['Waiter'],
                            redirectTo: 'root'
                        },
                        displayName: 'items'
                    },
                    resolve: {
                        categoryItemsTemplatePrepService: categoryItemsTemplatePrepService
                    }
                })
                .state('cart', {
                    url: '/cart',
                    templateUrl: './app/cart/cart.html',
                    'controller': 'cartController',
                    'controllerAs': 'cartCtrl',
                })
        });

        
        menuPrepService.$inject = ['MenuResource','OfflineDataResource']
            function menuPrepService(MenuResource,OfflineDataResource) {
                // if(navigator.onLine){
                //     return MenuResource.getAllMenus().$promise;
                // }
                // else{
                //     return OfflineDataResource.getMenus();
                // }
                return MenuResource.getAllMenus().$promise;
                
            }
            
        ResturantPrepService.$inject = ['ResturantResource']
        function ResturantPrepService(ResturantResource) {
            return ResturantResource.getResturantGlobalInfo().$promise;
        }


        categoryItemsTemplatePrepService.$inject = ['ItemsResource','$stateParams','OfflineDataResource']
        function categoryItemsTemplatePrepService(ItemsResource,$stateParams,OfflineDataResource) {
        //     if(navigator.onLine){
        //     return ItemsResource.getAllItems({ CategoryId: $stateParams.categoryId }).$promise;
        // }
        // else{
        //     return OfflineDataResource.getAllItems($stateParams.categoryId);
        // }
        return ItemsResource.getAllItems({ CategoryId: $stateParams.categoryId }).$promise;
        }
    
}());
