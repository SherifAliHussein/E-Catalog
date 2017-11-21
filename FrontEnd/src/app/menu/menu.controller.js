(function() {
    'use strict';

    angular
        .module('home')
        .controller('menuController', ['$rootScope','$translate', '$scope', 'appCONSTANTS','MenuResource', 'CategoriesResource', '$state',  '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', menuController])
       
    function menuController($rootScope, $translate, $scope, appCONSTANTS,MenuResource,CategoriesResource, $state, _,authenticationService, authorizationService,$localStorage, userRolesEnum) {
        var vm = this;
        
                vm.categories = menuPrepService;
                vm.menus = menuPrepService; 
        
                function refreshMenu() {
                    var k = MenuResource.getAllMenus({ page: vm.currentPage }).$promise.then(function (results) {
                        vm.menus = results
                    },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
                }

                function refreshCategories(mnuId) {
                    var k = CategoriesResource.getAllCategories({ MenuId: mnuId, page: vm.currentPage }).$promise.then(function (results) {
                        console.log(results);
                       vm.categories = results
                    },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
                }

                
		
    }

    
}());
