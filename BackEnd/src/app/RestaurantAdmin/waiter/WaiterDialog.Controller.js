(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('waiterDialogController', ['$uibModalInstance','$translate' , 'WaiterResource','ToastService','callBackFunction','$rootScope',  waiterDialogController])

	function waiterDialogController($uibModalInstance, $translate , WaiterResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		// vm.menuName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.AddNewWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.userName;
            newWaiter.name = vm.name;
            newWaiter.password = vm.password;
            newWaiter.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterAddSuccess'),"success");
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
