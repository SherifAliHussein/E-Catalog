(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('WaiterController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'WaiterResource','waitersPrepService','ToastService',  WaiterController])

    function WaiterController($scope ,$translate , appCONSTANTS,$uibModal, WaiterResource,waitersPrepService,ToastService){

        var vm = this;
		vm.waiters = waitersPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")
		
		function refreshWaiter(){
			var k = WaiterResource.getAllWaiters({page:vm.currentPage}).$promise.then(function(results) {
				vm.waiters = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshWaiter();
		}
		vm.openWaiterDialog = function(){		
            var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/newWaiter.html',
				controller: 'waiterDialogController',
				controllerAs: 'waiterDlCtrl',
				resolve:{
					callBackFunction:function(){return refreshWaiter;}
				}
					
			});
        }
		function confirmationDelete(itemId){
			WaiterResource.deleteWaiter({waiterId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterDeleteSuccess'),"success");
				refreshWaiter();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteWaiterDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}
				
			});
		}
		
		vm.openEditWaiterDialog = function(index){
            var waiter;
            waiter=angular.copy(vm.waiters.results[index]);
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editWaiter.html',
				controller: 'editWaiterDialogController',
				controllerAs: 'editWaiterDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					waiter:function(){ return waiter},
					callBackFunction:function(){return refreshWaiter;}
				}
				
			});
			
		}
				
		
	}
	
}
());
