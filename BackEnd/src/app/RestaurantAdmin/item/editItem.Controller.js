(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editItemController', ['$scope','$http','$translate' ,'$stateParams' ,'appCONSTANTS', '$state', 'ItemResource','ToastService', 'itemPrepService','ItemSizePrepService',  'ItemSideItemPrepService', editItemController])

	function editItemController($scope,$http,$translate ,$stateParams ,appCONSTANTS, $state, ItemResource,ToastService, itemPrepService, ItemSizePrepService, ItemSideItemPrepService){
		var vm = this;
		
		vm.item = itemPrepService;
		vm.item.imageURL = vm.item.imageURL +"?date="+ $scope.getCurrentTime();
		vm.Sizes = ItemSizePrepService.results;
        vm.SideItems = ItemSideItemPrepService.results;
		vm.SelectedSizeId=[];
		vm.SelectedSize = [];
        vm.SelectedSideItems=[];
        vm.hasSize = itemPrepService.sizes.length>0;
		vm.hasSideItem = itemPrepService.sideItems.length>0;
		vm.maxSideItemValueError = false;
        itemPrepService.sizes.forEach(function(element) {
			var kk = vm.Sizes.filter(function(item){
				return (item.sizeId ===  element.sizeId);
			  })[0];
			  if(kk != null)
				kk.price = element.price;
			//   else
			// 	kk.selected = false
			// element.price=0;
			vm.SelectedSizeId.push(element.sizeId)
			vm.SelectedSize.push(element)
        }, this);
        itemPrepService.sideItems.forEach(function(element) {
            vm.SelectedSideItems.push(element.sideItemId.toString())
        }, this);
		vm.close = function(){
			$state.go('Items', {categoryId: $stateParams.categoryId});
		}
		vm.sizeChange = function(){
			vm.SelectedSize = []
			for(var i=0;i<vm.SelectedSizeId.length;i++){
				var size = vm.Sizes.filter(function(item){
					return (item.sizeId ===  vm.SelectedSizeId[i]);
				})[0]
				if(size.price == undefined)
					size.price = 0;
				vm.SelectedSize.push(size)  
			}
		}
		vm.updateItem = function(){
			var updatedItem = new Object();
            updatedItem.itemName = vm.item.itemName;
			updatedItem.itemDescription = vm.item.itemDescription;
			updatedItem.categoryId = $stateParams.categoryId;
			// updatedItem.price = vm.item.price;
			updatedItem.sizes = [];
			// if(vm.hasSize){
         	   vm.SelectedSize.forEach(function(element) {
                updatedItem.sizes.push(element);
				}, this);
			// }
			updatedItem.sideItems = [];
			if(vm.hasSideItem){
         	   vm.SelectedSideItems.forEach(function(element) {
                updatedItem.sideItems.push({sideItemId:element});
				}, this);
				updatedItem.maxSideItemValue = vm.item.maxSideItemValue;
			}
			updatedItem.itemID = vm.item.itemID;
			updatedItem.isImageChange = isItemImageChange;

			var model = new FormData();
			model.append('data', JSON.stringify(updatedItem));
			model.append('file', itemImage);
			$http({
				method: 'put',
				url: appCONSTANTS.API_URL + 'Items/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
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
		var isItemImageChange = false;
		$scope.AddItemImage = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newItemForm.$dirty=true;
					$scope.$apply(function() {
						
						itemImage = logoFile;
						isItemImageChange = true;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.item.imageURL= reader.result;
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
				if(vm.item.maxSideItemValue>totalValues || vm.item.maxSideItemValue<minValues){
					vm.maxSideItemValueError = true;
				}
				else
					vm.maxSideItemValueError = false;
			}
		}
		vm.CheckMaxSideItemValue();


	}	
}());
