(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editMenuDialogController', ['$scope','$http','appCONSTANTS','$uibModalInstance','$translate', 'MenuResource','ToastService','mode','englishMenus','menu','callBackFunction',  editMenuDialogController])

	function editMenuDialogController($scope,$http , appCONSTANTS,$uibModalInstance, $translate, MenuResource,ToastService, mode, englishMenus, menu,callBackFunction){
		var vm = this;
		vm.menuName = "";
		
		vm.mode = mode;
		vm.englishMenus = englishMenus;
		if(mode == "edit")
		{
			vm.menuName = menu.menuName;
			vm.menuImage = menu.imageURL;
		}
			
		else
			vm.selectedMenu = englishMenus[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateMenu = function(){
			var updateMenu  = new Object();
            updateMenu.menuName = vm.menuName;
			updateMenu.isImageChange = isImageChange;
		
            if(mode == "edit"){
				updateMenu.menuId = menu.menuId;
			}
			else{
				updateMenu.menuId = vm.selectedMenu.menuId;				
			}				

			var model = new FormData();
			model.append('data', JSON.stringify(updateMenu));
			model.append('file', menuImage);
			$http({
				method: 'PUT',
				url: appCONSTANTS.API_URL + 'Menus/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
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
		vm.LoadUploadImage = function() {
			$("#menuImage").click();
		}
        var menuImage; 
        var isImageChange = false;
		$scope.AddMenuImage = function(element) {
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.editMenuForm.$dirty=true;
					$scope.$apply(function() {
						
                        menuImage= imageFile;
                        isImageChange = true;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.menuImage= reader.result;
							$scope.$apply();
						};
						if (imageFile) {
							reader.readAsDataURL(imageFile);
						}
					})
				} else {
					$("#menuImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (imageFile) {
					$("#menuImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imgaeSizeError'),"error");
				}

			}


		}
	}	
}());
