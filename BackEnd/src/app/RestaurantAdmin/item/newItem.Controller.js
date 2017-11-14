(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('newItemController', ['$scope','$translate','$http','$stateParams', 'appCONSTANTS' ,'$state','ToastService' ,'TranslateItemResource' , 'ItemSizePrepService' ,'ItemSideItemPrepService', 'defaultItemsPrepService',  newItemController])

	function newItemController($scope,$translate,$http ,$stateParams, appCONSTANTS, $state,ToastService, TranslateItemResource, ItemSizePrepService,ItemSideItemPrepService ,defaultItemsPrepService){
		var vm = this;
        vm.mode = $scope.selectedLanguage != appCONSTANTS.defaultLanguage?"map":"new";
        vm.Sizes = ItemSizePrepService.results;
        vm.SideItems = ItemSideItemPrepService.results;
        vm.SelectedSize = [];
		vm.SelectedSideItems = [];		
		vm.hasSize = false;
		vm.hasSideItem = false;
		vm.maxSideItemValueError = false;
		vm.close = function(){
			$state.go('Items', {categoryId: $stateParams.categoryId});
		}
		if(vm.mode== "map"){
			vm.defaultItems =defaultItemsPrepService;
			vm.save = updateItem;
			vm.selectedItem = defaultItemsPrepService[0];
		}
		else{
			vm.save = addNewItem;
		}
		
		// vm.RestaurantType = allRestaurantTypePrepService;
		// vm.selectedType = allRestaurantTypePrepService[0];
		function addNewItem(){
			var newItem = new Object();
            newItem.itemName = vm.itemName;
			newItem.itemDescription = vm.itemDescription;
			newItem.categoryId = $stateParams.categoryId;
			// newItem.price = vm.price;
			newItem.sizes = [];
			// if(vm.hasSize){
         	   vm.SelectedSize.forEach(function(element) {
            	    newItem.sizes.push(element);
				}, this);
			// }
			newItem.sideItems = [];
			if(vm.hasSideItem){
         	   vm.SelectedSideItems.forEach(function(element) {
         	       newItem.sideItems.push({sideItemId:element});
				}, this);
			newItem.maxSideItemValue = vm.maxSideItemValue;			
			}
			// newItem.sizes = vm.SelectedSize;
			// newItem.sideItems = vm.SelectedSideItems;

			var model = new FormData();
			model.append('data', JSON.stringify(newItem));
			model.append('file', itemImage);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Items/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('itemAddSuccess'),"success");
					$state.go('Items', {categoryId: $stateParams.categoryId});
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
			);

		}
		function updateItem(){
			var updatedItem = new TranslateItemResource();
            updatedItem.itemName = vm.itemName;
			updatedItem.itemDescription = vm.itemDescription;
			updatedItem.categoryId = $stateParams.categoryId;
			updatedItem.itemID = vm.selectedItem.itemId;
            updatedItem.$translateItem().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('ItemUpdateSuccess'),"success");
					$state.go('Items', {categoryId: $stateParams.categoryId});
                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}

		vm.LoadUploadLogo = function() {
			$("#itemImage").click();
		}
		var itemImage; 
		$scope.AddItemImage = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newItemForm.$dirty=true;
					$scope.$apply(function() {
						
						itemImage= logoFile;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.itemImage= reader.result;
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

		vm.CheckMaxSideItemValue = function(){
			if(vm.hasSideItem){
				var totalValues = 0;
				// $scope.min = Math.min.apply(Math, vm.SelectedSideItems.map(function(item){return item.value;}));				
				var minValues =99999;
         	   vm.SelectedSideItems.forEach(function(element) {
				var side ;	
				vm.SideItems.forEach(function(item) {
						if(item.sideItemId == element){
							side = item;
							// break;
						}							
					},this);
					
					if(side.value < minValues)
						minValues = side.value;
					totalValues += side.value;
				}, this);		
				if(vm.maxSideItemValue>totalValues || vm.maxSideItemValue<minValues){
					vm.maxSideItemValueError = true;
				}
				else
					vm.maxSideItemValueError = false;
			}
		}
	}	
}());
