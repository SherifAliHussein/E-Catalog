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

        backgroundsPrepService.$inject = ['BackgroundResource']
        function backgroundsPrepService(BackgroundResource) {
            return BackgroundResource.getAllBackgrounds().$promise; 
        }
}());
