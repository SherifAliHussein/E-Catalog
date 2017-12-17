(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('newRestaurantController', ['$scope','$translate','$http', 'appCONSTANTS' ,'$state', 'RestaurantResource','ToastService', 'englishRestaurantPrepService' ,'allRestaurantTypePrepService', 'waitersLimitPrepService',  newRestaurantController])

	function newRestaurantController($scope,$translate,$http, appCONSTANTS, $state, RestaurantResource,ToastService, englishRestaurantPrepService,allRestaurantTypePrepService, waitersLimitPrepService){
		var vm = this;
		vm.waitersLimit = waitersLimitPrepService;
		vm.waitersLimit.maxNumUsers = vm.waitersLimit.maxNumUsers - vm.waitersLimit.consumedUsers;
		vm.mode = $scope.selectedLanguage != appCONSTANTS.defaultLanguage?"map":"new";
		vm.close = function(){
			$state.go('restaurants');
		}
		if(vm.mode== "map"){
			vm.defaultRestaurant =englishRestaurantPrepService.results;
			vm.save = updateRestaurant;
			vm.selectedRestaurant = englishRestaurantPrepService.results[0];
		}
		else{
			vm.save = addNewRestaurant;
		}
		
		vm.RestaurantType = allRestaurantTypePrepService;
		vm.selectedType = allRestaurantTypePrepService[0];
		function addNewRestaurant(){
			var newRestaurant = new Object();
            newRestaurant.restaurantAdminUserName = vm.restaurantAdmin;
			newRestaurant.restaurantAdminPassword = vm.restaurantAdminPassword;
			newRestaurant.restaurantName = vm.restaurantName;
			newRestaurant.restaurantDescription = vm.restaurantDescription;
			newRestaurant.restaurantTypeId = vm.selectedType.restaurantTypeId;
			newRestaurant.waitersLimit = vm.restaurantNumOfUsers;
			var model = new FormData();
			model.append('data', JSON.stringify(newRestaurant));
			model.append('file', restaurantLogo);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Restaurants/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('restaurantAddSuccess'),"success");
					$state.go('restaurants');
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
			);

			// var newRestaurant = new RestaurantResource();
            // newRestaurant.restaurantAdminUserName = vm.restaurantAdmin;
			// newRestaurant.restaurantAdminPassword = vm.restaurantAdminPassword;
			// newRestaurant.restaurantName = vm.restaurantName;
			// newRestaurant.restaurantDescription = vm.restaurantDescription;
			// newRestaurant.restaurantTypeId = vm.selectedType.restaurantTypeId;
			// newRestaurant.Image = restaurantLogo;
            // newRestaurant.$create().then(
            //     function(data, status) {
			// 		ToastService.show("right","bottom","fadeInUp","restaurant added successfully.","success");
			// 		$state.go('restaurants');
            //     },
            //     function(data, status) {
			// 		ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            //     }
            // );
		}
		function updateRestaurant(){
			var updateRestaurant = new Object();
            updateRestaurant.restaurantAdminUserName = vm.selectedRestaurant.restaurantAdminUserName;
			updateRestaurant.restaurantAdminPassword = vm.selectedRestaurant.restaurantAdminPassword;
			updateRestaurant.restaurantName = vm.restaurantName;
			updateRestaurant.restaurantDescription = vm.restaurantDescription;
			updateRestaurant.restaurantTypeId = vm.selectedRestaurant.restaurantTypeId;
			updateRestaurant.restaurantId = vm.selectedRestaurant.restaurantId;
			updateRestaurant.isLogoChange = false;

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
			// 		ToastService.show("right","bottom","fadeInUp","restaurant updated successfully.","success");
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
		$scope.AddRestaurantLogo = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newRestaurantForm.$dirty=true;
					$scope.$apply(function() {
						
						restaurantLogo= logoFile;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.restaurantLogo= reader.result;
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
