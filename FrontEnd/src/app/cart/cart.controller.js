(function () {
    'use strict';

    angular
        .module('home')
        .controller('cartController', ['$rootScope', '$translate', '$scope', 'CartResource', 'appCONSTANTS', '$uibModal', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'MenuOfflineResource', 'OfflineDataResource', 'Data', cartController])

    function cartController($rootScope, $translate, $scope, CartResource, appCONSTANTS, $uibModal, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, MenuOfflineResource, OfflineDataResource, Data) {
        var vm = this;
      
        vm.counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.selectedSize = 10;
        vm.selectedSide = 10;
        vm.item = {
            itemobj: "",
            size: "",
            sides: [],
        };
        var total = 0;
        $scope.selectedCount = 0;
        $scope.cart = [];
        $scope.total = 0;
        var storedNames = JSON.parse(localStorage.getItem("checkOut"));
        $scope.cart = storedNames;
        
       
        for (var i = 0; i < $scope.cart.length; i++) {
            var product = $scope.cart[i];
            //total += (product.size.price * product.count);
            total += (product.size.price);
        }
        $scope.checkOut = function () {
            $scope.homeTotalNo = 0;

            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });
            localStorage.removeItem('checkOut');
            $state.go('menu');
        };
        vm.repeatCart = $scope.cart;
        $scope.totalItem = total;

        $scope.viewItemDetail = function (item) {
            refreshItems(item);

        }
        $scope.removeItemCart = function (product) {
            var index = $scope.cart.indexOf(product);
            $scope.cart.splice(index, 1);
            localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            $scope.homeTotalNo -= parseFloat(product.size.price);
            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });

            $scope.totalItem = $scope.homeTotalNo;
        };


        vm.isItemLoaded = false;

        function refreshItems(item) {
            vm.isItemLoaded = false;
            var k = CartResource.getItemById({ itemId: item.itemobj.itemID }).$promise.then(function (results) {
                vm.itemdetails = results;
                console.log(vm.itemdetails);
                vm.isItemLoaded = true;
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                });
        }
        $scope.addItemToCart = function (product) {

            for (var i = 0; i < $scope.selectedCount; i++) {
                vm.item.itemobj = product;
                $scope.cart.push(vm.item);
                $scope.total += parseFloat(vm.item.size.price);

            }
            $scope.homeTotalNo = $scope.total;

            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });

            localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            vm.item = {
                itemobj: "",
                size: "",
                sides: [],
            };
        };
        $scope.radioSizeClick = function (size) {
            vm.item.size = size;
        };

        $scope.checkSideClick = function (side) {
           // vm.item.sides = [];
            if (vm.item.sides.indexOf(side) !== -1) {
                var index = vm.item.sides.indexOf(side);
                vm.item.sides.splice(index, 1);
                if (vm.item.sides.length == 0) {
                    //     $scope.displayAdd = false;
                }
            }
            else {
                vm.item.sides.push(side);
                if (vm.item.sides.length > 0 && vm.item.size != "") {
                    //   $scope.displayAdd = true;
                }
            }
        };

    }


}());
