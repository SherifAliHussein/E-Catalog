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
        });

        
        menuPrepService.$inject = ['MenuResource']
            function menuPrepService(MenuResource) {
                return MenuResource.getAllMenus().$promise;
            }
            
        ResturantPrepService.$inject = ['ResturantResource']
        function ResturantPrepService(ResturantResource) {
            return ResturantResource.getResturantGlobalInfo().$promise;
        }
}());
