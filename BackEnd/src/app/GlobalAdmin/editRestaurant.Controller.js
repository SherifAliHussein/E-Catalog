(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editRestaurantController', ['$scope','$http','$translate','appCONSTANTS', '$state', 'RestaurantResource','ToastService', 'restaurantPrepService','allRestaurantTypePrepService',  editRestaurantController])

	function editRestaurantController($scope,$http,$translate,appCONSTANTS, $state, RestaurantResource,ToastService, restaurantPrepService, allRestaurantTypePrepService){
		var vm = this;
		
		vm.RestaurantType = allRestaurantTypePrepService;
		vm.restaurant = restaurantPrepService;
		vm.confirmPassword = vm.restaurant.restaurantAdminPassword;
		vm.close = function(){
			$state.go('restaurants');
		}
		
		vm.updateRestaurant = function(){
			var updateRestaurant = new Object();
            updateRestaurant.restaurantAdminUserName = vm.restaurant.restaurantAdminUserName;
			updateRestaurant.restaurantAdminPassword = vm.restaurant.restaurantAdminPassword;
			updateRestaurant.restaurantName = vm.restaurant.restaurantName;
			updateRestaurant.restaurantDescription = vm.restaurant.restaurantDescription;
			updateRestaurant.restaurantTypeId = vm.restaurant.restaurantTypeId;
			updateRestaurant.restaurantId = vm.restaurant.restaurantId;
			updateRestaurant.isLogoChange = isLogoChange;

			var model = new FormData();
			model.append('data', JSON.stringify(updateRestaurant));
			model.append('file', restaurantLogo);
			$http({
				method: 'put',
				url: appCONSTANTS.API_URL + 'Restaurants/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('restaurantUpdateSuccess'),"success");
					$state.go('restaurants');
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
			);
            // updateRestaurant.$update().then(
            //     function(data, status) {
			// 		ToastService.show("right","bottom","fadeInUp",$translate.instant('restaurantDeleteSuccess'),"success");
			// 		$state.go('restaurants');
            //     },
            //     function(data, status) {
			// 		ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            //     }
            // );
		}
		vm.LoadUploadLogo = function() {
			$("#logoImage").click();
		}
		var restaurantLogo; 
		var isLogoChange = false;
		$scope.AddRestaurantLogo = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newRestaurantForm.$dirty=true;
					$scope.$apply(function() {
						
						restaurantLogo= logoFile;
						isLogoChange = true;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.restaurant.logoURL= reader.result;
							// $scope.Photo = reader.result;
							$scope.$apply();
						};
						if (logoFile) {
							reader.readAsDataURL(logoFile);
						}
					})
				} else {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (logoFile) {
					$("#logoImage").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imgaeSizeError'),"error");
				}

			}


		}
	}	
}());
