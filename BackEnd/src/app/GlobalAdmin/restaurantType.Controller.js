(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('restaurantTypeController', ['$scope', '$translate' , 'appCONSTANTS','$uibModal', 'RestaurantTypeResource','restaurantTypePrepService','ToastService',  restaurantTypeController])

    function restaurantTypeController($scope, $translate, appCONSTANTS,$uibModal, RestaurantTypeResource,restaurantTypePrepService,ToastService){

        var vm = this;
		vm.restaurantTypes = restaurantTypePrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")
		
		function refreshType(){
			var k = RestaurantTypeResource.getAllRestaurantType().$promise.then(function(results) {
				vm.restaurantTypes = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openTypeDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishRestaurantType;
				var k = RestaurantTypeResource.getAllRestaurantType({lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishRestaurantType = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/GlobalAdmin/templates/editType.html',
						controller: 'editRestaurantTypeDialogController',
						controllerAs: 'editRestTypeDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishRestaurantType: function(){return englishRestaurantType;},
							type:function(){ return null},
							callBackFunction:function(){return refreshType;}
						}
						
					});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/GlobalAdmin/templates/newType.html',
					controller: 'restaurantTypeDialogController',
					controllerAs: 'restTypeDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshType;}
					}
					
				});
			}
		}
		function confirmationDelete(itemId){
			RestaurantTypeResource.deleteType({restaurantTypeId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('RestaurantTypeDeleteSuccess'),"success");
				refreshType();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteTypeDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function(){return $translate.instant('RestaurantTypeDeleteMessage')},
					callBackFunction:function() { return confirmationDelete }
				}
				
			});
		}
		
		vm.openEditTypeDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/GlobalAdmin/templates/editType.html',
				controller: 'editRestaurantTypeDialogController',
				controllerAs: 'editRestTypeDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishRestaurantType: function(){return null;},
					type:function(){ return vm.restaurantTypes[index]},
					callBackFunction:function(){return refreshType;}
				}
				
			});
			
		}
		
		
		
		
	}
	
}
    ());
