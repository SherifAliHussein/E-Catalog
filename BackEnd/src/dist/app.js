(function() {
    'use strict';

    angular
        .module('home')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
              .state('restaurantType', {
					url: '/restaurantType',
                    templateUrl: './app/GlobalAdmin/templates/restaurantType.html',
                    controller: 'restaurantTypeController',
                    'controllerAs': 'restaurantTypeCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurantType'
                    },
                    resolve: {
                        restaurantTypePrepService: restaurantTypePrepService
                    }

                                 })
				.state('restaurants', {
					url: '/restaurants',
                    templateUrl: './app/GlobalAdmin/templates/restaurant.html',
                    controller: 'restaurantController',
                    'controllerAs': 'restaurantCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
                        restaurantsPrepService: restaurantsPrepService
                    }

                                 })
				.state('newRestaurant', {
					url: '/newRestaurant',
                    templateUrl: './app/GlobalAdmin/templates/newRestaurant.html',
                    controller: 'newRestaurantController',
                    'controllerAs': 'rewRestCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
						englishRestaurantPrepService: englishRestaurantPrepService,
                        allRestaurantTypePrepService: allRestaurantTypePrepService
                    }                 
                })
				.state('editRestaurant', {
					url: '/Restaurant/:restaurantId',
                    templateUrl: './app/GlobalAdmin/templates/editRestaurant.html',
                    controller: 'editRestaurantController',
                    'controllerAs': 'editRestCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurants'
                    },
                    resolve: {
						restaurantPrepService:restaurantPrepService,
                        allRestaurantTypePrepService: allRestaurantTypePrepService
                    }                 
                })
        });

	restaurantTypePrepService.$inject = ['RestaurantTypeResource']
    function restaurantTypePrepService(RestaurantTypeResource) {
        return RestaurantTypeResource.getAllRestaurantType().$promise;
    }

	restaurantsPrepService.$inject = ['RestaurantResource']
    function restaurantsPrepService(RestaurantResource) {
        return RestaurantResource.getAllRestaurant().$promise;
    }

		allRestaurantTypePrepService.$inject = ['RestaurantTypeResource']
    function allRestaurantTypePrepService(RestaurantTypeResource) {
        return RestaurantTypeResource.getAllRestaurantType().$promise;
    }

		restaurantPrepService.$inject = ['RestaurantResource','$stateParams']
    function restaurantPrepService(RestaurantResource,$stateParams) {
        return RestaurantResource.getRestaurant({ restaurantId: $stateParams.restaurantId }).$promise;
    }

		englishRestaurantPrepService.$inject = ['RestaurantResource','$localStorage','appCONSTANTS']
    function englishRestaurantPrepService(RestaurantResource,$localStorage,appCONSTANTS) {
		if($localStorage.language != appCONSTANTS.defaultLanguage){
			return RestaurantResource.getAllRestaurant({pagesize:0, lang:'en'}).$promise;
		}
		else
			return null;

            }
}());
;(function() {
  angular
    .module('home')
    .factory('RestaurantTypeResource', ['$resource', 'appCONSTANTS', RestaurantTypeResource]);

  function RestaurantTypeResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/Type/:restaurantTypeId', {}, {
      getAllRestaurantType: { method: 'GET', useToken: true,isArray: true, params:{lang:'@lang'} },
	  create: { method: 'POST', useToken: true },
	  deleteType: { method: 'DELETE', useToken: true },
	  update: { method: 'PUT', useToken: true }
    })
  }

  }());
