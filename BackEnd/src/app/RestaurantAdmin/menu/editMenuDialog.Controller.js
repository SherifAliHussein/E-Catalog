(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editMenuDialogController', ['$uibModalInstance','$translate', 'MenuResource','ToastService','mode','englishMenus','menu','callBackFunction',  editMenuDialogController])

	function editMenuDialogController($uibModalInstance, $translate, MenuResource,ToastService, mode, englishMenus, menu,callBackFunction){
		var vm = this;
		vm.menuName = "";
		
		vm.mode = mode;
		vm.englishMenus = englishMenus;
		if(mode == "edit")
			vm.menuName = menu.menuName;
		else
			vm.selectedMenu = englishMenus[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateMenu = function(){
			var newMenu = new MenuResource();
            newMenu.menuName = vm.menuName;
			if(mode == "edit")
				newMenu.menuId = menu.menuId;
			else
				newMenu.menuId = vm.selectedMenu.menuId;
            newMenu.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('menuUpdateSucess'),"success");
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
