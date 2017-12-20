(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editCategoryDialogController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS','ToastService','mode','englishCategories','category','callBackFunction',  editCategoryDialogController])

	function editCategoryDialogController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS,ToastService, mode, englishCategories, category,callBackFunction){
		var vm = this;
		vm.categoryName = "";
		
		vm.mode = mode;
		vm.englishCategories = englishCategories;
		if(mode == "edit")
		{
            vm.categoryName = category.categoryName;
            vm.categoryImage = category.imageURL;
        }
		else
            vm.selecteCategory = englishCategories[0];
        
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateCategory = function(){
            var updateCategory = new Object();
            updateCategory.categoryName = vm.categoryName;
			updateCategory.isImageChange = isImageChange;
		
            if(mode == "edit"){
				updateCategory.categoryId = category.categoryId;
				updateCategory.menuId = category.menuId;
			}
			else{
				updateCategory.categoryId = vm.selecteCategory.categoryId;
				updateCategory.menuId = vm.selecteCategory.menuId;
				
			}
				

			var model = new FormData();
			model.append('data', JSON.stringify(updateCategory));
			model.append('file', categoryImage);
			$http({
				method: 'PUT',
				url: appCONSTANTS.API_URL + 'Categories/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('CategoryupdateSuccess'),"success");
                    $uibModalInstance.dismiss('cancel');
                    callBackFunction();
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
            );
            
        }
        vm.LoadUploadImage = function() {
			$("#categoryImage").click();
		}
        var categoryImage; 
        var isImageChange = false;
		$scope.AddCategoryImage = function(element) {
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.editCategoryForm.$dirty=true;
					$scope.$apply(function() {
						
                        categoryImage= imageFile;
                        isImageChange = true;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.categoryImage= reader.result;
							$scope.$apply();
						};
						if (imageFile) {
							reader.readAsDataURL(imageFile);
						}
					})
				} else {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (imageFile) {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imgaeSizeError'),"error");
				}

			}


		}
	}	
})();
