(function () {
    'use strict';

    angular
        .module('home')
        .controller('menuController', ['$rootScope', '$translate', '$scope', 'appCONSTANTS', '$uibModal', 'MenuResource', 'menuPrepService', 'ResturantPrepService', 'CategoriesResource', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'ResturantResource', 'MenuOfflineResource', 'OfflineDataResource', menuController])

    function menuController($rootScope, $translate, $scope, appCONSTANTS, $uibModal, MenuResource, menuPrepService, ResturantPrepService, CategoriesResource, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, ResturantResource, MenuOfflineResource, OfflineDataResource) {
        var vm = this;
        ResturantResource.getResturantGlobalInfo().$promise.then(function (results) {

            $scope.$parent.globalInfo = results

        },
          function (data, status) {
              ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
          });
        if (navigator.onLine)
            vm.menus = menuPrepService.results;
        else
            vm.menus = menuPrepService.results;
        vm.categories = ""; 
        
        function refreshMenu() {
            var k = MenuResource.getAllMenus({ page: vm.currentPage }).$promise.then(function (results) {
                vm.menus = results
            },
            function (data, status) {
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
        }
        vm.ShowId = function (_menuId) {
            refreshCategories(_menuId);
        };

        function refreshCategories(mnuId) {
            if(navigator.onLine){
                var k = CategoriesResource.getAllCategories({ MenuId: mnuId, page: vm.currentPage }).$promise.then(function (results) {
                    console.log(results);
                    vm.categories = results.results
                },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
            }
            else{
             vm.categories =  OfflineDataResource.getAllCategories(mnuId);  
            }
        }
        

        if (navigator.onLine) {
            MenuOfflineResource.getAllMenus().$promise.then(function (results) {
                console.log(results)
                OfflineDataResource.setAllData(results);
            },
            function (data, status) {
                ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });

        }
    }


}());
