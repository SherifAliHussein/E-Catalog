(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editWaiterDialogController', ['$uibModalInstance','$translate', 'WaiterResource','ToastService','waiter','callBackFunction',  editWaiterDialogController])

	function editWaiterDialogController($uibModalInstance, $translate, WaiterResource,ToastService,  waiter,callBackFunction){
		var vm = this;
		vm.menuName = "";
		vm.waiter = waiter;
        vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		vm.updateWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.waiter.userName;
            newWaiter.name = vm.waiter.name;
            newWaiter.password = vm.waiter.password;
            newWaiter.userId = waiter.userId;
            newWaiter.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterUpdateSuccess'),"success");
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
