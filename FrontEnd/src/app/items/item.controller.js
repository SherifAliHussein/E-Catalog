(function () {
    'use strict';

    angular
        .module('home')
        .controller('ItemController', ['$scope', '$translate', '$stateParams', 'appCONSTANTS', 'categoryItemsTemplatePrepService', 'totalCartService','CartIconService', ItemController])

    function ItemController($scope, $translate, $stateParams, appCONSTANTS, categoryItemsTemplatePrepService,  totalCartService,CartIconService) {

        $scope.letterLimit = 2;
        var vm = this;
        $scope.cartIcon = true;
        $scope.$watch("cartIcon", function (newValue) {
            CartIconService.cartIcon = newValue;
          });
        vm.catgoryTemplates = categoryItemsTemplatePrepService;
        console.log(vm.catgoryTemplates);
        // vm.itemDetails;
        // vm.viewItemDetails=function(item){
        //     console.log(item)
        // vm.itemDetails = categoryItemsTemplatePrepService.templates[0].itemModels[0];
        // } 
        vm.selectedSize = 10;
        vm.selectedSide = 10;
        $scope.selectedCount = 0;   
        $scope.checkradioasd = -1;
        $scope.selectedCount=1;
        $scope.homeTotalNo = '';
        $scope.cart = [];
        $scope.total = 0;
        $scope.item = {
            itemobj: "",
            size: "",
            sides: [],
        };

        $scope.displayAdd = false;

        $scope.addItemToCart = function (product) {

            for (var i = 0; i < $scope.selectedCount; i++) {

                if ($scope.cart.length === 0) {
                    product.count = 1;
                    $scope.item.itemobj = product;
                    $scope.cart.push($scope.item);

                } else {
                    var repeat = false;
                    for (var k = 0; k < $scope.cart.length; k++) {
                        if ($scope.cart[k].itemobj.itemID === product.itemID && $scope.cart[k].size.sizeId ===   $scope.item.size.sizeId) {
                            repeat = true;
                            $scope.cart[k].itemobj.count += 1;
                        }
                    }
                    if (!repeat) {
                        product.count = 1;
                        $scope.item.itemobj = product;
                        $scope.cart.push($scope.item);
                    }
                } 

                $scope.total += parseFloat($scope.item.size.price);

            }
            var storedNames = JSON.parse(localStorage.getItem("checkOut"));
            if (storedNames != null) {
                for (var s = 0; s < storedNames.length; s++) {
                    var repeat = false;
                    for (var k = 0; k < $scope.cart.length; k++) {
                      
                        var id=$scope.cart[k].itemobj.itemID;
                        var objsize=$scope.cart[k].size.sizeId;

                        var stordId=storedNames[s].itemobj.itemID ;
                        var stordSize=storedNames[s].size.sizeId;

                          if (id === stordId && objsize ===stordSize) {
                            repeat = true;
                            $scope.cart[k].itemobj.count += 1;
                      //  $scope.cart.push(storedNames[s]); 
                        
                        }
                    }
                    if (!repeat) {
                       // product.count = 1;
                        $scope.item.itemobj = product;
                        //$scope.cart.push($scope.item);
                        $scope.cart.push(storedNames[s]); 
                    }
                    
                }
            $scope.total=0;
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = $scope.cart[i];
                $scope.total += (product.size.price * product.itemobj.count);
            }
        }

            $scope.homeTotalNo = $scope.total; 

            $scope.$watch("homeTotalNo", function (newValue) {
                totalCartService.homeTotalNo = newValue;
              });
             
            // $scope.$watch('homeTotalNo', function (newValue, oldValue) {
            //     if (newValue !== oldValue) Data.setFirstName(newValue);
            // });

            localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            $scope.item = {
                itemobj: "",
                size: "",
                sides: [],
            };
            $scope.displayAdd = false;
            $scope.checkradioasd = -1;
            $scope.selectedCount=1;
        };

        
        $scope.radioSizeClick = function (size) {
            $scope.checkradioasd = size.sizeId;
            $scope.item.size = size;
            if ($scope.item.size != "") {
                $scope.displayAdd = true;
            }

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
