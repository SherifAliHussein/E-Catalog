(function () {
    'use strict';

    angular
        .module('home')
        .controller('cartController', ['$rootScope', '$translate', '$scope', 'CartResource', 'appCONSTANTS', '$uibModal', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'MenuOfflineResource', 'OfflineDataResource',  'totalCartService','CartIconService', cartController])

    function cartController($rootScope, $translate, $scope, CartResource, appCONSTANTS, $uibModal, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, MenuOfflineResource, OfflineDataResource,  totalCartService,CartIconService) {
    
       
        $scope.homeTotalNo = 0;
        $scope.cartIcon = false;
        $scope.$watch("cartIcon", function (newValue) {
            CartIconService.cartIcon = newValue;
          });
        var vm = this; 
        vm.counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        vm.selectedSize = 10;
        vm.selectedSide = 10;
        vm.item = {
            itemobj: "",
            size: "",
            sides: [],
        };
        vm.index=0;
        vm.isItemLoaded = false;
        var total = 0;
        $scope.selectedCount = 0;
        $scope.cart = [];
        $scope.total = 0;
        $scope.displayEditBtn = false; 
        $scope.displayAdd = false;
        $scope.disableAdd = true;
        var init = function () {
            var storedNames = JSON.parse(localStorage.getItem("checkOut"));
            for (var h = 0; h < storedNames.length; h++) {
                vm.item.size=storedNames[h].size;
                vm.item.itemobj=storedNames[h].itemobj;

                var k = CartResource.getItemById({ itemId: vm.item.itemobj.itemID }).$promise.then(function (results) {
                    vm.itemdetails = results; 
              
                    vm.item.itemobj.itemName=vm.itemdetails.itemName; 
                    vm.item.itemobj.itemDescription=vm.itemdetails.itemDescription; 
                  },
                    function (data, status) {
                        ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                    });

                    $scope.cart.push(vm.item); 
                
            }
            $scope.cart = storedNames;
        };
        init();
     
        $scope.checkradioasd = -1;
        $scope.selectedCount=1;
        vm.repeatCart = $scope.cart;
        // vm.itemCount = $scope.cart.length;

        for (var i = 0; i < $scope.cart.length; i++) {
            var product = $scope.cart[i];
            total += (product.size.price * product.itemobj.count);
        }
        $scope.totalItem = total;


        $scope.viewItemDetail = function (item) {
            $scope.displayAdd = true;
            $scope.displayEditBtn = false;
            $scope.selectedCount = 1;
        $scope.checkradioasd = -1;
        
            refreshItems(item); 
        }

        $scope.removeItemCart = function (product) {
 
            if (product.itemobj.count > 1) {
                product.itemobj.count -= 1;


                //var index = $scope.cart.indexOf(product);
                //$scope.cart.splice(index, 1);
                localStorage.setItem('checkOut', JSON.stringify($scope.cart));


                $scope.totalItem -= parseFloat(product.size.price);
                vm.itemCount = $scope.cart.length;
                $scope.homeTotalNo = $scope.totalItem;
                
                
                            $scope.$watch("homeTotalNo", function (newValue) {
                                totalCartService.homeTotalNo = newValue;
                              });

                // $scope.cart = $cookies.getObject('cart');
            }
            else if (product.itemobj.count === 1) {

                var index = $scope.cart.indexOf(product);
                $scope.cart.splice(index, 1);
                localStorage.setItem('checkOut', JSON.stringify($scope.cart));
                $scope.totalItem -= parseFloat(product.size.price);
                $scope.homeTotalNo = $scope.totalItem;
                
                
                            $scope.$watch("homeTotalNo", function (newValue) {
                                totalCartService.homeTotalNo = newValue;
                              });

               if($scope.cart == null || $scope.cart.length == 0){
                    $state.go('menu');
                }

            }


            //$scope.$watch('homeTotalNo', function (newValue, oldValue) {
            //    if (newValue !== oldValue) Data.setFirstName(newValue);
            //});

            //$scope.totalItem = $scope.homeTotalNo;
        };

        $scope.addItemToCart = function (product) { 
            for (var i = 0; i < $scope.selectedCount; i++) {

                if ($scope.cart.length === 0) {
                    product.count = 1;
                    vm.item.itemobj = product;
                    $scope.cart.push(vm.item);
                    $scope.total += parseFloat(vm.item.size.price);

                } else {
                    var repeat = false;
                    for (var k = 0; k < $scope.cart.length; k++) {
                        var id=$scope.cart[k].itemobj.itemID;
                        var objsize=$scope.cart[k].size.sizeId;
                        if (id === product.itemID && objsize ===   vm.item.size.sizeId) {
                            repeat = true;
                            $scope.cart[k].itemobj.count += 1;
                            $scope.total += parseFloat($scope.cart[k].size.price);
                        }
                    }
                    if (!repeat) {
                        product.count = 1;
                        vm.item.itemobj = product;
                        $scope.cart.push(vm.item);
                        $scope.total += parseFloat(vm.item.size.price);
                    }
                }

                $scope.totalItem += $scope.total;

            }
            $scope.homeTotalNo += $scope.total;


            $scope.$watch("homeTotalNo", function (newValue) {
                totalCartService.homeTotalNo = newValue;
              });

            localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            vm.item = {
                itemobj: "",
                size: "",
                sides: [],
            };
            $scope.displayAdd = false;
            $scope.checkradioasd = -1;
            $scope.selectedCount=1;

            //for (var i = 0; i < $scope.selectedCount; i++) {
            //    vm.item.itemobj = product;
            //    $scope.cart.push(vm.item);
            //    $scope.total += parseFloat(vm.item.size.price);

            //}
            ////$scope.homeTotalNo = $scope.total;

            ////$scope.$watch('homeTotalNo', function (newValue, oldValue) {
            ////    if (newValue !== oldValue) Data.setFirstName(newValue);
            ////});

            //localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            //vm.item = {
            //    itemobj: "",
            //    size: "",
            //    sides: [],
            //};
            //$scope.displayAdd = false;
            //vm.itemCount = $scope.cart.length;

        };
        $scope.updateItemCart = function (product,index) {
            refreshItems(product); 
            $scope.selectedCount=vm.counts[product.itemobj.count -1];  
            $scope.checkradioasd = product.size.sizeId; 
             $scope.displayEditBtn = true; 
             $scope.displayAdd = false;
             vm.index=index;
        };
        
        $scope.editItemToCart = function (product) {
            if($scope.displayEditBtn == true){
               // var index = $scope.cart.indexOf(vm.index);
                
                vm.item.itemobj = product;  

            // for (var k = 0; k < $scope.cart.length; k++) {
               //  if ($scope.cart[k].itemobj.itemID ===vm.item.itemobj.itemID && $scope.cart[k].size.sizeId === vm.item.size.sizeId  ) { 
                     $scope.cart[vm.index].itemobj.count = $scope.selectedCount;
                  //   $scope.total = parseFloat($scope.cart[vm.index].size.price*$scope.selectedCount);
                // }
            // }
            $scope.total=0;
            for (var i = 0; i < $scope.cart.length; i++) {
                var product = $scope.cart[i];
                $scope.total += (product.size.price * product.itemobj.count);
            }
          
             $scope.homeTotalNo = $scope.total;
             $scope.totalItem = $scope.total;
             $scope.$watch("homeTotalNo", function (newValue) {
                totalCartService.homeTotalNo = newValue;
              });
             
                        //  $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                        //      if (newValue !== oldValue) Data.setFirstName(newValue);
                        //  });
             
                         localStorage.setItem('checkOut', JSON.stringify($scope.cart));
            }
            
            
             vm.item = {
                 itemobj: "",
                 size: "",
                 sides: [],
             };
             $scope.displayEditBtn = false; 
             $scope.displayAdd = false;
             $scope.checkradioasd = -1;
             $scope.selectedCount=1;
  
 
         };

        $scope.radioSizeClick = function (size) {
         
            $scope.checkradioasd = size.sizeId;
            
            vm.item.size = size;
            if (vm.item.size != "" && $scope.displayEditBtn == false) {
                $scope.displayAdd = true;
        $scope.disableAdd = false;
    }

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

        $scope.checkOut = function () {
            $scope.homeTotalNo = 0;

            $scope.$watch('homeTotalNo', function (newValue, oldValue) {
                if (newValue !== oldValue) Data.setFirstName(newValue);
            });
            localStorage.removeItem('checkOut');
            $state.go('menu');
        };
         
        function refreshItems(item) {
            vm.isItemLoaded = false;
            var k = CartResource.getItemById({ itemId: item.itemobj.itemID }).$promise.then(function (results) {
                vm.itemdetails = results; 
                vm.isItemLoaded = true;
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                });
        }
      
     
         
    }


}());
