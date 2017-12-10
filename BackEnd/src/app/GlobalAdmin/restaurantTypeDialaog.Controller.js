(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('restaurantTypeDialogController', ['$uibModalInstance', 'RestaurantTypeResource','ToastService','callBackFunction','$rootScope','$translate',  restaurantTypeDialogController])

	function restaurantTypeDialogController($uibModalInstance, RestaurantTypeResource,ToastService,callBackFunction,$rootScope,$translate){
		var vm = this;
		vm.typeName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.AddNewType = function(){
			var newType = new RestaurantTypeResource();
            newType.typeName = vm.typeName;
            newType.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('RestaurantTypeAddSuccess'),"success");
					$uibModalInstance.dismiss('cancel');
					callBackFunction();
                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
}());
