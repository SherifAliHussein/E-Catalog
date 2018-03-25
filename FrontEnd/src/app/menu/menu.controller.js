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
            vm.menus = menuPrepService;
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
            MenuOfflineResource.getAllMenus({lang:'en'}).$promise.then(function (results) {
                console.log(results)
                if ('serviceWorker' in navigator) {
                      navigator.serviceWorker.ready.then(function (reg) {
                          var now = new Date(Date.now()).toISOString();
                        results.forEach(function(menu) {
                           if(OfflineDataResource.getLastUpdate() == null ||  new Date (OfflineDataResource.getLastUpdate()) < new Date ( menu.modifyTime+"z")){
                               navigator.serviceWorker.controller.postMessage(menu.imageURL+"?time="+menu.modifyTime);
                            }
                            menu.categoryModels.forEach(function(category) {
                                if(OfflineDataResource.getLastUpdate() == null ||  new Date (OfflineDataResource.getLastUpdate()) <  new Date (category.modifyTime+"z") ){
                                    navigator.serviceWorker.controller.postMessage(category.imageURL+"?time="+category.modifyTime);
                                }
                                category.categoryPageTemplateModel.templates.forEach(function(template) {
                                    template.itemModels.forEach(function(item) {
                                        if(OfflineDataResource.getLastUpdate() == null ||  new Date (OfflineDataResource.getLastUpdate()) < new Date (item.modifyTime+"z")){
                                            navigator.serviceWorker.controller.postMessage(item.imageURL+"?time="+item.modifyTime);
                                            navigator.serviceWorker.controller.postMessage(item.imageURL+"?type=orignal2&time="+item.modifyTime);
                                        }
                                    }, this);
                                }, this);
                            }, this);
                          }, this);
                        
                OfflineDataResource.setLastUpdate(now);
                    
                      })
                    }
                OfflineDataResource.setAllData('en',results);
                
            },
            function (data, status) {
                //ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });
            MenuOfflineResource.getAllMenus({lang:'ar'}).$promise.then(function (results) {
              
                OfflineDataResource.setAllData('ar',results);
                
            },
            function (data, status) {
               // ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
            });

        }
        if(navigator.onLine){
            $scope.now = new Date(Date.now()).toISOString()
        }
        else{
            $scope.now = OfflineDataResource.getLastUpdate();
        }
        
    }


}());
