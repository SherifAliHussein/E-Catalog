(function () {
    'use strict';

    angular
        .module('home')
        .controller('cartController', ['$rootScope', '$translate', '$scope', 'CartResource', 'appCONSTANTS', '$uibModal', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'MenuOfflineResource', 'OfflineDataResource', 'totalCartService', 'CartIconService', cartController])

    function cartController($rootScope, $translate, $scope, CartResource, appCONSTANTS, $uibModal, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService, MenuOfflineResource, OfflineDataResource, totalCartService, CartIconService) {


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
        vm.currentItem=0; 
        vm.index = 0;
        vm.isItemLoaded = false;
        var total = 0;
        $scope.selectedCount = 0;
        $scope.cart = [];
        $scope.total = 0;
        $scope.displayEditBtn = false;
        $scope.displayAdd = false;
        $scope.disableAdd = true; 
        $scope.checkradioasd = -1;
        $scope.selectedCount = 1;

        vm.repeatCart = [];

        var CheckOutLocalstorage = JSON.parse(localStorage.getItem("checkOut"));
        for (var h = 0; h < CheckOutLocalstorage.length; h++) {
            vm.item.size = CheckOutLocalstorage[h].size;
            vm.item.itemobj = CheckOutLocalstorage[h].itemobj;

            var k = CartResource.getItemById({ itemId: vm.item.itemobj.itemID }).$promise.then(function (results) {
                vm.itemdetails = results;

                vm.item.itemobj.itemName = vm.itemdetails.itemName;
                vm.item.itemobj.itemDescription = vm.itemdetails.itemDescription;
                var temp;
                JSON.parse(localStorage.getItem("checkOut")).forEach(function(element) {
                    if(element.itemobj.itemID == results.itemID){
                        temp = element;
                    }
                }, this);
                temp.itemobj.itemName = results.itemName;
                temp.itemobj.itemDescription = results.itemDescription;
                vm.repeatCart.push(temp)
            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
                });

            $scope.cart.push(vm.item);

        }
        $scope.cart = CheckOutLocalstorage;
        // vm.repeatCart = $scope.cart;
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
                for (var r = 0; r < $scope.cart.length; r++) { 
                    var cartId=$scope.cart[r].itemobj.itemID;
                    var objId=product.itemobj.itemID;
                    var cartSize=$scope.cart[r].size.sizeId;
                    var objSize=product.size.sizeId;

                    if (cartId === objId && cartSize ===objSize) { 
                             $scope.cart.splice(r, 1);
                              vm.repeatCart.splice(r, 1);
             
                             localStorage.setItem('checkOut', JSON.stringify($scope.cart));
                             $scope.totalItem -= parseFloat(product.size.price);
                             $scope.homeTotalNo = $scope.totalItem;
             
             
                             $scope.$watch("homeTotalNo", function (newValue) {
                                 totalCartService.homeTotalNo = newValue;
                             });
             
                             if ($scope.cart == null || $scope.cart.length == 0) {
                                 $state.go('menu');
                             }


                    }
                }


                // var index = $scope.cart.indexOf(product);
           
                // $scope.cart.splice(index, 1);
                // vm.repeatCart.splice(index, 1);

                // localStorage.setItem('checkOut', JSON.stringify($scope.cart));
                // $scope.totalItem -= parseFloat(product.size.price);
                // $scope.homeTotalNo = $scope.totalItem;


                // $scope.$watch("homeTotalNo", function (newValue) {
                //     totalCartService.homeTotalNo = newValue;
                // });

                // if ($scope.cart == null || $scope.cart.length == 0) {
                //     $state.go('menu');
                // }

            }


            //$scope.$watch('homeTotalNo', function (newValue, oldValue) {
            //    if (newValue !== oldValue) Data.setFirstName(newValue);
            //});

            //$scope.totalItem = $scope.homeTotalNo;
        };

        $scope.addItemToCart = function (product) {
         
         
            if($scope.selectedCount < 1)
            {
             alert("Must postive number"); 
             return;
            }     
    //  if(vm.currentItem != product.itemID){
    //      $scope.item = {
    //          itemobj: "",
    //          size: "",
    //          sides: [],
    //      }; 
    //       alert("Please Choose the correct item"); 
    //      return;
    //  }
        for (var i = 0; i < $scope.selectedCount; i++) {

                if ($scope.cart.length === 0) {
                    product.count = 1;
                    vm.item.itemobj = product;
                    $scope.cart.push(vm.item);
                    $scope.total += parseFloat(vm.item.size.price);

                } else {
                    var repeat = false;
                    for (var k = 0; k < $scope.cart.length; k++) {
                        var id = $scope.cart[k].itemobj.itemID;
                        var objsize = $scope.cart[k].size.sizeId;
                        if (id === product.itemID && objsize === vm.item.size.sizeId) {
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
            $scope.selectedCount = 1;

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

        
        $scope.addCounter = function (product, index) {
            product.itemobj.count++;
            refreshItems(product);
            $scope.selectedCount = product.itemobj.count; 
            $scope.checkradioasd = product.size;
            $scope.displayEditBtn = true;
            $scope.displayAdd = false;
            vm.index = index;
          $scope.editItemToCart(product);
        };
        
        $scope.removeCounter = function (product, index) {
            product.itemobj.count--;
            refreshItems(product);
            $scope.selectedCount = product.itemobj.count; 
            $scope.checkradioasd = product.size;
            $scope.displayEditBtn = true;
            $scope.displayAdd = false;
            vm.index = index;
            if(product.itemobj.count <1){
                for (var r = 0; r < vm.repeatCart.length; r++) { 
                    var cartId=vm.repeatCart[r].itemobj.itemID;
                    var objId=product.itemobj.itemID;
                    var cartSize=vm.repeatCart[r].size.sizeId;
                    var objSize=product.size.sizeId;

                    if (cartId === objId && cartSize ===objSize) { 
                           //  $scope.cart.splice(r, 1);
                              vm.repeatCart.splice(r, 1);
             
                             localStorage.setItem('checkOut', JSON.stringify(vm.repeatCart));
                             $scope.totalItem -= parseFloat(product.size.price);
                             $scope.homeTotalNo = $scope.totalItem;
             
             
                             $scope.$watch("homeTotalNo", function (newValue) {
                                 totalCartService.homeTotalNo = newValue;
                             });
             
                             if (vm.repeatCart == null || vm.repeatCart.length == 0) {
                                 $state.go('menu');
                             }


                    }
                }
                
                     
                // $scope.removeItemCart(product)
            }else{
            $scope.editItemToCart(product);}
        };

        $scope.updateItemCart = function (product, index) {
            refreshItems(product);
            $scope.selectedCount = product.itemobj.count;
         //   $scope.selectedCount = vm.counts[product.itemobj.count - 1];
            $scope.checkradioasd = product.size;
            $scope.displayEditBtn = true;
            $scope.displayAdd = false;
            vm.index = index;
          //  $scope.editItemToCart(product);
        };

        $scope.editItemToCart = function (product) {
            if ($scope.displayEditBtn == true) {
                // var index = $scope.cart.indexOf(vm.index);

                vm.item.itemobj = product;

                // for (var k = 0; k < $scope.cart.length; k++) {
                //  if ($scope.cart[k].itemobj.itemID ===vm.item.itemobj.itemID && $scope.cart[k].size.sizeId === vm.item.size.sizeId  ) { 
                $scope.cart[vm.index].itemobj.count = $scope.selectedCount;
                $scope.cart[vm.index].size = $scope.checkradioasd ;
                $scope.cart[vm.index].size = $scope.checkradioasd;
                //   $scope.total = parseFloat($scope.cart[vm.index].size.price*$scope.selectedCount);
                // }
                // }
                $scope.total = 0;
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
            $scope.selectedCount = 1;


        };

        $scope.radioSizeClick = function (size,item) {
            vm.currentItem=item;
            
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



            $scope.$watch("homeTotalNo", function (newValue) {
                totalCartService.homeTotalNo = newValue;
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
