(function () {
    'use strict';

    angular
        .module('home')
        .controller('cartController', ['$rootScope', '$translate', '$scope', 'appCONSTANTS', '$uibModal',  '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'MenuOfflineResource', 'OfflineDataResource', cartController])

    function cartController($rootScope, $translate, $scope, appCONSTANTS, $uibModal, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, MenuOfflineResource, OfflineDataResource) {
        var vm = this;
        $scope.cart = [];
        $scope.total = 0;

        var storedNames = JSON.parse(localStorage.getItem("todos"));
        $scope.cart = storedNames;
    
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            var product = $scope.cart[i];
            //total += (product.size.price * product.count);
            total += (product.size.price);
        }
        $scope.checkOut = function () {
            localStorage.removeItem('todos');
            $state.go('menu');
        };
    vm.repeatCart=$scope.cart;
        $scope.totalItem = total;
        
        
    $scope.removeItemCart = function (product) {
        
                if (product.count > 1) {
                    product.count -= 1;
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    // $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                    // $scope.cart = $cookies.getObject('cart');
                }
                else if (product.count === 1) {
                    var index = $scope.cart.indexOf(product);
                    $scope.cart.splice(index, 1);
                    expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    // $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
                    // $scope.cart = $cookies.getObject('cart');
        
                }
        
                $scope.total -= parseFloat(product.size.price);
                //  $cookies.put('total', $scope.total, { 'expires': expireDate });
        
            };

    }


}());
