(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('sizeDialogController', ['$uibModalInstance','$translate' , 'SizeResource','ToastService','callBackFunction','$rootScope',  sizeDialogController])

	function sizeDialogController($uibModalInstance, $translate , SizeResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.sizeName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.AddNewSize = function(){
			var newSize = new SizeResource();
            newSize.sizeName = vm.sizeName;
            newSize.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('sizeAddSuccess'),"success");
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
