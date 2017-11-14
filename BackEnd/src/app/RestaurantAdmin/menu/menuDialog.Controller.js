(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('menuDialogController', ['$uibModalInstance','$translate' , 'MenuResource','ToastService','callBackFunction','$rootScope',  menuDialogController])

	function menuDialogController($uibModalInstance, $translate , MenuResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.menuName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.AddNewMenu = function(){
			var newMenu = new MenuResource();
            newMenu.menuName = vm.menuName;
            newMenu.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('menuAddSuccess'),"success");
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
