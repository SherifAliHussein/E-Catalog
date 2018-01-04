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
                        restaurantTypesPrepService: restaurantTypesPrepService
                    }

                                 })
                .state('newRestaurantType', {
					url: '/newRestaurantType',
                    templateUrl: './app/GlobalAdmin/templates/newType.html',
                    controller: 'restaurantTypeDialogController',
                    'controllerAs': 'restTypeDlCtrl',
                    data: {
                        permissions: {
                            only: ['GlobalAdmin'],
                           redirectTo: 'root'
                        },
                        displayName: 'restaurantType'
                    }

                                 })
                .state('editRestaurantType', {
					url: '/restaurantType/:restaurantTypeId',
                    templateUrl: './app/GlobalAdmin/templates/editType.html',
                    controller: 'editRestaurantTypeDialogController',
                    'controllerAs': 'editRestTypeDlCtrl',
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
                        restaurantsPrepService: restaurantsPrepService,
                        waitersLimitPrepService: waitersLimitPrepService
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
                        allRestaurantTypePrepService: allRestaurantTypePrepService,
                        waitersLimitPrepService: waitersLimitPrepService
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
                        allRestaurantTypePrepService: allRestaurantTypePrepService,
                        waitersLimitPrepService: waitersLimitPrepService
                    }                 
                })
        });

	restaurantTypesPrepService.$inject = ['RestaurantTypeResource']
    function restaurantTypesPrepService(RestaurantTypeResource) {
        return RestaurantTypeResource.getAllRestaurantType().$promise;
    }

    restaurantTypePrepService.$inject = ['RestaurantTypeResource','$stateParams']
    function restaurantTypePrepService(RestaurantTypeResource,$stateParams) {
        return RestaurantTypeResource.getRestaurantType({restaurantTypeId:$stateParams.restaurantTypeId}).$promise;
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

    waitersLimitPrepService.$inject = ['AdminWaitersLimitResource']
    function waitersLimitPrepService(AdminWaitersLimitResource) {
        return AdminWaitersLimitResource.getWaitersLimitAndConsumed().$promise;
    }


}());
(function() {
  angular
    .module('home')
    .factory('RestaurantTypeResource', ['$resource', 'appCONSTANTS', RestaurantTypeResource]);

  function RestaurantTypeResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/Type/:restaurantTypeId', {}, {
      getAllRestaurantType: { method: 'GET', useToken: true,isArray: true, params:{lang:'@lang'} },
      getRestaurantType: { method: 'GET', useToken: true},
	  create: { method: 'POST', useToken: true },
	  deleteType: { method: 'DELETE', useToken: true },
	  update: { method: 'PUT', useToken: true }
    })
  }

  }());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editRestaurantController', ['$scope','$http','$translate','appCONSTANTS', '$state', 'RestaurantResource','ToastService', 'restaurantPrepService','allRestaurantTypePrepService', 'waitersLimitPrepService',  editRestaurantController])

	function editRestaurantController($scope,$http,$translate,appCONSTANTS, $state, RestaurantResource,ToastService, restaurantPrepService, allRestaurantTypePrepService,waitersLimitPrepService){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.RestaurantType = allRestaurantTypePrepService;
		vm.restaurant = restaurantPrepService;
		vm.waitersLimit = waitersLimitPrepService;
		vm.waitersLimit.maxNumUsers = (vm.waitersLimit.maxNumUsers - vm.waitersLimit.consumedUsers) + vm.restaurant.waitersLimit;
		vm.confirmPassword = vm.restaurant.restaurantAdminPassword;
		vm.close = function(){
			$state.go('restaurants');
		}

				vm.updateRestaurant = function(){
			var updateRestaurant = new Object();
            updateRestaurant.restaurantAdminUserName = vm.restaurant.restaurantAdminUserName;
			updateRestaurant.restaurantAdminPassword = vm.restaurant.restaurantAdminPassword;
			updateRestaurant.restaurantNameDictionary = vm.restaurant.restaurantNameDictionary;
			updateRestaurant.restaurantDescriptionDictionary = vm.restaurant.restaurantDescriptionDictionary;
			updateRestaurant.restaurantTypeId = vm.restaurant.restaurantTypeId;
			updateRestaurant.restaurantId = vm.restaurant.restaurantId;
			updateRestaurant.isLogoChange = isLogoChange;
			updateRestaurant.waitersLimit = vm.restaurant.waitersLimit;

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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editRestaurantTypeDialogController', ['$state', 'appCONSTANTS', 'RestaurantTypeResource','ToastService','restaurantTypePrepService','$translate',  editRestaurantTypeDialogController])

	function editRestaurantTypeDialogController($state, appCONSTANTS, RestaurantTypeResource,ToastService, restaurantTypePrepService ,$translate){
		var vm = this;
		vm.typeName = "";
		vm.language = appCONSTANTS.supportedLanguage;

				vm.restaurantType = restaurantTypePrepService;

				vm.updateType = function(){
			var newType = new RestaurantTypeResource();

						newType.restaurantTypeId = vm.restaurantType.restaurantTypeId;
			newType.typeNameDictionary = vm.restaurantType.typeNameDictionary;
            newType.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('RestaurantTypeUpdateSuccess'),"success");
					$state.go('restaurantType');

					                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
}());
(function () {
    'use strict';

    angular
        .module('home')
        .controller('newRestaurantController', ['$scope','$translate','$http', 'appCONSTANTS' ,'$state', 'RestaurantResource','ToastService' ,'allRestaurantTypePrepService', 'waitersLimitPrepService',  newRestaurantController])

	function newRestaurantController($scope,$translate,$http, appCONSTANTS, $state, RestaurantResource,ToastService,allRestaurantTypePrepService, waitersLimitPrepService){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.waitersLimit = waitersLimitPrepService;
		vm.waitersLimit.maxNumUsers = vm.waitersLimit.maxNumUsers - vm.waitersLimit.consumedUsers;
		vm.mode = $scope.selectedLanguage != appCONSTANTS.defaultLanguage?"map":"new";
		vm.close = function(){
			$state.go('restaurants');
		}

				vm.RestaurantType = allRestaurantTypePrepService;
		vm.selectedType = allRestaurantTypePrepService[0];
		vm.addNewRestaurant = function(){
			var newRestaurant = new Object();
            newRestaurant.restaurantAdminUserName = vm.restaurantAdmin;
			newRestaurant.restaurantAdminPassword = vm.restaurantAdminPassword;
			newRestaurant.restaurantNameDictionary = vm.restaurantNameDictionary;
			newRestaurant.restaurantDescriptionDictionary = vm.restaurantDescriptionDictionary;
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
				function (data, status) {
				    ToastService.show("right", "bottom", "fadeInUp", data.data.message, "error");
				}
			);

		}


		        vm.LoadUploadLogo = function () {
            $("#logoImage").click();
        }
        var restaurantLogo;
        $scope.AddRestaurantLogo = function (element) {
            var logoFile = element[0];

            var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

            if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

                if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
                    $scope.newRestaurantForm.$dirty = true;
                    $scope.$apply(function () {

                        restaurantLogo = logoFile;
                        var reader = new FileReader();

                        reader.onloadend = function () {
                            vm.restaurantLogo = reader.result;
                            $scope.$apply();
                        };
                        if (logoFile) {
                            reader.readAsDataURL(logoFile);
                        }
                    })
                } else {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imageTypeError'), "error");
                }

            } else {
                if (logoFile) {
                    $("#logoImage").val('');
                    ToastService.show("right", "bottom", "fadeInUp", $translate.instant('imgaeSizeError'), "error");
                }

            }


        }
    }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'RestaurantResource','ActivateRestaurantResource','DeactivateRestaurantResource','RestaurantTypeResource','restaurantsPrepService','ToastService', 'waitersLimitPrepService',  restaurantController])

    function restaurantController($scope,$translate, appCONSTANTS,$uibModal, RestaurantResource,ActivateRestaurantResource,DeactivateRestaurantResource,RestaurantTypeResource,restaurantsPrepService,ToastService, waitersLimitPrepService){

		        var vm = this;
		vm.restaurant = restaurantsPrepService;
		vm.Now = $scope.getCurrentTime();
		vm.waitersLimit = waitersLimitPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

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
				ActivateRestaurantResource.Activate({restaurantId:restaurant.restaurantId})
				.$promise.then(function(result){
					restaurant.isActive = true;
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				})
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
(function() {
  angular
    .module('home')
    .factory('RestaurantResource', ['$resource', 'appCONSTANTS', RestaurantResource])
    .factory('RestaurantInfoResource', ['$resource', 'appCONSTANTS', RestaurantInfoResource])
    .factory('ActivateRestaurantResource', ['$resource', 'appCONSTANTS', ActivateRestaurantResource])
    .factory('DeactivateRestaurantResource', ['$resource', 'appCONSTANTS', DeactivateRestaurantResource])
    .factory('AdminWaitersLimitResource', ['$resource', 'appCONSTANTS', AdminWaitersLimitResource]);

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

    function AdminWaitersLimitResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Users/GetMaxAndConUsers', {}, {
	    getWaitersLimitAndConsumed: { method: 'GET', useToken: true }
    })
  }
  function RestaurantInfoResource($resource, appCONSTANTS) {
    return $resource(appCONSTANTS.API_URL + 'Restaurants/GetGlobalRestaurantInfo', {}, {
	    getRestaurantInfo: { method: 'GET', useToken: true }
    })
  }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantTypeController', ['$scope', '$translate' , 'appCONSTANTS','$uibModal', 'RestaurantTypeResource','restaurantTypesPrepService','ToastService',  restaurantTypeController])

    function restaurantTypeController($scope, $translate, appCONSTANTS,$uibModal, RestaurantTypeResource,restaurantTypesPrepService,ToastService){

        var vm = this;
		vm.restaurantTypes = restaurantTypesPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[0].children[0]).addClass("active")

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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('restaurantTypeDialogController', ['$state', 'appCONSTANTS', 'RestaurantTypeResource','ToastService','$rootScope','$translate',  restaurantTypeDialogController])

	function restaurantTypeDialogController($state, appCONSTANTS, RestaurantTypeResource,ToastService,$rootScope,$translate){
		var vm = this;
		vm.typeNameDictionary = {};
		vm.language = appCONSTANTS.supportedLanguage;

				vm.AddNewType = function(){
			console.log(vm.typeNameDictionary)
			var newType = new RestaurantTypeResource();
            newType.typeNameDictionary = vm.typeNameDictionary;
            newType.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('RestaurantTypeAddSuccess'),"success");
					$state.go('restaurantType');
                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
}());
(function() {
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
  (function() {
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
                        menusPrepService: menusPrepService,
                        RestaurantIsReadyPrepService:RestaurantIsReadyPrepService
                    }

                                 })
                .state('newMenu', {
                      url: '/NewMenu',
                      templateUrl: './app/RestaurantAdmin/templates/newMenu.html',
                      controller: 'menuDialogController',
                      'controllerAs': 'menuDlCtrl',
                      data: {
                          permissions: {
                              only: ['RestaurantAdmin'],
                             redirectTo: 'root'
                          },
                          displayName: 'Menu'
                      }

                                     })
                  .state('editMenu', {
                        url: '/Menu/:menuId',
                        templateUrl: './app/RestaurantAdmin/templates/editMenu.html',
                        controller: 'editMenuDialogController',
                        'controllerAs': 'editMenuDlCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                               redirectTo: 'root'
                            },
                            displayName: 'Menu'
                        },
                        resolve: {
                            menuPrepService: menuPrepService
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
                        categoriesPrepService: categoriesPrepService
                      }                   
                  })
                  .state('newCategory', {
                        url: '/menu/:menuId/NewCategory',
                        templateUrl: './app/RestaurantAdmin/templates/newCategory.html',
                        controller: 'categoryDialogController',
                        'controllerAs': 'categoryDlCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                               redirectTo: 'root'
                            },
                            displayName: 'Category'
                        }             
                    })
                    .state('editCategory', {
                          url: '/menu/:menuId/Category/:categoryId',
                          templateUrl: './app/RestaurantAdmin/templates/editCategory.html',
                          controller: 'editCategoryDialogController',
                          'controllerAs': 'editCategoryDlCtrl',
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
                          sizesPrepService: sizesPrepService
                        }

                                         })
                    .state('newsize', {
                          url: '/Newsize',
                          templateUrl: './app/RestaurantAdmin/templates/newSize.html',
                          controller: 'sizeDialogController',
                          'controllerAs': 'sizeDlCtrl',
                          data: {
                              permissions: {
                                  only: ['RestaurantAdmin'],
                                 redirectTo: 'root'
                              },
                              displayName: 'Size'
                          }                       
                      })
                      .state('editsize', {
                            url: '/size/:sizeId',
                            templateUrl: './app/RestaurantAdmin/templates/editSize.html',
                            controller: 'editSizeDialogController',
                            'controllerAs': 'editSizeDlCtrl',
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
                            waitersPrepService: waitersPrepService,
                            WaitersLimitPrepService:WaitersLimitPrepService
                        }
                    })
                    .state('Backgrounds', {
                        url: '/Background',
                        templateUrl: './app/RestaurantAdmin/templates/background.html',
                        controller: 'BackgroundController',
                        'controllerAs': 'backgroundCtrl',
                        data: {
                            permissions: {
                                only: ['RestaurantAdmin'],
                                redirectTo: 'root'
                            },
                            displayName: 'Backgrounds'
                        },
                        resolve: {
                            backgroundsPrepService: backgroundsPrepService
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
                    .state('branch', {
                          url: '/Branch',
                          templateUrl: './app/RestaurantAdmin/templates/branch.html',
                          controller: 'branchController',
                          'controllerAs': 'branchCtrl',
                          data: {
                              permissions: {
                                  only: ['RestaurantAdmin'],
                                 redirectTo: 'root'
                              },
                              displayName: 'Branch'
                          },
                          resolve: {
                            branchsPrepService: branchsPrepService
                          }

                                             })
                      .state('newbranch', {
                            url: '/newBranch',
                            templateUrl: './app/RestaurantAdmin/templates/newBranch.html',
                            controller: 'branchDialogController',
                            'controllerAs': 'branchDlCtrl',
                            data: {
                                permissions: {
                                    only: ['RestaurantAdmin'],
                                   redirectTo: 'root'
                                },
                                displayName: 'Branch'
                            }

                                                 })
                        .state('editbranch', {
                              url: '/Branch/:branchId',
                              templateUrl: './app/RestaurantAdmin/templates/editBranch.html',
                              controller: 'editBranchDialogController',
                              'controllerAs': 'editBranchDlCtrl',
                              data: {
                                  permissions: {
                                      only: ['RestaurantAdmin'],
                                     redirectTo: 'root'
                                  },
                                  displayName: 'Branch'
                              },
                              resolve: {
                                branchPrepService: branchPrepService
                              }
                          })
                          .state('itemOrder', {
                                url: '/order',
                                templateUrl: './app/RestaurantAdmin/templates/itemOrder.html',
                                controller: 'itemOrderController',
                                'controllerAs': 'itemOrderDlCtrl',
                                data: {
                                    permissions: {
                                        only: ['RestaurantAdmin'],
                                       redirectTo: 'root'
                                    },
                                    displayName: 'itemOrder'
                                },
                                resolve: {     
                                    allMenuPrepService: allMenuPrepService
                                }
                            })
        });

                menusPrepService.$inject = ['MenuResource']
        function menusPrepService(MenuResource) {
            return MenuResource.getAllMenus().$promise;
        }

        menuPrepService.$inject = ['MenuResource','$stateParams']
        function menuPrepService(MenuResource,$stateParams) {
            return MenuResource.getMenu({menuId : $stateParams.menuId}).$promise;
        }

        categoriesPrepService.$inject = ['GetCategoriesResource','$stateParams']
        function categoriesPrepService(GetCategoriesResource,$stateParams) {
            return GetCategoriesResource.getAllCategories({ MenuId: $stateParams.menuId }).$promise;
        }

        categoryPrepService.$inject = ['CategoryResource','$stateParams']
        function categoryPrepService(CategoryResource,$stateParams) {
            return CategoryResource.getCategory({ categoryId: $stateParams.categoryId }).$promise;
        }

                sizesPrepService.$inject = ['SizeResource']
        function sizesPrepService(SizeResource) {
            return SizeResource.getAllSizes().$promise;
        }

        sizePrepService.$inject = ['SizeResource','$stateParams']
        function sizePrepService(SizeResource,$stateParams) {
            return SizeResource.getSize({ sizeId: $stateParams.sizeId }).$promise;
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

        backgroundsPrepService.$inject = ['BackgroundResource']
        function backgroundsPrepService(BackgroundResource) {
            return BackgroundResource.getAllBackgrounds().$promise; 
        }


                templatesPrepService.$inject = ['TemplateResource']
        function templatesPrepService(TemplateResource) {
            return TemplateResource.getTemplates().$promise;
        }

                allMenuPrepService.$inject = ['ActivatedMenuResource']
        function allMenuPrepService(ActivatedMenuResource) {
            return ActivatedMenuResource.getAllMenusName().$promise;
        }

                branchsPrepService.$inject = ['BranchResource']
        function branchsPrepService(BranchResource) {
            return BranchResource.getAllBranches().$promise;
        }

        branchPrepService.$inject = ['BranchResource','$stateParams']
        function branchPrepService(BranchResource,$stateParams) {
            return BranchResource.getBranch({branchId: $stateParams.branchId}).$promise;
        }

                WaitersLimitPrepService.$inject = ['WaitersLimitResource']
        function WaitersLimitPrepService(WaitersLimitResource) {
            return WaitersLimitResource.getWaitersLimit().$promise;
        }
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('branchController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal', 'BranchResource','ActivateBranchResource','DeactivateBranchResource','branchsPrepService','ToastService',  branchController])

    function branchController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal, BranchResource,ActivateBranchResource,DeactivateBranchResource,branchsPrepService,ToastService){

        var vm = this;
		vm.branches = branchsPrepService;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[5].children[0]).addClass("active")

				function refreshBranches(){
			var k = BranchResource.getAllBranches({ page:vm.currentPage }).$promise.then(function(results) {
				vm.Now = $scope.getCurrentTime();	
				vm.branches = results;
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshBranches();
		}
		vm.openBranchDialog = function(){		
			if($scope.selectedLanguage != appCONSTANTS.defaultLanguage)
			{
				var englishBranches;
				var k = BranchResource.getAllBranches({pagesize:0, lang: appCONSTANTS.defaultLanguage}).$promise.then(function(results) {
					englishBranches = results;
					var modalContent = $uibModal.open({
						templateUrl: './app/RestaurantAdmin/templates/editBranch.html',
						controller: 'editBranchDialogController',
						controllerAs: 'editBranchDlCtrl',
						resolve:{
							mode:function(){return "map"},
							englishBranches: function(){return englishBranches.results;},
							branch:function(){ return null},
							callBackFunction:function(){return refreshBranches;}
						}

											});
				});
			}
			else{
				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newBranch.html',
					controller: 'branchDialogController',
					controllerAs: 'branchDlCtrl',
					resolve:{
						callBackFunction:function(){return refreshBranches;}
					}

									});
			}
		}
		function confirmationDelete(itemId){
			BranchResource.deleteBranch({branchId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('CategoryDeleteSuccess'),"success");
				refreshBranches();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeleteBranchDialog = function(name,id){			
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

				vm.openEditBranchDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editBranch.html',
				controller: 'editBranchDialogController',
				controllerAs: 'editBranchDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishBranches: function(){return null;},
					branch:function(){ return vm.branches.results[index]},
					callBackFunction:function(){return refreshBranches;}
				}

							});

					}
		vm.Activate = function(branch){
			ActivateBranchResource.Activate({branchId:branch.branchId})
			.$promise.then(function(result){
				branch.isActive = true;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

		vm.Deactivate = function(branch){
			DeactivateBranchResource.Deactivate({branchId:branch.branchId})
			.$promise.then(function(result){
				branch.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}		



							}

	}
    ());
(function() {
    angular
      .module('home')
      .factory('BranchResource', ['$resource', 'appCONSTANTS', BranchResource])
      .factory('ActivateBranchResource', ['$resource', 'appCONSTANTS', ActivateBranchResource])
      .factory('DeactivateBranchResource', ['$resource', 'appCONSTANTS', DeactivateBranchResource]);

      function BranchResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Branches/:branchId', {}, {
        getAllBranches: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        getBranch: { method: 'GET', useToken: true },
        create: { method: 'POST', useToken: true },
        deleteBranch: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }
    function ActivateBranchResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Branches/:branchId/Activate', {}, {
          Activate: { method: 'GET', useToken: true}
        })
    }
    function DeactivateBranchResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Branches/:branchId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }
}());
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('branchDialogController', ['$scope','$state','appCONSTANTS','$http','$translate' , 'BranchResource','ToastService','$rootScope',  branchDialogController])

	function branchDialogController($scope, $state , appCONSTANTS,$http, $translate , BranchResource,ToastService,$rootScope){
		var vm = this;
        vm.language = appCONSTANTS.supportedLanguage;

        		vm.close = function(){
            $state.go('branch');            
		}
		vm.isChanged = false;
		vm.AddNewBranch = function(){
			vm.isChanged = true;
            var newBranch = new BranchResource();
            newBranch.branchTitleDictionary = vm.branchTitleDictionary;
            newBranch.branchAddressDictionary = vm.branchAddressDictionary;
            newBranch.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('BranchAddSuccess'),"success");
					 vm.isChanged = false;                     
                     $state.go('branch');                     
                },
                function(data, status) {
                    vm.isChanged = false;                     
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
        }

        	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editBranchDialogController', ['$scope','$state','$http','$translate','appCONSTANTS', 'BranchResource','ToastService','branchPrepService',  editBranchDialogController])

	function editBranchDialogController($scope, $state ,$http, $translate,appCONSTANTS, BranchResource,ToastService, branchPrepService,callBackFunction){
		var vm = this;
		vm.categoryName = "";
		vm.language = appCONSTANTS.supportedLanguage;

				vm.branch = branchPrepService;

				vm.close = function(){
			$state.go('branch');
		}

				vm.updateBranch = function(){
            var updateBranch = new BranchResource();
            updateBranch.branchTitleDictionary = vm.branch.branchTitleDictionary;
            updateBranch.branchAddressDictionary = vm.branch.branchAddressDictionary;
			updateBranch.branchId = vm.branch.branchId;

						updateBranch.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('BranchUpdateSuccess'),"success");
					 vm.isChanged = false;                     
					 $state.go('branch');
                },
                function(data, status) {
                    vm.isChanged = false;                     
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );

                    }

        	}	
})();
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('BackgroundController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal','BackgroundResource', 'ActivatebackgroundResource','DeactivateBackgroundResource','backgroundsPrepService','ToastService',  BackgroundController])

    function BackgroundController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal,BackgroundResource, ActivatebackgroundResource,DeactivateBackgroundResource,backgroundsPrepService,ToastService){

        var vm = this;
		vm.Backgrounds = backgroundsPrepService;
		console.log(vm.Backgrounds);
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")	
		$($('.pmd-sidebar-nav').children()[3].children[0]).addClass("active")

				function refreshBackgrounds(){
			var k = BackgroundResource.getAllBackgrounds({page:vm.currentPage }).$promise.then(function(results) {
				vm.Backgrounds = results
				console.log(vm.Backgrounds);
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshBackgrounds();
		}
		vm.openbackgroundDialog = function(){		

			 				var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newBackground.html',
					controller: 'backgroundDialogController',
					controllerAs: 'backgroundCtrl',
					resolve:{ 
						callBackFunction:function(){return refreshBackgrounds;
						}
					}

									});

		 		}
		function confirmationDelete(itemId){
			backgroundResource.deletebackground({backgroundId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('backgroundDeleteSuccess'),"success");
				refreshBackgrounds();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });
		}
		vm.openDeletebackgroundDialog = function(name,id){			
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

				vm.openEditbackgroundDialog = function(index){
			var modalContent = $uibModal.open({
				templateUrl: './app/RestaurantAdmin/templates/editbackground.html',
				controller: 'editbackgroundDialogController',
				controllerAs: 'editbackgroundDlCtrl',
				resolve:{
					mode:function(){return "edit"},
					englishBackgrounds: function(){return null;},
					background:function(){ return vm.Backgrounds.results[index]},
					callBackFunction:function(){return refreshBackgrounds;}
				}

							});

					}
		vm.Activate = function(background){
			ActivatebackgroundResource.Activate({BackgroundId:background.backgroundId})
			.$promise.then(function(result){
				background.isActive = true;
				refreshBackgrounds();
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}

		vm.Deactivate = function(background){
			DeactivatebackgroundResource.Deactivate({backgroundId:background.backgroundId})
			.$promise.then(function(result){
				background.isActive = false;
			},
			function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
			})
		}		



							}

	}
    ());
