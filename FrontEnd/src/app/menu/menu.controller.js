(function() {
    'use strict';

    angular
        .module('home')
        .controller('menuController', ['$rootScope','$translate', '$scope', 'appCONSTANTS','$uibModal','MenuResource','menuPrepService','ResturantPrepService', 'CategoriesResource', '$state',  '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', menuController])
       
    function menuController($rootScope, $translate, $scope, appCONSTANTS,$uibModal,MenuResource,menuPrepService,ResturantPrepService,CategoriesResource, $state, _,authenticationService, authorizationService,$localStorage, userRolesEnum) {
        var vm = this;
       
                vm.menus = menuPrepService; 
                vm.categories =""; // vm.globalInfo = ResturantPrepService;  
                function refreshMenu() {
                    var k = MenuResource.getAllMenus({ page: vm.currentPage }).$promise.then(function (results) {
                        vm.menus = results
                    },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
                }
                $scope.ShowId = function (_menuId) {
                    refreshCategories(_menuId);
                };
        
                function refreshCategories(mnuId) {
                    var k = CategoriesResource.getAllCategories({ MenuId: mnuId, page: vm.currentPage }).$promise.then(function (results) {
                        console.log(results);
                       vm.categories = results
                    },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                    });
                }
                vm.openShowCategoryDialog = function (mnuId) {
                    
                                var k = CategoriesResource.getAllCategories({ MenuId: mnuId, page: vm.currentPage }).$promise.then(function (results) {
                    
                                    var modalContent = $uibModal.open({
                                        templateUrl: '../a/showCategoryPopup.html',
                                        controller: 'showCategoryDialogController',
                                        controllerAs: 'showCategoryDlCtrl',
                                        resolve: {
                                            category: function () { return results }
                                        }
                                    });
                    
                                },
                                function (data, status) {
                                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                                });
                    
                            }
                    
                
		
    }

    
}());
