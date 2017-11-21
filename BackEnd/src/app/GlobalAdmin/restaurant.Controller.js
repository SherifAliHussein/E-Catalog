(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('restaurantController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'RestaurantResource','ActivateRestaurantResource','DeactivateRestaurantResource','RestaurantTypeResource','restaurantsPrepService','ToastService',  restaurantController])

    function restaurantController($scope,$translate, appCONSTANTS,$uibModal, RestaurantResource,ActivateRestaurantResource,DeactivateRestaurantResource,RestaurantTypeResource,restaurantsPrepService,ToastService){
		
        var vm = this;
		vm.restaurant = restaurantsPrepService;
		vm.Now = $scope.getCurrentTime();
		//vm.totalCount = restaurantsPrepService.totalCount;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")
		
		var allRestaurantType;
		RestaurantTypeResource.getAllRestaurantType().$promise.then(function(results) {
			allRestaurantType = results;	
		});
		function refreshRestaurant(){
			var k = RestaurantResource.getAllRestaurant({page:vm.currentPage}).$promise.then(function(results) {
				vm.restaurant = results//.results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshRestaurant();
		}
		
		vm.openRestaurantDialog = function(){
							
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishRestaurant;
				var k = RestaurantResource.getAllRestaurant({lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishRestaurant = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/GlobalAdmin/templates/editRestaurant.html',
						controller: 'editRestaurantDialogController',
						controllerAs: 'restDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishRestaurant: function(){return englishRestaurant;},
							type:function(){ return null},
							callBackFunction:function(){return refreshRestaurant;}
						}
						
					});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/GlobalAdmin/templates/newRestaurant.html',
					controller: 'restaurantDialogController',
					controllerAs: 'restDlCtrl',
					resolve:{
						allRestaurantType:function(){return allRestaurantType;},
						callBackFunction:function(){return refreshRestaurant;}
					}
					
				});
			}
		}
		function confirmationDelete(itemId){
			RestaurantResource.deleteRestaurant({restaurantId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('restaurantDeleteSuccess'),"success");
				refreshRestaurant();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.openDeleteRestaurantDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function(){return null},
					callBackFunction:function() { return confirmationDelete }
				}
				
			});
		}
		
		// vm.openEditRestaurantDialog = function(index){
		// 	var modalContent = $uibModal.open({
		// 		templateUrl: './app/GlobalAdmin/templates/editRestaurant.html',
		// 		controller: 'editRestaurantDialogController',
		// 		controllerAs: 'restDlCtrl',
		// 		resolve:{
		// 			mode:function(){return "edit"},
		// 			allRestaurantType:function(){return allRestaurantType;},
		// 			englishRestaurant: function(){return null;},
		// 			type:function(){ return vm.restaurant[index]},
		// 			callBackFunction:function(){return refreshRestaurant;}
		// 		}
				
		// 	});
			
		// }

		vm.Activate = function(restaurant){
			if(restaurant.isReady){
				ActivateRestaurantResource.Activate({restaurantId:restaurant.restaurantId})
				.$promise.then(function(result){
					restaurant.isActive = true;
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				})
			}
		}

		vm.Deactivate = function(restaurant){
			DeactivateRestaurantResource.DeActivate({restaurantId:restaurant.restaurantId})
			.$promise.then(function(result){
				restaurant.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}
		
		
		
	}
	
}
    ());
