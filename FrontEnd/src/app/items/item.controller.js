(function () {
    'use strict';

    angular
        .module('home')
        .controller('ItemController', ['$scope', '$translate', '$stateParams', 'appCONSTANTS', 'categoryItemsTemplatePrepService', 'Data', ItemController])

    function ItemController($scope, $translate, $stateParams, appCONSTANTS, categoryItemsTemplatePrepService, Data) {

        var vm = this;
        vm.catgoryTemplates = categoryItemsTemplatePrepService;
        console.log(vm.catgoryTemplates);
        // vm.itemDetails;
        // vm.viewItemDetails=function(item){
        //     console.log(item)
        // vm.itemDetails = categoryItemsTemplatePrepService.templates[0].itemModels[0];
        // }
        vm.counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.selectedSize = 10;
        vm.selectedSide = 10;
        $scope.selectedCount = 0;

        $scope.homeTotalNo = '';
        $scope.cart = [];
        $scope.total = 0;
        $scope.item = {
            itemobj: "",
            size: "",
            sides: [],
        };

        $scope.displayAdd = true;


        $scope.addItemToCart = function (product) {

            for (var i = 0; i < $scope.selectedCount; i++) {
                $scope.item.itemobj = product;
                $scope.cart.push($scope.item);
                $scope.total += parseFloat($scope.item.size.price);

            }
            $scope.homeTotalNo = $scope.total;
            // if ($scope.cart.length === 0) {
            //     $scope.item.itemobj = product;
            //     $scope.cart.push($scope.item);
            // } else {
            //     var repeat = false;
            //     for (var i = 0; i < $scope.cart.length; i++) {
            //         if ($scope.cart[i].itemID === product.itemID) {
            //             repeat = true;
            //         }
            //     }
            //     if (!repeat) {
            //         $scope.item.itemobj = product;
            //         $scope.cart.push($scope.item);
            //     }
            // }


            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });

            localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            $scope.item = {
                itemobj: "",
                size: "",
                sides: [],
            };
        };
        $scope.radioSizeClick = function (size) {
            $scope.item.size = size;

        };

        $scope.checkSideClick = function (side) {
            if ($scope.item.sides.indexOf(side) !== -1) {
                var index = $scope.item.sides.indexOf(side);
                $scope.item.sides.splice(index, 1);
                if ($scope.item.sides.length == 0) {
               //     $scope.displayAdd = false;
                }
            }
            else {
                $scope.item.sides.push(side);
                if ($scope.item.sides.length > 0 && $scope.item.size != "") {
                 //   $scope.displayAdd = true;
                }
            }
        };

    }

}
());
