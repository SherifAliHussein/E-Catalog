(function () {
    'use strict';

    angular
        .module('home')
        .controller('cartController', ['$rootScope', '$translate', '$scope', 'appCONSTANTS', '$uibModal',  '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'MenuOfflineResource', 'OfflineDataResource','Data', cartController])

    function cartController($rootScope, $translate, $scope, appCONSTANTS, $uibModal, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, MenuOfflineResource, OfflineDataResource,Data) {
        var vm = this;
        $scope.cart = [];
        $scope.total = 0;
        var storedNames = JSON.parse(localStorage.getItem("checkOut"));
        $scope.cart = storedNames;
        vm.itemdetails={};
        vm.item = {
            itemobj:"",
            size: "",
            sides: [],
        };
        vm.image111="http://localhost:28867/api/Restaurants/3/Menu/5/Category/4/Item/10018";
        var total = 0;
        for (var i = 0; i < $scope.cart.length; i++) {
            var product = $scope.cart[i];
            //total += (product.size.price * product.count);
            total += (product.size.price);
        }
        $scope.checkOut = function () {
            $scope.homeTotalNo= 0;

            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });
            localStorage.removeItem('checkOut');
            $state.go('menu');
        };
      vm.repeatCart=$scope.cart;
        $scope.totalItem = total;
        
        $scope.viewItemDetail=function(item){
            vm.itemdetails = item;  
console.log(vm.itemdetails);
            
        } 
    $scope.removeItemCart = function (product) { 
                    var index = $scope.cart.indexOf(product);
                    $scope.cart.splice(index, 1);
                    localStorage.setItem('checkOut', JSON.stringify($scope.cart));
                     
        
                //}
        
                $scope.homeTotalNo -= parseFloat(product.size.price);
                $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                    if (newValue !== oldValue) Data.setFirstName(newValue);
                });
    
        $scope.totalItem =  $scope.homeTotalNo; 
            };

    }


}());
