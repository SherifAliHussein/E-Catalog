(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editRestaurantTypeDialogController', ['$uibModalInstance', 'RestaurantTypeResource','ToastService','mode','englishRestaurantType','type','callBackFunction',  editRestaurantTypeDialogController])

	function editRestaurantTypeDialogController($uibModalInstance, RestaurantTypeResource,ToastService, mode, englishRestaurantType, type,callBackFunction){
		var vm = this;
		vm.typeName = "";
		
		vm.mode = mode;
		vm.englishRestaurantType = englishRestaurantType;
		if(mode == "edit")
			vm.typeName = type.typeName;
		else
			vm.selectedType = englishRestaurantType[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateType = function(){
			var newType = new RestaurantTypeResource();
            newType.typeName = vm.typeName;
			if(mode == "edit")
				newType.restaurantTypeId = type.restaurantTypeId;
			else
				newType.restaurantTypeId = vm.selectedType.restaurantTypeId;
            newType.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp","restaurant type updated successfully.","success");
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