(function() {
    angular
      .module('home')
      .factory('BackgroundResource', ['$resource', 'appCONSTANTS', BackgroundResource]) 
      .factory('ActivatebackgroundResource', ['$resource', 'appCONSTANTS', ActivatebackgroundResource])
      .factory('DeactivateBackgroundResource', ['$resource', 'appCONSTANTS', DeactivateBackgroundResource]) 

      function BackgroundResource($resource, appCONSTANTS) {  
              return $resource(appCONSTANTS.API_URL + 'Backgrounds/GetAllBackground', {}, { 
                getAllBackgrounds: { method: 'GET', useToken: true, params:{lang:'@lang'} }
        })
    }


      function ActivatebackgroundResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Backgrounds/:BackgroundId/Activate', {}, {
          Activate: { method: 'GET', useToken: true}
        })
    }
    function DeactivateBackgroundResource($resource, appCONSTANTS) {
        return $resource(appCONSTANTS.API_URL + 'Backgrounds/:BackgroundId/DeActivate', {}, {
          Deactivate: { method: 'GET', useToken: true }
        })
    }
}());
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('backgroundDialogController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS' , 'BackgroundResource','ToastService','callBackFunction','$rootScope',  backgroundDialogController])

	function backgroundDialogController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS , BackgroundResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		vm.menuName = "";
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}

				vm.AddNewbackground = function(){
            var newbackground = new Object();
            newbackground.backgroundName = vm.backgroundName; 

			var model = new FormData();
			model.append('data', JSON.stringify(newbackground));
			model.append('file', backgroundImage);
			$http({
				method: 'POST',
				url: appCONSTANTS.API_URL + 'Backgrounds/',
				useToken: true,
				headers: { 'Content-Type': undefined },
				data: model
			}).then(
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('backgroundAddSuccess'),"success"); 
					 $uibModalInstance.dismiss('cancel');
					 callBackFunction();
				},
				function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
				}
            );
        }

                vm.LoadUploadImage = function() {
			$("#backgroundImage").click();
		}
		var backgroundImage; 
		$scope.AddbackgroundImage = function(element) {
			var imageFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (imageFile && imageFile.size >= 0 && ((imageFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(imageFile.type) !== -1) {
					$scope.newbackgroundForm.$dirty=true;
					$scope.$apply(function() {

												backgroundImage= imageFile;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.backgroundImage= reader.result;

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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('categoryController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal','GetCategoriesResource', 'CategoryResource','ActivateCategoryResource','DeactivateCategoryResource','categoriesPrepService','ToastService',  categoryController])

    function categoryController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal,GetCategoriesResource, CategoryResource,ActivateCategoryResource,DeactivateCategoryResource,categoriesPrepService,ToastService){

        var vm = this;
		vm.categories = categoriesPrepService;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active") 

				function refreshCategories(){
			var k = GetCategoriesResource.getAllCategories({ MenuId: $stateParams.menuId,page:vm.currentPage }).$promise.then(function(results) {
				vm.Now = $scope.getCurrentTime();	
				vm.categories = results;
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
(function() {
    angular
      .module('home')
      .factory('CategoryResource', ['$resource', 'appCONSTANTS', CategoryResource])
      .factory('GetCategoriesResource', ['$resource', 'appCONSTANTS', GetCategoriesResource])
      .factory('GetCategoriesNameResource', ['$resource', 'appCONSTANTS', GetCategoriesNameResource])
      .factory('ActivateCategoryResource', ['$resource', 'appCONSTANTS', ActivateCategoryResource])
      .factory('DeactivateCategoryResource', ['$resource', 'appCONSTANTS', DeactivateCategoryResource]);

      function CategoryResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId', {}, {
        getCategory: { method: 'GET', useToken: true },
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
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('categoryDialogController', ['$scope','$state','$stateParams','$http','$translate','appCONSTANTS' , 'CategoryResource','ToastService','$rootScope',  categoryDialogController])

	function categoryDialogController($scope, $state,$stateParams ,$http, $translate,appCONSTANTS , CategoryResource,ToastService,$rootScope){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Category', {menuId: $stateParams.menuId});
		}
		vm.isChanged = false;
		vm.AddNewCategory = function(){
			vm.isChanged = true;
            var newCategroy = new Object();
            newCategroy.categoryNameDictionary = vm.categoryNameDictionary;
            newCategroy.menuId = $stateParams.menuId;

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
					 vm.isChanged = false;
					 $state.go('Category', {menuId: $stateParams.menuId});
				},
				function(data, status) {
					vm.isChanged = false;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editCategoryDialogController', ['$scope','$state','$stateParams','$http','$translate','appCONSTANTS','ToastService','categoryPrepService',  editCategoryDialogController])

	function editCategoryDialogController($scope, $state , $stateParams,$http, $translate,appCONSTANTS,ToastService,  categoryPrepService){
		var vm = this;

				vm.language = appCONSTANTS.supportedLanguage;
		vm.category = categoryPrepService;
		vm.close = function(){
			$state.go('Category', {menuId: $stateParams.menuId});
		}

				vm.updateCategory = function(){
            var updateCategory = new Object();
            updateCategory.categoryNameDictionary = vm.category.categoryNameDictionary;
			updateCategory.isImageChange = isImageChange;
			updateCategory.categoryId = vm.category.categoryId;
			updateCategory.menuId = vm.category.menuId;


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
                    $state.go('Category', {menuId: $stateParams.menuId});
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
							vm.category.imageURL= reader.result;
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
(function () {
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
		$('.pmd-sidebar-nav>li>a').removeClass("active")	
		$($('.pmd-sidebar-nav').children()[4].children[0]).addClass("active")
        function loadCategory(){
            if(vm.selectedMenu != null){

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
					ToastService.show("right","bottom","fadeInUp",$translate.instant('TemplateUpdateSuccessfuly'),"success");
                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
        }


    }

	}
());(function() {
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
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('editItemController', ['$scope','$http','$translate' ,'$stateParams' ,'appCONSTANTS', '$state', 'ItemResource','ToastService', 'itemPrepService','ItemSizePrepService',  'ItemSideItemPrepService', editItemController])

	function editItemController($scope,$http,$translate ,$stateParams ,appCONSTANTS, $state, ItemResource,ToastService, itemPrepService, ItemSizePrepService, ItemSideItemPrepService){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.item = itemPrepService;		
		vm.item.imageURL2 = vm.item.imageURL +"?type=orignal2&date="+ $scope.getCurrentTime();
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
            updatedItem.itemNameDictionary = vm.item.itemNameDictionary;
			updatedItem.itemDescriptionDictionary = vm.item.itemDescriptionDictionary;
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
			updatedItem.isImage2Change = isItemImage2Change;

			var model = new FormData();
			model.append('data', JSON.stringify(updatedItem));
			model.append('file', itemImage);
			model.append('file2', itemImage2);
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

		vm.LoadUploadLogo2 = function() {
			$("#itemImage2").click();
		}
		var itemImage2; 
		var isItemImage2Change = false;
		$scope.AddItemImage2 = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newItemForm.$dirty=true;
					$scope.$apply(function() {

												itemImage2 = logoFile;
						isItemImage2Change = true;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.item.imageURL2= reader.result;

														$scope.$apply();
						};
						if (logoFile) {
							reader.readAsDataURL(logoFile);
						}
					})
				} else {
					$("#logoImage2").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (logoFile) {
					$("#logoImage2").val('');
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
		vm.CheckMaxSideItemValue();


	}	
}());
(function () {
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
(function() {
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
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('newItemController', ['$scope','$translate','$http','$stateParams', 'appCONSTANTS' ,'$state','ToastService' ,'TranslateItemResource' , 'ItemSizePrepService' ,'ItemSideItemPrepService', 'defaultItemsPrepService',  newItemController])

	function newItemController($scope,$translate,$http ,$stateParams, appCONSTANTS, $state,ToastService, TranslateItemResource, ItemSizePrepService,ItemSideItemPrepService ,defaultItemsPrepService){
		var vm = this;

				vm.language = appCONSTANTS.supportedLanguage;

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

				vm.isChanged = false;

				vm.addNewItem = function(){
			vm.isChanged = true;

						var newItem = new Object();
            newItem.itemNameDictionary = vm.itemNameDictionary;
			newItem.itemDescriptionDictionary = vm.itemDescriptionDictionary;
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
			model.append('file', itemImage2);
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
					vm.isChanged = false;

									},
				function(data, status) {
					vm.isChanged = false;					
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

		vm.LoadUploadLogo2 = function() {
			$("#itemImage2").click();
		}
		var itemImage2; 
		$scope.AddItemImage2 = function(element) {
			var logoFile = element[0];

			var allowedImageTypes = ['image/jpg', 'image/png', 'image/jpeg']

			if (logoFile && logoFile.size >= 0 && ((logoFile.size / (1024 * 1000)) < 2)) {

				if (allowedImageTypes.indexOf(logoFile.type) !== -1) {
					$scope.newItemForm.$dirty=true;
					$scope.$apply(function() {

												itemImage2= logoFile;
						var reader = new FileReader();

						reader.onloadend = function() {
							vm.itemImage2= reader.result;

														$scope.$apply();
						};
						if (logoFile) {
							reader.readAsDataURL(logoFile);
						}
					})
				} else {
					$("#logoImage2").val('');
					ToastService.show("right","bottom","fadeInUp",$translate.instant('imageTypeError'),"error");
				}

			} else {
				if (logoFile) {
					$("#logoImage2").val('');
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('menuController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'MenuResource','menusPrepService','RestaurantIsReadyPrepService','ToastService','ActivateMenuResource','DeactivateMenuResource','PublishRestaurantResource',  menuController])

    function menuController($scope ,$translate , appCONSTANTS,$uibModal, MenuResource,menusPrepService,RestaurantIsReadyPrepService,ToastService,ActivateMenuResource,DeactivateMenuResource,PublishRestaurantResource){

        var vm = this;
		vm.menus = menusPrepService;
		vm.RestaurantIsReady = RestaurantIsReadyPrepService.isReady;
		vm.Now = $scope.getCurrentTime();
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[0].children[0]).addClass("active")

				function refreshMenu(){
			var k = MenuResource.getAllMenus({page:vm.currentPage}).$promise.then(function(results) {
				vm.Now = $scope.getCurrentTime();	
				vm.menus = results;
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
			MenuResource.deleteMenu({menuId:itemId}).$promise.then(function(results) {
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
(function() {
    angular
      .module('home')
      .factory('MenuResource', ['$resource', 'appCONSTANTS', MenuResource])
      .factory('ActivatedMenuResource', ['$resource', 'appCONSTANTS', ActivatedMenuResource])
      .factory('ActivateMenuResource', ['$resource', 'appCONSTANTS', ActivateMenuResource])
      .factory('DeactivateMenuResource', ['$resource', 'appCONSTANTS', DeactivateMenuResource])
      .factory('CheckRestaurantReadyResource', ['$resource', 'appCONSTANTS', CheckRestaurantReadyResource])
      .factory('PublishRestaurantResource', ['$resource', 'appCONSTANTS', PublishRestaurantResource]);

      function MenuResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Menus/:menuId', {}, {
        getAllMenus: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        getMenu: { method: 'GET', useToken: true, },
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
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('editMenuDialogController', ['$scope','$http', '$state','appCONSTANTS','$translate', 'MenuResource','ToastService','menuPrepService',  editMenuDialogController])

	function editMenuDialogController($scope,$http, $state , appCONSTANTS, $translate, MenuResource,ToastService, menuPrepService){
		var vm = this;
		vm.menuName = "";
		vm.language = appCONSTANTS.supportedLanguage;
		vm.menu = menuPrepService;
		vm.close = function(){
			$state.go('Menu');
		}

				vm.updateMenu = function(){
			var updateMenu  = new Object();
            updateMenu.menuNameDictionary = vm.menu.menuNameDictionary;
			updateMenu.isImageChange = isImageChange;
			updateMenu.menuId = vm.menu.menuId;

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
                    $state.go('Menu');
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
							vm.menu.imageURL= reader.result;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('menuDialogController', ['$scope','$http','$state','appCONSTANTS','$translate' , 'MenuResource','ToastService','$rootScope',  menuDialogController])

	function menuDialogController($scope,$http , $state , appCONSTANTS, $translate , MenuResource,ToastService,$rootScope){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('Menu');
		}
		vm.isChanged = false;

				vm.AddNewMenu = function(){
			vm.isChanged = true;
            var newMenu = new Object();
            newMenu.menuNameDictionary = vm.menuNameDictionary;

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
					 $state.go('Menu');
					 vm.isChanged = false;
				},
				function(data, status) {
					vm.isChanged = false;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('itemOrderController', ['$scope','$stateParams','$translate', 'appCONSTANTS','$uibModal' ,'allMenuPrepService','GetCategoriesNameResource','GetItemsResource','ToastService','ItemOrderResource','UpdateItemOrderResource',  itemOrderController])

    function itemOrderController($scope,$stateParams ,$translate , appCONSTANTS,$uibModal ,allMenuPrepService,GetCategoriesNameResource,GetItemsResource,ToastService,ItemOrderResource,UpdateItemOrderResource){
		var vm = this;



			        vm.menus = allMenuPrepService;
		vm.selectedMenu = vm.menus[0];
		vm.categoryItems = [];
		vm.sortingLog = [];
		vm.sortingLogId = [];
		vm.isChanged = true;
		$('.pmd-sidebar-nav>li>a').removeClass("active")	
		$($('.pmd-sidebar-nav').children()[6].children[0]).addClass("active")
        function loadCategory(){
            if(vm.selectedMenu != null){

                            GetCategoriesNameResource.getAllCategoriesName({ MenuId: vm.selectedMenu.menuId })
            .$promise.then(function(results) {
                vm.categories = results;                
                vm.selectedTemplates = [];
                vm.page=1; 
                vm.selectedCategory = vm.categories[0];
				vm.selectedTemplateId= 0;

								vm.changeCategory();

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
			vm.isChanged = true;
			ItemOrderResource.getAllItemOrder({ categoryId: vm.selectedCategory.categoryId})
            .$promise.then(function(results) {
				vm.categoryItems = results.templates; 
				console.log(vm.categoryItems);               
                vm.selectedTemplates = [];
                vm.page=1; 
                vm.selectedTemplateId= 0;
				vm.isChanged = false;  
				asd()
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.message,"error");
            });

                    }		

				vm.sortableOptions = {
			placeholder: "app",
			connectWith: ".apps-container"
		  };


		  		  vm.Save = function(){
			vm.isChanged = true;			
			  console.log(vm.categoryItems);
			  var itemOrder = [];
			  var count = 1;
			  vm.categoryItems.forEach(function(element) {
				  element.itemModels.forEach(function(item) {
					itemOrder.push({itemId: item.itemID,orderNumber:count});
					count++;
				  }, this);
			  }, this);
			  var itemOrderResource = new UpdateItemOrderResource();
			  itemOrderResource.itemNames = itemOrder;
			  itemOrderResource.$updateOrder().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('OrderItemUpdateSuccess'),"success");
					 vm.isChanged = false;                     

					                 },
                function(data, status) {
                    vm.isChanged = false;                     
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		  }

		  vm.error = false;
		  function asd(){
			vm.categoryItems.forEach(function(element) {
				$scope.$watch(function () { return element.itemModels.length  },function(newVal,oldVal){
					vm.error = false;
					vm.categoryItems.forEach(function(element) {
						if(element.itemModels.length > element.itemCount){
							vm.error =true;
							return false;
						}
						else
						{
							if(!vm.error)
							vm.error = false;		
						}
					}, this);
				 })

						}, this);
		  }
		  vm.isValid = function(){
			vm.categoryItems.forEach(function(element) {
				if(element.itemModels.length > element.itemCount){
					vm.error =true;
					return false;
				}
				else
				{
					vm.error = false;		
				}
			}, this);
			vm.error = false;
			return false;
		  }
	}

	}
    ());
(function() {
    angular
      .module('home')
      .factory('ItemOrderResource', ['$resource', 'appCONSTANTS', ItemOrderResource])
      .factory('UpdateItemOrderResource', ['$resource', 'appCONSTANTS', UpdateItemOrderResource])  

      function ItemOrderResource($resource, appCONSTANTS) {  
              return $resource(appCONSTANTS.API_URL + 'Categories/:categoryId/Items/Templates', {}, { 
                getAllItemOrder: { method: 'GET', useToken: true }
        })
    }

    function UpdateItemOrderResource($resource, appCONSTANTS) {  
        return $resource(appCONSTANTS.API_URL + 'Items/Order', {}, { 
          updateOrder: { method: 'PUT', useToken: true,isArray: true }
  })
}

   }());
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('sizeController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'SizeResource','sizesPrepService','ToastService',  sizeController])

    function sizeController($scope ,$translate , appCONSTANTS,$uibModal, SizeResource,sizesPrepService,ToastService){

        var vm = this;
		vm.sizes = sizesPrepService;
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[1].children[0]).addClass("active")

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
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
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
(function() {
    angular
      .module('home')
      .factory('SizeResource', ['$resource', 'appCONSTANTS', SizeResource]);

      function SizeResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Sizes/:sizeId', {}, {
        getAllSizes: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        getSize: { method: 'GET', useToken: true },
        create: { method: 'POST', useToken: true },
        deleteSize: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }

      }());
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('editSizeDialogController', ['$state', 'appCONSTANTS','$translate', 'SizeResource','ToastService','sizePrepService',  editSizeDialogController])

	function editSizeDialogController($state, appCONSTANTS, $translate, SizeResource,ToastService, sizePrepService){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.size = sizePrepService;
		vm.close = function(){
			$state.go('size');
		}

				vm.updateSize = function(){
			var updateSize = new SizeResource();
			updateSize.sizeNameDictionary = vm.size.sizeNameDictionary;
			updateSize.sizeId = vm.size.sizeId;
            updateSize.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('UpdateSizeSuccess'),"success");
					$state.go('size');

					                },
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
}());
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('sizeDialogController', ['$state', 'appCONSTANTS','$translate' , 'SizeResource','ToastService','$rootScope',  sizeDialogController])

	function sizeDialogController($state, appCONSTANTS, $translate , SizeResource,ToastService,$rootScope){
		var vm = this;
		vm.language = appCONSTANTS.supportedLanguage;
		vm.close = function(){
			$state.go('size');
		}
		vm.isChanged = false;
		vm.AddNewSize = function(){
			vm.isChanged = true;
			var newSize = new SizeResource();
            newSize.sizeNameDictionary = vm.sizeNameDictionary;
            newSize.$create().then(
                function(data, status) {
					vm.isChanged = false;
					ToastService.show("right","bottom","fadeInUp",$translate.instant('sizeAddSuccess'),"success");
					$state.go('size');
                },
                function(data, status) {
					vm.isChanged = false;
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
})();
(function () {
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
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
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
(function() {
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
  (function () {
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
		vm.isChanged = false;
		vm.AddNewSideItem = function(){
            vm.isChanged = true;
			var newSideItem = new SideItemResource();
            newSideItem.sideItemName = vm.sideItemName;
            newSideItem.value = vm.value;
            newSideItem.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('SideItemAddSuccess'),"success");
					$uibModalInstance.dismiss('cancel');
                    callBackFunction();
                    vm.isChanged = false;
                },
                function(data, status) {
                    vm.isChanged = false;
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
		}
	}	
}());
(function () {
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('WaiterController', ['$scope','$translate', 'appCONSTANTS','$uibModal', 'WaiterResource' ,'BranchResource','waitersPrepService', 'WaitersLimitPrepService', 'ToastService',  WaiterController])

    function WaiterController($scope ,$translate , appCONSTANTS,$uibModal, WaiterResource , BranchResource ,waitersPrepService, WaitersLimitPrepService,ToastService){

        var vm = this;
		vm.waiters = waitersPrepService;
		vm.waitersLimit = WaitersLimitPrepService.waiterLimit;
		console.log(WaitersLimitPrepService)
		$('.pmd-sidebar-nav>li>a').removeClass("active")
		$($('.pmd-sidebar-nav').children()[2].children[0]).addClass("active")

				function refreshWaiter(){
			var k = WaiterResource.getAllWaiters({page:vm.currentPage}).$promise.then(function(results) {
				vm.waiters = results
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
            });
		}
		vm.currentPage = 1;
        vm.changePage = function (page) {
            vm.currentPage = page;
            refreshWaiter();
		}
		vm.openWaiterDialog = function(){		
			var branches;
			var k = BranchResource.getAllBranches({pagesize:0}).$promise.then(function(results) {
				branches = results;

								var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/newWaiter.html',
					controller: 'waiterDialogController',
					controllerAs: 'waiterDlCtrl',
					resolve:{
						branches: function(){return branches.results;},
						callBackFunction:function(){return refreshWaiter;}
					}

										});
			});
        }
		function confirmationDelete(itemId){
			WaiterResource.deleteWaiter({waiterId:itemId}).$promise.then(function(results) {
				ToastService.show("right","bottom","fadeInUp",$translate.instant('WaiterDeleteSuccess'),"success");
				refreshWaiter();
			},
            function(data, status) {
				ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
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

			var branches;
			var k = BranchResource.getAllBranches({pagesize:0}).$promise.then(function(results) {
				branches = results;

								var modalContent = $uibModal.open({
					templateUrl: './app/RestaurantAdmin/templates/editWaiter.html',
					controller: 'editWaiterDialogController',
					controllerAs: 'editWaiterDlCtrl',
					resolve:{
						mode:function(){return "edit"},
						waiter:function(){ return waiter},
						branches: function(){return branches.results;},
						callBackFunction:function(){return refreshWaiter;}
					}

									});
			});

					}


							}

	}
());
(function() {
    angular
      .module('home')
      .factory('WaiterResource', ['$resource', 'appCONSTANTS', WaiterResource])
      .factory('WaitersLimitResource', ['$resource', 'appCONSTANTS', WaitersLimitResource]);

      function WaiterResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Waiters/:waiterId', {}, {
        getAllWaiters: { method: 'GET', useToken: true, params:{lang:'@lang'} },
        create: { method: 'POST', useToken: true },
        deleteWaiter: { method: 'DELETE', useToken: true },
        update: { method: 'PUT', useToken: true }
      })
    }

    function WaitersLimitResource($resource, appCONSTANTS) {
      return $resource(appCONSTANTS.API_URL + 'Waiters/Limit', {}, {
        getWaitersLimit: { method: 'GET', useToken: true ,transformResponse: function (data) {return {waiterLimit: angular.fromJson(data)} }},
      })
    }

      }());
  (function () {
    'use strict';

	    angular
        .module('home')
        .controller('waiterDialogController', ['$uibModalInstance','$translate' , 'WaiterResource','ToastService', 'branches','callBackFunction','$rootScope',  waiterDialogController])

	function waiterDialogController($uibModalInstance, $translate , WaiterResource,ToastService,branches,callBackFunction,$rootScope){
		var vm = this;
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		vm.Branches = branches;
		if(branches.length>0){
			vm.selectedBranch = branches[0];
		}

				vm.AddNewWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.userName;
            newWaiter.name = vm.name;
			newWaiter.password = vm.password;
			newWaiter.branchId = vm.selectedBranch.branchId;
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
(function () {
    'use strict';

	    angular
        .module('home')
        .controller('editWaiterDialogController', ['$uibModalInstance','$translate', 'WaiterResource','ToastService','waiter', 'branches','callBackFunction',  editWaiterDialogController])

	function editWaiterDialogController($uibModalInstance, $translate, WaiterResource,ToastService,  waiter, branches, callBackFunction){
		var vm = this;
		vm.menuName = "";
        vm.waiter = waiter;
        vm.waiter.confirmPassword = waiter.password;
        vm.close = function(){
			$uibModalInstance.dismiss('cancel');
        }
        vm.Branches = branches;
		if(branches.length>0){
            branches.forEach(function(element) {
                if(element.branchId == vm.waiter.branchId){
                    vm.selectedBranch = element;
                }
            }, this);
		}
		vm.updateWaiter = function(){
			var newWaiter = new WaiterResource();
            newWaiter.userName = vm.waiter.userName;
            newWaiter.name = vm.waiter.name;
            newWaiter.password = vm.waiter.password;
            newWaiter.userId = waiter.userId;
            newWaiter.branchId = vm.selectedBranch.branchId;
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