;(function () {
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editRestaurantTypeDialogController', ['$uibModalInstance', 'RestaurantTypeResource','ToastService','mode','englishRestaurantType','type','callBackFunction',  editRestaurantTypeDialogController])

	function editRestaurantTypeDialogController($uibModalInstance, RestaurantTypeResource,ToastService, mode, englishRestaurantType, type,callBackFunction){
		var vm = this;
		vm.typeName = "";

				vm.mode = mode;
		vm.englishRestaurantType = englishRestaurantType;
		if(mode == "edit")
			vm.typeName = type.typeName;
		else
			vm.selectedType = englishRestaurantType[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.updateType = function(){
			var newType = new RestaurantTypeResource();
            newType.typeName = vm.typeName;
			if(mode == "edit")
				newType.restaurantTypeId = type.restaurantTypeId;
			else
				newType.restaurantTypeId = vm.selectedType.restaurantTypeId;
            newType.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp","restaurant type updated successfully.","success");
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('newRestaurantController', ['$scope','$translate','$http', 'appCONSTANTS' ,'$state', 'RestaurantResource','ToastService', 'englishRestaurantPrepService' ,'allRestaurantTypePrepService',  newRestaurantController])

	function newRestaurantController($scope,$translate,$http, appCONSTANTS, $state, RestaurantResource,ToastService, englishRestaurantPrepService,allRestaurantTypePrepService){
		var vm = this;
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'RestaurantResource','ActivateRestaurantResource','DeactivateRestaurantResource','RestaurantTypeResource','restaurantsPrepService','ToastService',  restaurantController])

    function restaurantController($scope,$translate, appCONSTANTS,$uibModal, RestaurantResource,ActivateRestaurantResource,DeactivateRestaurantResource,RestaurantTypeResource,restaurantsPrepService,ToastService){

		        var vm = this;
		vm.restaurant = restaurantsPrepService;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

				var allRestaurantType;
		RestaurantTypeResource.getAllRestaurantType().$promise.then(function(results) {
			allRestaurantType = results;	
		});
		function refreshRestaurant(){
			var k = RestaurantResource.getAllRestaurant({page:vm.currentPage}).$promise.then(function(results) {
				vm.restaurant = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshRestaurant();
		}

				vm.openRestaurantDialog = function(){

										if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishRestaurant;
				var k = RestaurantResource.getAllRestaurant({lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishRestaurant = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/GlobalAdmin/templates/editRestaurant.html',
						controller: 'editRestaurantDialogController',
						controllerAs: 'restDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishRestaurant: function(){return englishRestaurant;},
							type:function(){ return null},
							callBackFunction:function(){return refreshRestaurant;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/GlobalAdmin/templates/newRestaurant.html',
					controller: 'restaurantDialogController',
					controllerAs: 'restDlCtrl',
					resolve:{
						allRestaurantType:function(){return allRestaurantType;},
						callBackFunction:function(){return refreshRestaurant;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			RestaurantResource.deleteRestaurant({restaurantId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('restaurantDeleteSuccess'),"success");
				refreshRestaurant();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.openDeleteRestaurantDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function(){return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}




		vm.Activate = function(restaurant){
			if(restaurant.isReady){
				ActivateRestaurantResource.Activate({restaurantId:restaurant.restaurantId})
				.$promise.then(function(result){
					restaurant.isActive = true;
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				})
			}
		}

		vm.Deactivate = function(restaurant){
			DeactivateRestaurantResource.DeActivate({restaurantId:restaurant.restaurantId})
			.$promise.then(function(result){
				restaurant.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}



							}

	}
    ());
;(function() {
  angular
    .module('home')
    .factory('RestaurantResource', ['$resource', 'appCONSTANTS', RestaurantResource])
    .factory('ActivateRestaurantResource', ['$resource', 'appCONSTANTS', ActivateRestaurantResource])
    .factory('DeactivateRestaurantResource', ['$resource', 'appCONSTANTS', DeactivateRestaurantResource]);

  function RestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId', {}, {
      getAllRestaurant: { method: 'GET', useToken: true,params:{lang:'@lang'} },
      getRestaurant: { method: 'GET', useToken: true },
	    create: { method: 'POST', useToken: true },
	    deleteRestaurant: { method: 'DELETE', useToken: true },
	    update: { method: 'PUT', useToken: true }
    })
  }

  function ActivateRestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId/Activate', {}, {
	    Activate: { method: 'GET', useToken: true }
    })
  }
  function DeactivateRestaurantResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/:restaurantId/DeActivate', {}, {
	    DeActivate: { method: 'GET', useToken: true }
    })
  }

  }());
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantTypeController', ['$scope', '$translate' , 'appCONSTANTS','$uibModal', 'RestaurantTypeResource','restaurantTypePrepService','ToastService',  restaurantTypeController])

    function restaurantTypeController($scope, $translate, appCONSTANTS,$uibModal, RestaurantTypeResource,restaurantTypePrepService,ToastService){

        var vm = this;
		vm.restaurantTypes = restaurantTypePrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

				function refreshType(){
			var k = RestaurantTypeResource.getAllRestaurantType().$promise.then(function(results) {
				vm.restaurantTypes = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openTypeDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishRestaurantType;
				var k = RestaurantTypeResource.getAllRestaurantType({lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishRestaurantType = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/GlobalAdmin/templates/editType.html',
						controller: 'editRestaurantTypeDialogController',
						controllerAs: 'editRestTypeDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishRestaurantType: function(){return englishRestaurantType;},
							type:function(){ return null},
							callBackFunction:function(){return refreshType;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/GlobalAdmin/templates/newType.html',
					controller: 'restaurantTypeDialogController',
					controllerAs: 'restTypeDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshType;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			RestaurantTypeResource.deleteType({restaurantTypeId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('RestaurantTypeDeleteSuccess'),"success");
				refreshType();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteTypeDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function(){return $translate.instant('RestaurantTypeDeleteMessage')},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditTypeDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/GlobalAdmin/templates/editType.html',
				controller: 'editRestaurantTypeDialogController',
				controllerAs: 'editRestTypeDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishRestaurantType: function(){return null;},
					type:function(){ return vm.restaurantTypes[index]},
					callBackFunction:function(){return refreshType;}
				}

							});

					}




									}

	}
    ());
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantTypeDialogController', ['$uibModalInstance', 'RestaurantTypeResource','ToastService','callBackFunction','$rootScope',  restaurantTypeDialogController])

	function restaurantTypeDialogController($uibModalInstance, RestaurantTypeResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.typeName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewType = function(){
			var newType = new RestaurantTypeResource();
            newType.typeName = vm.typeName;
            newType.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp","restaurant type added successfully.","success");
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
;(function() {
    'use strict';

      angular
      .module('home')
      .config(config)
      .run(runBlock);

      config.$inject = ['ngProgressLiteProvider'];
    runBlock.$inject = ['$rootScope', 'ngProgressLite' ];

      function config(ngProgressLiteProvider) {
      ngProgressLiteProvider.settings.speed = 1000;

      }

      function runBlock($rootScope, ngProgressLite ) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
          startProgress();
      });
      var routingDoneEvents = ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'];

        angular.forEach(routingDoneEvents, function(event) {
        $rootScope.$on(event, function(event, toState, toParams, fromState, fromParams) {
          endProgress();
        });
      });

        function startProgress() {
        ngProgressLite.start();
      }

        function endProgress() {
        ngProgressLite.done();
      }

      }
  })();
  ;(function() {
    'use strict';

    angular
        .module('home')
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider
              .state('Menu', {
					url: '/menu',
                    templateUrl: './app/RestaurantAdmin/templates/menu.html',
                    controller: 'menuController',
                    'controllerAs': 'menuCtrl',
                    data: {
                        permissions: {
                            only: ['RestaurantAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'Menu'
                    },
                    resolve: {
                        menuPrepService: menuPrepService,
                        RestaurantIsReadyPrepService:RestaurantIsReadyPrepService
                    }

                                 })
                .state('Category', {
                      url: '/menu/:menuId/Category',
                      templateUrl: './app/RestaurantAdmin/templates/Category.html',
                      controller: 'categoryController',
                      'controllerAs': 'categoryCtrl',
                      data: {
                          permissions: {
                              only: ['RestaurantAdmin'],
                             redirectTo: 'root'
                          },
                          displayName: 'Category'
                      },
                      resolve: {
                        categoryPrepService: categoryPrepService
                      }

                                     })
                  .state('size', {
                        url: '/size',
                        templateUrl: './app/RestaurantAdmin/templates/size.html',
                        controller: 'sizeController',
                        'controllerAs': 'sizeCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                               redirectTo: 'root'
                            },
                            displayName: 'Size'
                        },
                        resolve: {
                          sizePrepService: sizePrepService
                        }

                                         })
                    .state('sideItem', {
                          url: '/SideItem',
                          templateUrl: './app/RestaurantAdmin/templates/sideItem.html',
                          controller: 'sideItemController',
                          'controllerAs': 'sideItemCtrl',
                          data: {
                              permissions: {
                                  only: ['RestaurantAdmin'],
                                 redirectTo: 'root'
                              },
                              displayName: 'SideItem'
                          },
                          resolve: {
                            sideItemPrepService: sideItemPrepService
                          }

                                             })
                    .state('Items', {
                        url: '/Category/:categoryId/Item',
                        templateUrl: './app/RestaurantAdmin/templates/Item.html',
                        controller: 'ItemController',
                        'controllerAs': 'itemCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                                redirectTo: 'root'
                            },
                            displayName: 'Category'
                        },
                        resolve: {
                            itemsPrepService: itemsPrepService
                        }
                    })
                    .state('newItem', {
                        url: '/Category/:categoryId/newItem',
                        templateUrl: './app/RestaurantAdmin/templates/newItem.html',
                        controller: 'newItemController',
                        'controllerAs': 'newItemCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                               redirectTo: 'root'
                            },
                            displayName: 'Items'
                        },
                        resolve: {
                            ItemSizePrepService: ItemSizePrepService,
                            ItemSideItemPrepService: ItemSideItemPrepService,
                            defaultItemsPrepService: defaultItemsPrepService,
                        }                 
                    })
                    .state('editItem', {
                        url: '/Category/:categoryId/Items/:itemId',
                        templateUrl: './app/RestaurantAdmin/templates/editItem.html',
                        controller: 'editItemController',
                        'controllerAs': 'editItemCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                               redirectTo: 'root'
                            },
                            displayName: 'Items'
                        },
                        resolve: {
                            itemPrepService:itemPrepService,
                            ItemSizePrepService: ItemSizePrepService,
                            ItemSideItemPrepService: ItemSideItemPrepService
                        }                 
                    })
                    .state('Waiters', {
                        url: '/Waiter',
                        templateUrl: './app/RestaurantAdmin/templates/waiter.html',
                        controller: 'WaiterController',
                        'controllerAs': 'waiterCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                                redirectTo: 'root'
                            },
                            displayName: 'Waiters'
                        },
                        resolve: {
                            waitersPrepService: waitersPrepService
                        }
                    })
                    .state('Template', {
                        url: '/Template',
                        templateUrl: './app/RestaurantAdmin/templates/categoryTemplate.html',
                        controller: 'CategoryTemplateController',
                        'controllerAs': 'CategoryTemplateCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                                redirectTo: 'root'
                            },
                            displayName: 'Templates'
                        },
                        resolve: {
                            allMenuPrepService: allMenuPrepService,
                            templatesPrepService: templatesPrepService
                        }
                    })
        });

                menuPrepService.$inject = ['MenuResource']
        function menuPrepService(MenuResource) {
            return MenuResource.getAllMenus().$promise;
        }

        categoryPrepService.$inject = ['GetCategoriesResource','$stateParams']
        function categoryPrepService(GetCategoriesResource,$stateParams) {
            return GetCategoriesResource.getAllCategories({ MenuId: $stateParams.menuId }).$promise;
        }

                sizePrepService.$inject = ['SizeResource']
        function sizePrepService(SizeResource) {
            return SizeResource.getAllSizes().$promise;
        }

                sideItemPrepService.$inject = ['SideItemResource']
        function sideItemPrepService(SideItemResource) {
            return SideItemResource.getAllSideItems().$promise;
        }

                itemsPrepService.$inject = ['GetItemsResource','$stateParams']
        function itemsPrepService(GetItemsResource,$stateParams) {
            return GetItemsResource.getAllItems({ CategoryId: $stateParams.categoryId }).$promise;
        }

        ItemSizePrepService.$inject = ['SizeResource']
        function ItemSizePrepService(SizeResource) {
            return SizeResource.getAllSizes({ pagesize:0 }).$promise;
        }

        ItemSideItemPrepService.$inject = ['SideItemResource']
        function ItemSideItemPrepService(SideItemResource) {
            return SideItemResource.getAllSideItems({ pagesize:0 }).$promise;
        }

        itemPrepService.$inject = ['ItemResource','$stateParams']
        function itemPrepService(ItemResource,$stateParams) {
            return ItemResource.getItem({ itemId:$stateParams.itemId }).$promise;
        }

        defaultItemsPrepService.$inject = ['GetItemNamesResource','$stateParams','$localStorage','appCONSTANTS']
        function defaultItemsPrepService(GetItemNamesResource,$stateParams,$localStorage,appCONSTANTS) {
            if($localStorage.language != appCONSTANTS.defaultLanguage){
                return GetItemNamesResource.getAllItemNames({ CategoryId:$stateParams.categoryId, lang:appCONSTANTS.defaultLanguage }).$promise;
            }
            else
                return null;
        }

        RestaurantIsReadyPrepService.$inject = ['CheckRestaurantReadyResource']
        function RestaurantIsReadyPrepService(CheckRestaurantReadyResource) {
            return CheckRestaurantReadyResource.IsReady().$promise;
        }

        waitersPrepService.$inject = ['WaiterResource']
        function waitersPrepService(WaiterResource) {
            return WaiterResource.getAllWaiters().$promise;
        }


                templatesPrepService.$inject = ['TemplateResource']
        function templatesPrepService(TemplateResource) {
            return TemplateResource.getTemplates().$promise;
        }

                allMenuPrepService.$inject = ['ActivatedMenuResource']
        function allMenuPrepService(ActivatedMenuResource) {
            return ActivatedMenuResource.getAllMenusName().$promise;
        }
}());
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('categoryController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal','GetCategoriesResource', 'CategoryResource','ActivateCategoryResource','DeactivateCategoryResource','categoryPrepService','ToastService',  categoryController])

    function categoryController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal,GetCategoriesResource, CategoryResource,ActivateCategoryResource,DeactivateCategoryResource,categoryPrepService,ToastService){

        var vm = this;
		vm.categories = categoryPrepService;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")

				function refreshCategories(){
			var k = GetCategoriesResource.getAllCategories({ MenuId: $stateParams.menuId,page:vm.currentPage }).$promise.then(function(results) {
				vm.categories = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshCategories();
		}
		vm.openCategoryDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishCategories;
				var k = GetCategoriesResource.getAllCategories({ MenuId: $stateParams.menuId,pagesize:0, lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishCategories = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/RestaurantAdmin/templates/editCategory.html',
						controller: 'editCategoryDialogController',
						controllerAs: 'editCategoryDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishCategories: function(){return englishCategories.results;},
							category:function(){ return null},
							callBackFunction:function(){return refreshCategories;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newCategory.html',
					controller: 'categoryDialogController',
					controllerAs: 'categoryDlCtrl',
					resolve:{
                        menuId: function(){ return $stateParams.menuId;},
						callBackFunction:function(){return refreshCategories;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			CategoryResource.deleteCategory({categoryId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('CategoryDeleteSuccess'),"success");
				refreshCategories();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteCategoryDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditCategoryDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editCategory.html',
				controller: 'editCategoryDialogController',
				controllerAs: 'editCategoryDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishCategories: function(){return null;},
					category:function(){ return vm.categories.results[index]},
					callBackFunction:function(){return refreshCategories;}
				}

							});

					}
		vm.Activate = function(category){
			ActivateCategoryResource.Activate({categoryId:category.categoryId})
			.$promise.then(function(result){
				category.isActive = true;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

		vm.Deactivate = function(category){
			DeactivateCategoryResource.Deactivate({categoryId:category.categoryId})
			.$promise.then(function(result){
				category.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}		



							}

	}
    ());
;(function() {
    angular
      .module('home')
      .factory('CategoryResource', ['$resource', 'appCONSTANTS', CategoryResource])
      .factory('GetCategoriesResource', ['$resource', 'appCONSTANTS', GetCategoriesResource])
      .factory('GetCategoriesNameResource', ['$resource', 'appCONSTANTS', GetCategoriesNameResource])
      .factory('ActivateCategoryResource', ['$resource', 'appCONSTANTS', ActivateCategoryResource])
      .factory('DeactivateCategoryResource', ['$resource', 'appCONSTANTS', DeactivateCategoryResource]);

      function CategoryResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId', {}, {
        create: { method: 'POST', useToken: true },
        deleteCategory: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    function GetCategoriesResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/Categories', {}, {
          getAllCategories: { method: 'GET', useToken: true, params:{lang:'@lang'} }
        })
    }

        function GetCategoriesNameResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/Categories/Name', {}, {
        getAllCategoriesName: { method: 'GET', useToken: true, params:{lang:'@lang'},isArray: true }
      })
  }

    function ActivateCategoryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId/Activate', {}, {
          Activate: { method: 'GET', useToken: true}
        })
    }
    function DeactivateCategoryResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }
}());
  ;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('categoryDialogController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS' , 'CategoryResource','ToastService','menuId','callBackFunction','$rootScope',  categoryDialogController])

	function categoryDialogController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS , CategoryResource,ToastService,menuId,callBackFunction,$rootScope){
		var vm = this;
		vm.menuName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewCategory = function(){
            var newCategroy = new Object();
            newCategroy.categoryName = vm.categoryName;
            newCategroy.menuId = menuId;

			var model = new FormData();
			model.append('data', JSON.stringify(newCategroy));
			model.append('file', categoryImage);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Categories/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('CategoryAddSuccess'),"success");
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
		$scope.AddCategoryImage = function(element) {
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.newCategoryForm.$dirty=true;
					$scope.$apply(function() {

												categoryImage= imageFile;
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
}());
;(function () {
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
}());
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('CategoryTemplateController', ['$scope','$translate', '$stateParams', 'appCONSTANTS','$uibModal','allMenuPrepService','templatesPrepService','ToastService' ,'GetCategoriesNameResource','CategoryTemplateResource' ,  CategoryTemplateController])

    function CategoryTemplateController($scope,$translate,$stateParams, appCONSTANTS,$uibModal, allMenuPrepService, templatesPrepService, ToastService, GetCategoriesNameResource, CategoryTemplateResource){
        var vm = this;
        vm.menus = allMenuPrepService;
        vm.templates = templatesPrepService;
        vm.selectedTemplateId= 0;
        vm.selectedMenu = vm.menus[0];
        vm.selectedTemplates = [];
        vm.page=1;

                var totalItemsCount = 0;
        vm.isCategoryTemplateReady = false;
        function loadCategory(){
            GetCategoriesNameResource.getAllCategoriesName({ MenuId: vm.selectedMenu.menuId })
            .$promise.then(function(results) {
                vm.categories = results;                
                vm.selectedTemplates = [];
                vm.page=1;
                totalItemsCount = 0;
                vm.selectedCategory = vm.categories[0];
                vm.selectedTemplateId= 0;
                vm.remainingItems = vm.selectedCategory.itemCount;
                if(vm.selectedCategory.itemCount <= totalItemsCount){
                    vm.isCategoryTemplateReady = true;
                }
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
        }
        loadCategory();
        vm.changeMenu = function(){
            loadCategory();
        }

        vm.changeCategory = function(){
            vm.selectedTemplates = [];
            vm.page=1;
            totalItemsCount = 0;
            vm.selectedTemplateId= 0;        
            vm.remainingItems = vm.selectedCategory.itemCount;
            vm.isCategoryTemplateReady = false;

                    }


        vm.selectTemplate = function(){
            vm.templates.forEach(function(element) {
                if(element.id == vm.selectedTemplateId){
                    var temp = angular.copy(element);
                    temp.page = vm.page;
                    vm.selectedTemplates.push(temp);
                    vm.selectedTemplateId = 0;
                    vm.page++;
                    totalItemsCount += temp.itemCount;
                    if(vm.selectedCategory.itemCount <= totalItemsCount){
                        vm.isCategoryTemplateReady = true;
                    }
                    vm.remainingItems = vm.selectedCategory.itemCount - totalItemsCount;
                    vm.remainingItems  = vm.remainingItems < 0 ? 0 : vm.remainingItems ;
                }
            }, this);
            console.log(vm.selectedTemplates)
        }

        vm.save = function(){
            var newCategroyTemplate = new CategoryTemplateResource();
            var categoryTemplates = []
            vm.selectedTemplates.forEach(function(element) {
                categoryTemplates.push({categoryId:vm.selectedCategory.categoryId,templateId:element.id,pageNumber:element.page})
            }, this);
            newCategroyTemplate.PageModels = categoryTemplates;
            newCategroyTemplate.$create({ categoryId: vm.selectedCategory.categoryId }).then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",'suc',"success");
                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
        }


    }

	}
());;(function() {
    angular
      .module('home')
      .factory('TemplateResource', ['$resource', 'appCONSTANTS', TemplateResource])
      .factory('CategoryTemplateResource', ['$resource', 'appCONSTANTS', CategoryTemplateResource]);

      function TemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Templates/', {}, {
        getTemplates: { method: 'GET', useToken: true,isArray: true }
      })
    }

    function CategoryTemplateResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId/Template', {}, {
        create: { method: 'POST', useToken: true }
      })
    }

}());
  ;(function () {
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
			updatedItem.sizes = [];
         	   vm.SelectedSize.forEach(function(element) {
                updatedItem.sizes.push(element);
				}, this);
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
				var minValues =99999;
         	   vm.SelectedSideItems.forEach(function(element) {
				var side ;	
				vm.SideItems.forEach(function(item) {
						if(item.sideItemId == element){
							side = item;
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


	}	
}());
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('ItemController', ['$scope','$translate', '$stateParams', 'appCONSTANTS','$uibModal', 'GetItemsResource', 'ItemResource','itemsPrepService','ToastService' ,'ActivateItemResource' ,'DeactivateItemResource',  ItemController])

    function ItemController($scope,$translate,$stateParams, appCONSTANTS,$uibModal, GetItemsResource,ItemResource,itemsPrepService,ToastService, ActivateItemResource, DeactivateItemResource){

		        var vm = this;
		vm.items = itemsPrepService;

		        vm.Now = $scope.getCurrentTime();		
		function refreshItems(){
			var k = GetItemsResource.getAllItems({ CategoryId: $stateParams.categoryId, page:vm.currentPage}).$promise.then(function(results) {
				vm.items = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshItems();
		}


						function confirmationDelete(itemId){
			ItemResource.deleteItem({itemId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('itemDeleteSuccess'),"success");
				refreshItems();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.openDeleteItemDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.Activate = function(item){
			ActivateItemResource.Activate({itemId:item.itemID})
			.$promise.then(function(result){
				item.isActive = true;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

		vm.Deactivate = function(item){
			DeactivateItemResource.Deactivate({itemId:item.itemID})
			.$promise.then(function(result){
				item.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

			}

	}
());
;(function() {
    angular
      .module('home')
      .factory('ItemResource', ['$resource', 'appCONSTANTS', ItemResource])
      .factory('GetItemsResource', ['$resource', 'appCONSTANTS', GetItemsResource])
      .factory('GetItemNamesResource', ['$resource', 'appCONSTANTS', GetItemNamesResource])
      .factory('TranslateItemResource', ['$resource', 'appCONSTANTS', TranslateItemResource])
      .factory('ActivateItemResource', ['$resource', 'appCONSTANTS', ActivateItemResource])
      .factory('DeactivateItemResource', ['$resource', 'appCONSTANTS', DeactivateItemResource]);

      function ItemResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Items/:itemId', {}, {
        create: { method: 'POST', useToken: true },
        getItem: { method: 'GET', useToken: true },
        deleteItem: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    function GetItemsResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Categories/:CategoryId/Items', {}, {
          getAllItems: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        })
    }

    function GetItemNamesResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Categories/:CategoryId/Items/Name', {}, {
        getAllItemNames: { method: 'GET', useToken: true, isArray: true, params:{lang:'@lang'} },
      })
    }

        function TranslateItemResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Items/Translate', {}, {
        translateItem: { method: 'PUT', useToken: true},
      })
    }

    function ActivateItemResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Items/:itemId/Activate', {}, {
          Activate: { method: 'GET', useToken: true}
        })
    }
    function DeactivateItemResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Items/:itemId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }
}());
  ;(function () {
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

		function addNewItem(){
			var newItem = new Object();
            newItem.itemName = vm.itemName;
			newItem.itemDescription = vm.itemDescription;
			newItem.categoryId = $stateParams.categoryId;
			newItem.sizes = [];
         	   vm.SelectedSize.forEach(function(element) {
            	    newItem.sizes.push(element);
				}, this);
			newItem.sideItems = [];
			if(vm.hasSideItem){
         	   vm.SelectedSideItems.forEach(function(element) {
         	       newItem.sideItems.push({sideItemId:element});
				}, this);
			newItem.maxSideItemValue = vm.maxSideItemValue;			
			}

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
				var minValues =99999;
         	   vm.SelectedSideItems.forEach(function(element) {
				var side ;	
				vm.SideItems.forEach(function(item) {
						if(item.sideItemId == element){
							side = item;
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('sideItemController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'SideItemResource','sideItemPrepService','ToastService',  sideItemController])

    function sideItemController($scope ,$translate , appCONSTANTS,$uibModal, SideItemResource,sideItemPrepService,ToastService){

        var vm = this;
		vm.sideItems = sideItemPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

				function refreshSideItems(){
			var k = SideItemResource.getAllSideItems({page:vm.currentPage}).$promise.then(function(results) {
				vm.sideItems = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshSideItems();
		}
		vm.openSideItemDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishSideItems;
				var k = SideItemResource.getAllSideItems({pagesize:0, lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
                    englishSideItems = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/RestaurantAdmin/templates/editSideItem.html',
						controller: 'editSideItemDialogController',
						controllerAs: 'editSideItemDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishSideItems: function(){return englishSideItems.results;},
							sideItem:function(){ return null},
							callBackFunction:function(){return refreshSideItems;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newSideItem.html',
					controller: 'sideItemDialogController',
					controllerAs: 'sideItemDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshSideItems;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			SideItemResource.deleteSideItem({SideItemId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('SideItemDeleteSuccess'),"success");
				refreshSideItems();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteSideItemDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditSideItemDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editSideItem.html',
				controller: 'editSideItemDialogController',
				controllerAs: 'editSideItemDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishSideItems: function(){return null;},
					sideItem:function(){ return vm.sideItems.results[index]},
					callBackFunction:function(){return refreshSideItems;}
				}

							});

					}



							}

	}
());
;(function() {
    angular
      .module('home')
      .factory('SideItemResource', ['$resource', 'appCONSTANTS', SideItemResource]);

      function SideItemResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'SideItems/:SideItemId', {}, {
        getAllSideItems: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteSideItem: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }

      }());
  ;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('sideItemDialogController', ['$uibModalInstance','$translate' , 'SideItemResource','ToastService','callBackFunction','$rootScope',  sideItemDialogController])

	function sideItemDialogController($uibModalInstance, $translate , SideItemResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
        vm.sideItemName = "";
        vm.value;
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewSideItem = function(){
			var newSideItem = new SideItemResource();
            newSideItem.sideItemName = vm.sideItemName;
            newSideItem.value = vm.value;
            newSideItem.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('SideItemAddSuccess'),"success");
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editSideItemDialogController', ['$uibModalInstance','$translate', 'SideItemResource','ToastService','mode','englishSideItems','sideItem','callBackFunction',  editSideItemDialogController])

	function editSideItemDialogController($uibModalInstance, $translate, SideItemResource,ToastService, mode, englishSideItems, sideItem,callBackFunction){
		var vm = this;
		vm.sideItemName = "";

				vm.mode = mode;
		vm.englishSideItems = englishSideItems;
        if(mode == "edit"){
            vm.sideItemName = sideItem.sideItemName;
            vm.value = sideItem.value;
        }
		else
			vm.selectedSideItem = englishSideItems[0];
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.updateSideItem = function(){
			var updateSideItem = new SideItemResource();
            updateSideItem.sideItemName = vm.sideItemName;

            			if(mode == "edit"){
				updateSideItem.sideItemId = sideItem.sideItemId;
				updateSideItem.value = vm.value;
			}
			else{
				updateSideItem.sideItemId = vm.selectedSideItem.sideItemId;
				updateSideItem.value = vm.selectedSideItem.value;
			}
            updateSideItem.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('UpdateSideItemSuccess'),"success");
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('menuController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'MenuResource','menuPrepService','RestaurantIsReadyPrepService','ToastService','ActivateMenuResource','DeactivateMenuResource','PublishRestaurantResource',  menuController])

    function menuController($scope ,$translate , appCONSTANTS,$uibModal, MenuResource,menuPrepService,RestaurantIsReadyPrepService,ToastService,ActivateMenuResource,DeactivateMenuResource,PublishRestaurantResource){

        var vm = this;
		vm.menus = menuPrepService;
		vm.RestaurantIsReady = RestaurantIsReadyPrepService.isReady;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

				function refreshMenu(){
			var k = MenuResource.getAllMenus({page:vm.currentPage}).$promise.then(function(results) {
				vm.menus = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshMenu();
		}
		vm.openMenuDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishMenus;
				var k = MenuResource.getAllMenus({pagesize:0, lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishMenus = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/RestaurantAdmin/templates/editMenu.html',
						controller: 'editMenuDialogController',
						controllerAs: 'editMenuDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishMenus: function(){return englishMenus.results;},
							menu:function(){ return null},
							callBackFunction:function(){return refreshMenu;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newMenu.html',
					controller: 'menuDialogController',
					controllerAs: 'menuDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshMenu;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			MenuResource.deleteMenu({MenuId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('menuDeleteSuccess'),"success");
				refreshMenu();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteMenuDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditMenuDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editMenu.html',
				controller: 'editMenuDialogController',
				controllerAs: 'editMenuDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishMenus: function(){return null;},
					menu:function(){ return vm.menus.results[index]},
					callBackFunction:function(){return refreshMenu;}
				}

							});

					}

				vm.Activate = function(menu){
			ActivateMenuResource.Activate({MenuId:menu.menuId})
			.$promise.then(function(result){
				menu.isActive = true;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

		vm.Deactivate = function(menu){
			DeactivateMenuResource.Deactivate({MenuId:menu.menuId})
			.$promise.then(function(result){
				menu.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}
		vm.Publish = function(){
			PublishRestaurantResource.Publish()
			.$promise.then(function(result){
				vm.RestaurantIsReady = true;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}


					}

	}
    ());
;(function() {
    angular
      .module('home')
      .factory('MenuResource', ['$resource', 'appCONSTANTS', MenuResource])
      .factory('ActivatedMenuResource', ['$resource', 'appCONSTANTS', ActivatedMenuResource])
      .factory('ActivateMenuResource', ['$resource', 'appCONSTANTS', ActivateMenuResource])
      .factory('DeactivateMenuResource', ['$resource', 'appCONSTANTS', DeactivateMenuResource])
      .factory('CheckRestaurantReadyResource', ['$resource', 'appCONSTANTS', CheckRestaurantReadyResource])
      .factory('PublishRestaurantResource', ['$resource', 'appCONSTANTS', PublishRestaurantResource]);

      function MenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId', {}, {
        getAllMenus: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteMenu: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    function ActivateMenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/Activate', {}, {
        Activate: { method: 'GET', useToken: true}
      })
    }
    function DeactivateMenuResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Menus/:MenuId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }

        function CheckRestaurantReadyResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Restaurants/IsReady', {}, {
        IsReady: { method: 'GET', useToken: true }
      })
    }
    function PublishRestaurantResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Restaurants/Publish', {}, {
        Publish: { method: 'GET', useToken: true }
      })
    }

    function ActivatedMenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/Name', {}, {
        getAllMenusName: { method: 'GET', useToken: true, params:{lang:'@lang'},isArray:true }
      })
    }

}());
  ;(function () {
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('menuDialogController', ['$scope','$http','appCONSTANTS','$uibModalInstance','$translate' , 'MenuResource','ToastService','callBackFunction','$rootScope',  menuDialogController])

	function menuDialogController($scope,$http , appCONSTANTS,$uibModalInstance, $translate , MenuResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.menuName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewMenu = function(){
            var newMenu = new Object();
            newMenu.menuName = vm.menuName;

			var model = new FormData();
			model.append('data', JSON.stringify(newMenu));
			model.append('file', menuImage);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Menus/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('menuAddSuccess'),"success");
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
		$scope.AddMenuImage = function(element) {
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.newMenuForm.$dirty=true;
					$scope.$apply(function() {

												menuImage= imageFile;
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('sizeController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'SizeResource','sizePrepService','ToastService',  sizeController])

    function sizeController($scope ,$translate , appCONSTANTS,$uibModal, SizeResource,sizePrepService,ToastService){

        var vm = this;
		vm.sizes = sizePrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

				function refreshSizes(){
			var k = SizeResource.getAllSizes({page:vm.currentPage}).$promise.then(function(results) {
				vm.sizes = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshSizes();
		}
		vm.openSizeDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishSizes;
				var k = SizeResource.getAllSizes({pagesize:0, lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishSizes = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/RestaurantAdmin/templates/editSize.html',
						controller: 'editSizeDialogController',
						controllerAs: 'editSizeDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishSizes: function(){return englishSizes.results;},
							size:function(){ return null},
							callBackFunction:function(){return refreshSizes;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newSize.html',
					controller: 'sizeDialogController',
					controllerAs: 'sizeDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshSizes;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			SizeResource.deleteSize({SizeId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('SizeDeleteSuccess'),"success");
				refreshSizes();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteSizeDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditSizeDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editSize.html',
				controller: 'editSizeDialogController',
				controllerAs: 'editSizeDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishSizes: function(){return null;},
					size:function(){ return vm.sizes.results[index]},
					callBackFunction:function(){return refreshSizes;}
				}

							});

					}



							}

	}
());
;(function() {
    angular
      .module('home')
      .factory('SizeResource', ['$resource', 'appCONSTANTS', SizeResource]);

      function SizeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Sizes/:SizeId', {}, {
        getAllSizes: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteSize: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }

      }());
  ;(function () {
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
;(function () {
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('WaiterController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'WaiterResource','waitersPrepService','ToastService',  WaiterController])

    function WaiterController($scope ,$translate , appCONSTANTS,$uibModal, WaiterResource,waitersPrepService,ToastService){

        var vm = this;
		vm.waiters = waitersPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")

				function refreshWaiter(){
			var k = WaiterResource.getAllWaiters({page:vm.currentPage}).$promise.then(function(results) {
				vm.waiters = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshWaiter();
		}
		vm.openWaiterDialog = function(){		
            var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/newWaiter.html',
				controller: 'waiterDialogController',
				controllerAs: 'waiterDlCtrl',
				resolve:{
					callBackFunction:function(){return refreshWaiter;}
				}

								});
        }
		function confirmationDelete(itemId){
			WaiterResource.deleteWaiter({waiterId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterDeleteSuccess'),"success");
				refreshWaiter();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteWaiterDialog = function(name,id){			
			var modalContent = $uibModal.open({
				templateUrl: './app/core/Delete/templates/ConfirmDeleteDialog.html',
				controller: 'confirmDeleteDialogController',
				controllerAs: 'deleteDlCtrl',
				resolve: {
					itemName: function () { return name },
					itemId: function() { return id },
					message:function() { return null},
					callBackFunction:function() { return confirmationDelete }
				}

							});
		}

				vm.openEditWaiterDialog = function(index){
            var waiter;
            waiter=angular.copy(vm.waiters.results[index]);
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editWaiter.html',
				controller: 'editWaiterDialogController',
				controllerAs: 'editWaiterDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					waiter:function(){ return waiter},
					callBackFunction:function(){return refreshWaiter;}
				}

							});

					}


							}

	}
());
;(function() {
    angular
      .module('home')
      .factory('WaiterResource', ['$resource', 'appCONSTANTS', WaiterResource]);

      function WaiterResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Waiters/:waiterId', {}, {
        getAllWaiters: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteWaiter: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }

      }());
  ;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('waiterDialogController', ['$uibModalInstance','$translate' , 'WaiterResource','ToastService','callBackFunction','$rootScope',  waiterDialogController])

	function waiterDialogController($uibModalInstance, $translate , WaiterResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.userName;
            newWaiter.name = vm.name;
            newWaiter.password = vm.password;
            newWaiter.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterAddSuccess'),"success");
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
;(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editWaiterDialogController', ['$uibModalInstance','$translate', 'WaiterResource','ToastService','waiter','callBackFunction',  editWaiterDialogController])

	function editWaiterDialogController($uibModalInstance, $translate, WaiterResource,ToastService,  waiter,callBackFunction){
		var vm = this;
		vm.menuName = "";
		vm.waiter = waiter;
        vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		vm.updateWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.waiter.userName;
            newWaiter.name = vm.waiter.name;
            newWaiter.password = vm.waiter.password;
            newWaiter.userId = waiter.userId;
            newWaiter.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterUpdateSuccess'),"success");
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
