(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('itemOrderController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal' ,'allMenuPrepService','GetCategoriesNameResource','GetItemsResource','ToastService',  itemOrderController])

    function itemOrderController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal ,allMenuPrepService,GetCategoriesNameResource,GetItemsResource,ToastService){
		var vm = this;
		
        vm.menus = allMenuPrepService;
		vm.selectedMenu = vm.menus[0];
		$scope.categoryItems = [];
		$scope.categoryItems = makeList('b');
		$scope.sortingLog = [];
		$scope.sortingLogId = [];
		$('.pmd-sidebar-nav>li>a').removeClass("active")	
		$($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")
        function loadCategory(){
            if(vm.selectedMenu != null){
                
            GetCategoriesNameResource.getAllCategoriesName({ MenuId: vm.selectedMenu.menuId })
            .$promise.then(function(results) {
                vm.categories = results;                
                vm.selectedTemplates = [];
                vm.page=1; 
                vm.selectedCategory = vm.categories[1];
                vm.selectedTemplateId= 0;
              
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
            }
        }
        loadCategory();
        vm.changeMenu = function(){
            loadCategory();
        }

        vm.changeCategory = function(){ 
            vm.page=1;          
			GetItemsResource.getAllItems({ CategoryId: vm.selectedCategory.categoryId, page:0})
            .$promise.then(function(results) {
				vm.categoryItems = results; 
				console.log(vm.categoryItems);               
                vm.selectedTemplates = [];
                vm.page=1; 
                vm.selectedCategory = vm.categories[0];
                vm.selectedTemplateId= 0;
              
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
            
        }		
		
		$scope.saveSelectedFeatures = [];
		$scope.clickCheckedFeatures = function (obj) {
			if ($scope.selectedFeatures.features.indexOf(obj) !== -1) {
				debugger;
				var index = $scope.selectedFeatures.features.indexOf(obj);
				$scope.selectedFeatures.features[index].Selected = false;
	
				$scope.selectedFeatures.features.splice(index, 1);
	
			} else {
				$scope.selectedFeatures.features.push(obj);
	
			}
		};
		$scope.saveFeatures = function () {
			$rootScope.ViewLoading = true;
			debugger;
			$scope.logModels();
			$scope.saveSelectedFeatures = []; // $scope.selectedFeatures.features.HotelId = $scope.Hotel.Id;
			for (var i = 0; i < $scope.sortingLogId.length; i++) {
				$scope.saveSelectedFeatures.push({
					Hotel_Id: $scope.Hotel.Id,
					Feature_Id: $scope.sortingLogId[i],
					langId: currentLanguage
				});
			}
			HotelsApi.SaveFeature($scope.saveSelectedFeatures).then(function (response) {
	
				switch (response.data[0].OperationStatus) {
	
					case "Succeded":
						debugger;
						$scope.back();
						break;
					case "NameEnMustBeUnique":
						toastr.error($('#HEnglishNameUnique').val(), 'Error');
						break;
					case "NameArMustBeUnique":
						toastr.error($('#HArabicNameUnique').val(), 'Error');
						break;
					case "HasRelationship":
						HotelsApi.GetAll().then(function (response) {
							$scope.Hotels = response.data;
						});
						toastr.error($('#HCannotDeleted').val(), 'Error');
	
						break;
					default:
	
				}
	
				//  $scope.HotelDetails = response.data;
				//$scope.basicInfo = true;
				//$scope.imagesListDiv = false;
				//$scope.featuresList = false;
				//$rootScope.ViewLoading = false;
				//$scope.backImage();
			},
				function (response) {
					debugger;
					ss = response;
				});
		}
	
		function makeList(letter) {
			var tmpList = [];
	
			for (var i = 1; i <= letter.lenght; i++) {
				tmpList.push({
					DisplayValue: 'Item ' + i + letter,
					value: i
				});
			}
			return tmpList;
		}
		$scope.logModels = function () {
			$scope.showSaveFeatureBtn = true;
			$scope.sortingLogId = [];
			$scope.sortingLog = [];
			for (var i = 0; i < $scope.hotelFeatures.length; i++) {
				var logEntry = "";
				var logEntryId = "";
				if ($scope.hotelFeatures[i].Id != null) {
					logEntryId = $scope.hotelFeatures[i].Id;
				} else {
					logEntryId = $scope.hotelFeatures[i].Id;
				}
				$scope.sortingLogId.push(logEntryId);
	
	
				logEntry = $scope.hotelFeatures[i].DisplayValue;
				logEntry = (i + 1) + ': ' + logEntry;
				$scope.sortingLog.push(logEntry);
			}
			//$scope.saveStaticTopTen();
		};
		$scope.sortableOptions = {
			placeholder: "app",
			connectWith: ".apps-container",
			update: function (event, ui) {
				debugger;
				// on cross list sortings recieved is not true
				// during the first update
				// which is fired on the source sortable
				if (!ui.item.sortable.received) {
					var originNgModel = ui.item.sortable.sourceModel;
					var itemModel = originNgModel[ui.item.sortable.index];
	
					// check that its an actual moving
					// between the two lists
					if (originNgModel == $scope.features && ui.item.sortable.droptargetModel == $scope.hotelFeatures) {
						var exists = !!$scope.hotelFeatures.filter(function (x) { return x.DisplayValue === itemModel.DisplayValue }).length;
						if (exists) {
							ui.item.sortable.cancel();
						}
	
					}
					if (ui.item.sortable.droptargetModel == $scope.features) {
						var index;
						var exists2 = !!$scope.features.filter(function (x) { return x.DisplayValue === itemModel.DisplayValue }).length;
						if (exists2) {
							if ($scope.hotelFeatures.length === 1) {
								index = $scope.hotelFeatures.indexOf($filter('filter')($scope.hotelFeatures, { 'Id': itemModel.Id }, true)[0]);
								//  $scope.hotelFeatures.splice(index, 1);
								alert("hotel must have one feature at least");
							} else {
								index = $scope.hotelFeatures.indexOf($filter('filter')($scope.hotelFeatures, { 'Id': itemModel.Id }, true)[0]);
								// $scope.hotelFeatures[index] = angular.copy(response.data);
								$scope.hotelFeatures.splice(index, 1);
							}
							ui.item.sortable.cancel();
						}
					}
				}
			}
		};
	
	}
	
}
    ());
