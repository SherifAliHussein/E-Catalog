(function () {
    'use strict';

    angular
        .module('home')
        .controller('ItemController', ['$scope', '$translate', '$stateParams', 'appCONSTANTS', 'categoryItemsTemplatePrepService', ItemController])

    function ItemController($scope, $translate, $stateParams, appCONSTANTS, categoryItemsTemplatePrepService) {

        var vm = this;
        vm.vv = "sadasda"
        vm.catgoryTemplates = categoryItemsTemplatePrepService;
        console.log(vm.catgoryTemplates);
        // vm.itemDetails;
        // vm.viewItemDetails=function(item){
        //     console.log(item)
        // vm.itemDetails = categoryItemsTemplatePrepService.templates[0].itemModels[0];
        // }


        $scope.item = {
            itemobj: "",
            size: "",
            sides: [], 
        };
        vm.selectedSize = "";
        vm.selectedSide = "";

        $scope.cart = [];
        $scope.total = 0;
        $scope.addItemToCart = function (product) {

            if ($scope.cart.length === 0) {
                $scope.item.itemobj = product;
                product.count = 1;
              //  localStorage.setItem('todos', JSON.stringify($scope.cart));   
                $scope.cart.push($scope.item);
            } else {
                var repeat = false;
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].itemID === product.itemID) {
                        repeat = true;
                        $scope.cart[i].count += 1;
                    }
                }
                if (!repeat) {
                    $scope.item.itemobj = product; 
                    product.count = 1;
                    $scope.cart.push($scope.item);
                }
            }
            
            $scope.total += parseFloat($scope.item.size.price); 
            localStorage.setItem('todos', JSON.stringify($scope.cart));
            $scope.item = {
                itemobj: "",
                size: "",
                sides: [], 
            };
            alert($scope.total)
        };
        $scope.radioSizeClick = function (size) {
            $scope.item.size = size;
        };

        $scope.checkSideClick = function (side) {
            if ($scope.item.sides.indexOf(side) !== -1) { 
                var index = $scope.item.sides.indexOf(side);
                $scope.item.sides.splice(index, 1); 
            }
            else {
                $scope.item.sides.push(side);
            }
        };

    }

}
());
