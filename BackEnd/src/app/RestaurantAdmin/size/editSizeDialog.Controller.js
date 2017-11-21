(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editSizeDialogController', ['$uibModalInstance','$translate', 'SizeResource','ToastService','mode','englishSizes','size','callBackFunction',  editSizeDialogController])

	function editSizeDialogController($uibModalInstance, $translate, SizeResource,ToastService, mode, englishSizes, size,callBackFunction){
		var vm = this;
		vm.sizeName = "";
		
		vm.mode = mode;
		vm.englishSizes = englishSizes;
		if(mode == "edit")
			vm.sizeName = size.sizeName;
		else
			vm.selectedSize = englishSizes[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateSize = function(){
			var updateSize = new SizeResource();
            updateSize.sizeName = vm.sizeName;
			if(mode == "edit")
				updateSize.sizeId = size.sizeId;
			else
				updateSize.sizeId = vm.selectedSize.sizeId;
            updateSize.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('UpdateSizeSuccess'),"success");
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
