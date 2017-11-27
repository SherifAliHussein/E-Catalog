(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('ItemController', ['$scope','$translate', '$stateParams', 'appCONSTANTS','categoryItemsTemplatePrepService' ,  ItemController])

    function ItemController($scope,$translate,$stateParams, appCONSTANTS ,categoryItemsTemplatePrepService){
		
        var vm = this;
        vm.vv = "sadasda"
		vm.catgoryTemplates = categoryItemsTemplatePrepService;
        console.log(vm.catgoryTemplates);
        
 //$scope.products = productsData;
 $scope.cart = [];
 $scope.total = 0;
 /*
   if ($cookieStore.get('cart') !== null) {
           $scope.cart =  $cookieStore.get('cart');
   }
   */

 // if (!angular.isUndefined($cookies.get('total'))) {
 // $scope.total = parseFloat($cookies.get('total'));
 // }
 // //Sepetimiz daha önceden tanımlıysa onu çekelim
 // if (!angular.isUndefined($cookies.get('cart'))) {
 // $scope.cart = $cookies.getObject('cart');
 // }

 vm.addItemToCart = function (product) {

     if ($scope.cart.length === 0) {
         product.count = 1;
         localStorage.setItem('todos', JSON.stringify($scope.cart));
         $scope.cart.push(product); 
     } else {
         var repeat = false;
         for (var i = 0; i < $scope.cart.length; i++) {
             if ($scope.cart[i].id === product.id) {
                 repeat = true;
                 $scope.cart[i].count += 1;
             }
         }
         if (!repeat) {
             product.count = 1;
             $scope.cart.push(product);
         }
     }
     var expireDate = new Date();
     expireDate.setDate(expireDate.getDate() + 1);
     //  $cookies.putObject('cart', $scope.cart, { 'expires': expireDate });
     //  $scope.cart = $cookies.getObject('cart');

     $scope.total += parseFloat(product.price);
     // $cookies.put('total', $scope.total, { 'expires': expireDate });

     localStorage.setItem('todos', JSON.stringify($scope.cart));
 };

 vm.removeItemCart = function (product) {

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

     $scope.total -= parseFloat(product.price);
     //  $cookies.put('total', $scope.total, { 'expires': expireDate });

 };
     


        // vm.viewItemDetails=function(item){
        //     console.log(item)
        //     vm.itemDetails = categoryItemsTemplatePrepService.templates[0].itemModels[0];
        // }
	}
	
}
());
