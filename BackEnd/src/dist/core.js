(function() {
    'use strict';

    angular
    .module('core', [
    		'ngResource',
        'ui.router',
        //'ngMaterial',
        'ngStorage',
      'permission',
      'bw.paging',
      //'angular-progress-arc',
      'ui.event',
      'ngProgressLite',
    'ui.bootstrap',
    'pascalprecht.translate',
    'ui.sortable',
    ]);
}());
;(function() {
  'use strict';

  angular
  .module('home', [
  'core'
  ]);
 
}());
;(function() {
  'use strict';

  angular
      .module('core')
      // registering 'lodash' as a constant to be able to inject it later
      .constant('_', window._)
      .run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
      })
/*      .config(function($mdThemingProvider, $mdIconProvider) {
        // angular material design configs
        $mdIconProvider
            .defaultIconSet('./assets/svg/avatars.svg', 128);

        // use default purble color for now - uncomment to change colors
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('orange');
      })*/;

      
}());
;(function() {
	angular
		.module('core')
		.constant('appCONSTANTS', {
			 'API_URL': 'http://localhost:28867/api/',
			// 'API_URL': 'http://ecatalogbackend.azurewebsites.net/api/',
			'defaultLanguage':'en',
			'supportedLanguage':{
				'en-us':{'key':'en-us','value':'english'},
				'ar-eg':{'key':'ar-eg','value':'arabic'}
			}
		})
		.constant('messageTypeEnum', {
      success: 0,
      warning: 1,
      error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin:"GlobalAdmin",
			RestaurantAdmin:"RestaurantAdmin"
    });
}());;(function() {
    'use strict';

    angular
        .module('core')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            // main views
            $stateProvider
              .state('root', {
                    url: '/',
               
                    controller: 'loginController',
                   
                    data: {
                       permissions: {
                          
                        }
                    },
                 
                })
                .state('login', {
                    url: '/login',
                    templateUrl: './app/core/login/templates/login.html',
                    'controller': 'loginController'
                })
                .state('403', {
                    url: '/403',
                    templateUrl: './app/shell/403.html'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: './app/shell/404.html'
                })
                .state('401', {
                    url: '/401',
                    templateUrl: './app/shell/401.html'
                })
        });
    
}());
;
angular.module('core')
  .directive('equalto', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        otherModelValue: '=equalto'
      },
      link: function(scope, element, attributes, ngModel) {

        ngModel.$validators.equalto = function(modelValue) {
          return modelValue == scope.otherModelValue.$modelValue;
        };
        scope.$watch('otherModelValue.$modelValue', function() {
          ngModel.$validate();
        },true);

      }
    };
  });
;(function() {
  'use strict';

  angular
  .module('core').config(["$translateProvider","appCONSTANTS",function($translateProvider,appCONSTANTS){
        
        var en_translations = {
            "restaurantType" : "Restaurant types",
            "restaurant" : "Restaurants",
            "Name" : "Name",
            "englishName" : "English Name",
            "arabicName" : "Arabic Name",
            "AddType": "Add new type",
            "NoRestaurantTypesAvailable":"There is no restaurant types.",
            "saveChangesBtn":"save changes",
            "DiscardBtn":"Discard",
            "NewRestaurantTypeLbl":"New restaurant type",
            "requiredErr":"required",
            "UpdateRestaurantTypeLbl":"Update restaurant type",
            "deleteConfirmationLbl":" Are you sure you want delete ",
            "deleteBtn":"Delete",
            "cancelBtn":"cancel",
            "DescriptionLbl":"Description",
            "englishDescriptionLbl":"English Description",
            "arabicDescriptionLbl":"Arabic Description",
            "AddRestaurantBtn":"Add new restaurant",
            "NoRestaurantAvailable":"There is no restaurants.",
            "LogoLbl":"logo",
            "TypeLbl":"Type",
            "AdminUserLbl":"Admin email",
            "AdminUserPasswordLbl":"Admin password",
            "WaiterUserPasswordLbl":"Waiter password",
            "ActivateBtn":"Activate",
            "DeActivateBtn":"DeActivate",
            "NewRestaurantLbl":"New restaurant",
            "UpdateRestaurantLbl":"Update restaurant",
            "restaurantTypesLbl" : "Restaurant Type",
            "restaurantDeleteSuccess":"restaurant deleted successfully.",
            "restaurantUpdateSuccess":"restaurant updated successfully.",
            "restaurantAddSuccess":"restaurant added successfully.",
            "UploadBtn":"select logo",
            "imgaeSizeError":"Maximum size allowed is 2MB",
            "imageTypeError":"Only (.jpeg, .bmp, .png) extensions are allowed.",
            "AddMenuBtn": "Add new menu",
            "NoMenusAvailable":"There is no menus.",
            "UpdateMenuLbl":"Update Menu",
            "NewMenuLbl":"New menu type",
            "Menu":"Menu",
            "menuAddSuccess":"Menu added successfully.",
            "menuDeleteSuccess":"Menu deleted successfully.",
            "menuUpdateSucess":"Menu updated successfully.",
            "CategoriesBtn":"View Categories",
            "AddCategoryBtn":"Add new category",
            "NoCategoryAvailable":"There is no categories.",
            "Imagelbl":"Image",
            "newCategoryLbl":"New Category",
            "CategoryAddSuccess":"Category added successfully.",
            "UpdateCategoryLbl":"Update Category",
            "UploadImageBtn":"Select Image",
            "CategoryupdateSuccess":"Category updated successfully.",
            "CategoryDeleteSuccess":"Category deleted successfully.",
            "size":"Sizes",
            "AddSizeBtn":"Add new size",
            "NoSizesAvailable":"there is no sizes.",
            "sizeAddSuccess":"Size added successfully.",
            "NewSizeLbl":"New size",
            "UpdateSizeLbl":"Update size",
            "UpdateSizeSuccess":"Size updated successfully.",
            "SizeDeleteSuccess":"Size deleted successfully.",
            "NameLengthError":"Name length must be 3-40 characters.",
            "SizeLengthError":"Name length must be 1-10 characters.",
            "DescLengthError":"Description length must be 3-300 characters.",
            "sideItem":"Side items",
            "value":"Value",
            "AddSideItemBtn":"Add new side item",
            "NoSideItemsAvailable":"there is no side items.",
            "SideItemAddSuccess":"Side item added successfully.",
            "NewSideItemLbl":"New side item",
            "UpdateSideItemLbl":"Update side item",
            "UpdateSideItemSuccess":"Side item updated successfully.",
            "SideItemDeleteSuccess":"Side item deleted successfully.",
            "english":"english",
            "arabic":"arabic",
            "logoutBtn":"Logout",
            "NoRestaurantDefault":"You must add restaurant in english first.",
            "status":"Status",
            "ItemsBtn":"View items",
            "NoItemAvailable":"there is no items.",
            "AddItemBtn":"Add new Item",
            "itemAddSuccess":"item added successfully.",
            "NewItemtLbl":"New item",
            "UpdateItemLbl":"Update item",
            "Pricelbl":"Price",
            "itemDeleteSuccess":"item deleted successfully.",
            "hasSizeLbl":"has Size?",
            "selectSizeLbl":"Select Size",
            "hasSideItemLbl":"has Side Item?",
            "selectSideItemLbl":"Select Side Item",
            "ItemUpdateSuccess":"item updated successfully.",
            "MaxValueLbl":"Maximum value for side items",
            "ReadyLbl":"Ready",
            "RestaurantTypeDeleteMessage":"all restaurants under this type will be deleted",
            "RestaurantTypeAddSuccess":"restaurant type added successfully.",
            "RestaurantTypeUpdateSuccess":"restaurant type updated successfully.",
            "ConfirmPasswordLbl":"Confirm password",
            "RestaurantTypeDeleteSuccess":"restaurant type deleted successfully.",
            "MaxSideItemValueError":"Must be in range for the minimum value and total value of side items",
            "waiter":"Waiter",
            "AddWaiterBtn":"Add new Waiter",
            "NoWaiterAvailable":"There is no waiters",
            "UserName":"User Name",
            "NewWaiterLbl":"New waiter",
            "UpdateWaiterLbl":"Update waiter",
            "WaiterDeleteSuccess":"Waiter deleted successfully.",
            "WaiterUpdateSuccess":"Waiter updated successfully.",
            "WaiterAddSuccess":"Waiter added successfully.",

            "background":"background",
            "AddbackgroundBtn":"Add new background",
            "NobackgroundAvailable":"There is no backgrounds",
            "UserName":"User Name",
            "NewbackgroundLbl":"New background",
            "UpdatebackgroundLbl":"Update background",
            "backgroundDeleteSuccess":"background deleted successfully.",
            "backgroundUpdateSuccess":"background updated successfully.",
            "backgroundAddSuccess":"background added successfully.",
            "CurrentBtn":"Current Background",
            "NotCurrentBtn":" Not", 

            "Template":"Template",
            "RecommendedMenuImage":"Recommended dimension 477 x 286",
            "RecommendedCategoryImage":"Recommended dimension 210 x 137",
            "RecommendedItemImage1":"Recommended dimension 423 x 139",
            "RecommendedItemImage2":"Recommended dimension 112 x 69", 
            "PriceLengthError":"Price length must be 1-5 Digts.",
            "RecommendedBackgroundImage":"Recommended dimension 1920 x 1200", 

            "Branch":"Branch",
            "AddBranchBtn":"Add Branch",
            "NoBranchAvailable":"There is no branches.",
            "newBranchLbl":"New Branch",
            "Title":"Title",
            "Address":"Address",
            "englishAddress":"English Address",
            "arabicAddress":"Arabic Address",
            "BranchAddSuccess":"Branch added successfuly.",
            "UpdateBranchLbl":"Update Branch",
            "BranchUpdateSuccess":"Branch Updated successfuly.",
            "NumOfUsersLbl":"number of waiters",
            "waitersLimitConsumedLbl":"consumed / limit waiters",
            "consumedAndTotal":"consumed / total",
            "TotalRemaining":"total / remaining",
            "OkLbl":"Ok",
            "pageLbl":"Page",
            "selectTemplate":"Select template for page",
            "selectedTemplates":"Selected templates",
            "startDatelbl":"Start date",
            "endDatelbl":"End date",
            "invalidEmail":"Invalid Email",
            "ConsumedMsg":"Consumed",
            "maximumMsg":"Maximum"
            
        }
        
        var ar_translations = {
            "restaurantType" : "أنواع المطاعم",
            "restaurant" : "مطاعم",
            "Name" : " الاسم",
            "englishName" : "الاسم انجليزي",
            "arabicName" : "الاسم عربي",
            "AddType": "اضف نوع جديد",
            "NoRestaurantTypesAvailable":".لا يوجد انواع مطعم",
            "saveChangesBtn":"حفظ",
            "DiscardBtn":"تجاهل",
            "NewRestaurantTypeLbl":"نوع مطعم جديد",
            "requiredErr":"مطلوب",
            "UpdateRestaurantTypeLbl":"تحديث نوع المطعم",
            "deleteConfirmationLbl":" هل انت متأكد انك تريد حذف ",
            "deleteBtn":"حذف",
            "cancelBtn":"إلغاء",
            "DescriptionLbl":"وصف",
            "englishDescriptionLbl":"وصف انجليزي",
            "arabicDescriptionLbl":"وصف انجليزي",
            "AddRestaurantBtn":"اضف مطعم جديد",
            "NoRestaurantAvailable":".لا يوجد مطاعم",
            "LogoLbl":"شعار",
            "TypeLbl":"نوع",            
            "AdminUserLbl":"بريد الاكتروني لالمشرف",
            "AdminUserPasswordLbl":"كلمة مرور المشرف",
            "WaiterUserPasswordLbl":"كلمة مرور النادل",
            "ActivateBtn":"تفعيل",
            "DeActivateBtn":"عطل",
            "NewRestaurantLbl":"مطعم جديد",
            "UpdateRestaurantLbl":"تحديث مطعم",
            "restaurantTypesLbl" : "نوع المطاعم",
            "restaurantDeleteSuccess":".تم حذف المطعم بنجاح",
            "restaurantUpdateSuccess":".تم تحديث المطعم بنجاح",
            "restaurantAddSuccess":".تم ادخال المطعم بنجاح",
            "UploadBtn":"اختار شعار",
            "AddMenuBtn": "اضف قائمه جديد",
            "NoMenusAvailable":".لا يوجد قائمه",
            "UpdateMenuLbl":"تحديث القائمه",
            "NewMenuLbl":"قائمه جديده",
            "Menu":"قائمه",
            "menuAddSuccess":".تم ادخال القائمه بنجاح",
            "menuDeleteSuccess":".تم حذف القائمه بنجاح",
            "menuUpdateSucess":".تم تحديث القاءمه بنجاح",
            "CategoriesBtn":"عرض الاقسام",
            "AddCategoryBtn":"اضف قسم جديد",
            "NoCategoryAvailable":".لا يوجد اقسام",
            "Imagelbl":"صوره",
            "newCategoryLbl":"قسم جديد",
            "CategoryAddSuccess":".تم ادخال القسم بنجاح",
            "UpdateCategoryLbl":"تحديث القسم",
            "UploadImageBtn":"اختار الصوره",
            "CategoryupdateSuccess":".تم تحديث القسم بنجاح",
            "CategoryDeleteSuccess":".تم حذف القسم بنجاح",
            "size":"احجام",
            "AddSizeBtn":"اضف حجم جديد",
            "NoSizesAvailable":".لا يوجد احجام",
            "sizeAddSuccess":".تم ادخال الحجم لنجاح",
            "NewSizeLbl":"حجم جديد",
            "UpdateSizeLbl":"تحديث الحجم",
            "UpdateSizeSuccess":".تم تحديث الحجم بنجاح",
            "SizeDeleteSuccess":".تم حذف الحجم بنجاح",
            "NameLengthError":".طول الاسم يجب من 3-40 حرف",
            "SizeLengthError":".طول المقاس يجب من 1-10 حرف",
            "DescLengthError":".طول الوصف يجب من 3-300 حرف",
            "sideItem":"طبق جانبى",
            "value":"قيمه",
            "AddSideItemBtn":"اضف طبق جانبي",
            "NoSideItemsAvailable":".لا يوجد اطباق جانبيه",
            "SideItemAddSuccess":".تم ادخال طبق جانبي بنجاح",
            "NewSideItemLbl":"طبق جانبي جديد",
            "UpdateSideItemLbl":"تحديث طبق جانبي",
            "UpdateSideItemSuccess":".تم تحديث الطبق الجانبيي بنجاح",
            "SideItemDeleteSuccess":".تم حذف طبق الجانبي بنجاح",
            "english":"انجليزي",
            "arabic":"عربي",
            "logoutBtn":"خروج",
            "NoRestaurantDefault":".يجب ادخال مطعم بالانجليزي",
            "NoSizeDefault":".يجب ادخال حجم بالانجليزي",
            "NoMenuDefault":".يجب ادخال قائمة بالانجليزي",
            "NoCategoryDefault":".يجب ادخال قسم بالانجليزي",
            "NoItemDefault":".يجب ادخال منتج بالانجليزي",
            "NoSideItemDefault":".يجب ادخال طبق جانبي بالانجليزي",
            "NoRestaurantTypeDefault":".يجب ادخال نوع مطعم بالانجليزي",
            "RestaurantNotTranslated":".مطعم ليس مترجم بالعربيه",
            "MenuNotTranslated":".قائمة ليس مترجم بالعربيه",
            "status":"الحالة",
            "ItemsBtn":"عرض منتجات",
            "NoItemAvailable":".لا يوجد منتاجات",
            "AddItemBtn":"اضف منتج جديد",
            "CategoryNotTranslated":".قسم ليس مترجم بالعربيه",
            "itemAddSuccess":".تم ادخال منتج بنجاح",
            "NewItemtLbl":"منتج جديد",
            "UpdateItemLbl":"تحديث المنتج",
            "Pricelbl":"السعر",
            "itemDeleteSuccess":".تم حذف المنتج بنجاح",
            "hasSizeLbl":"يوجد احجام؟",
            "selectSizeLbl":"اختار الحجم",
            "hasSideItemLbl":"يوجد اطباق جانبيه؟",
            "selectSideItemLbl":"اختار طبق جتنبي",
            "ItemUpdateSuccess":".تم تحديث المنتج بنجاح",
            "MaxValueLbl":"أقصى قيمه للأطباق الجانبيه",
            "ReadyLbl":"جاهز",
            "RestaurantTypeDeleteMessage":"سيتم حذف كل المطعام لهذا النوع",
            "RestaurantTypeAddSuccess":".تم ادخال نوع المطعم بنجاح",
            "RestaurantTypeUpdateSuccess":".تم تحديث نوع المطعم بنجاح",
            "ConfirmPasswordLbl":"تأكيد كلمه المرور",
            "RestaurantTypeDeleteSuccess":".تم حذف نوع المطعم بنجاح",
            "MaxSideItemValueError":"يجب ان تكون في نطاق اقل ومجموع قيمة الاطباق الجانبيه",
            "waiter":"نادل",
            "AddWaiterBtn":"اضف نادل جديد",
            "NoWaiterAvailable":".لا يوجد نوادل",
            "UserName":"اسم المستخدم",
            "NewWaiterLbl":"نادل جديد",
            "UpdateWaiterLbl":"تحديث نادل",
            "WaiterDeleteSuccess":".تم حذف نوع نادل بنجاح.",
            "WaiterUpdateSuccess":".تم تحديث النادل بنجاح.",
            "WaiterAddSuccess":".تم ادخال نادل بنجاح",

            "background":"خلفيه المنيو",
            "AddbackgroundBtn":"اضافه خلفيه المنيو",
            "NobackgroundAvailable":"لا يوجد خلفيه المنيو", 
            "NewbackgroundLbl":"خلفيه المنيو جديده",
            "UpdatebackgroundLbl":"تعديل خلفيه المنيو",
            "backgroundDeleteSuccess":"خلفيه المنيو.تم حذف",
            "backgroundUpdateSuccess":"خلفيه المنيو تم تحديث ",
            "backgroundAddSuccess":"خلفيه المنيو تم ادخال",
            "CurrentBtn":"الخلفيه الحاليه",
            "NotCurrentBtn":" ليست الخفيه الحاليه", 

            "Template":"نموذج",
            "RecommendedMenuImage":"477 x 286 البعد الموصى به",
            "RecommendedCategoryImage":"210 x 137 البعد الموصى به",            
            "RecommendedItemImage1":"423 x 139 البعد الموصى به",
            "RecommendedItemImage2":"112 x 69 البعد الموصى به",  
            "PriceLengthError":".طول السعر يجب من 1-5ارقام ",
                     
            "RecommendedBackgroundImage":"1920 x 1200 البعد الموصى به",

            "Branch":"فرع",
            "AddBranchBtn":"اضافه فرع",
            "NoBranchAvailable":".لا يوجد فروع",
            "newBranchLbl":"فرع جديد",
            "Title":"لقب",
            "Address":"عنوان",
            "englishAddress":"عنوان انجليزي",
            "arabicAddress":"عنوان عربي",
            "BranchAddSuccess":".تم ادخال الفرع بنجاح",
            "UpdateBranchLbl":"تحديث الفرع",
            "NoBranchDefault":".يجب ادخال فرع بالانجليزي",
            "BranchUpdateSuccess":".تم تحديث الفرع بنجاح",
            "NumOfUsersLbl":"عدد النوادل",
            "waitersLimitConsumedLbl":"المجموع النوادل / المستخدم",
            "consumedAndTotal":"المجموع / المستخدم",
            "TotalRemaining":"المتبقي / المجموع",
            "OkLbl":"تم",
            "pageLbl":"صفحه",
            "selectTemplate":"اختار نموذج لصفحه",
            "selectedTemplates":"النماذج المختاره",
            "startDatelbl":"Start date",
            "endDatelbl":"End date",
            "invalidEmail":"البريد الاكتروني غير صحيح",
            "ConsumedMsg":"المستخدمين",
            "maximumMsg":"الحد الاقصي"
        }
        
        $translateProvider.translations('en',en_translations);
        
        $translateProvider.translations('ar',ar_translations);
        
        $translateProvider.preferredLanguage(appCONSTANTS.defaultLanguage);
        
        }]);

}());
;(function() {
    angular
        .module('home')
        .factory('ToastService', ToastService);

    function ToastService() {
        return {
            show: function($positionX,$positionY,$dataEffect,$dataMessage,$dataType,$actionText,$action,$duration){
			
					
				if($(window).width() < 768){
					$positionX = "center";
				}else {
					$positionX = $positionX;
				}		

				if(!$(".pmd-alert-container."+ $positionX +"."+ $positionY).length){
					$('body').append("<div class='pmd-alert-container "+$positionX+" "+$positionY+"'></div>");
				}
					
				var $currentPath = $(".pmd-alert-container."+ $positionX +"."+ $positionY);
				function notificationValue(){
					if($action == "true"){
						if($actionText == null){
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>×</a></div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='true'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}else {
						if($actionText == null){
							$notification = "<div class='pmd-alert' data-action='false'>"+$dataMessage+"</div>";
						}else{
							$notification =  "<div class='pmd-alert' data-action='false'>"+$dataMessage+"<a href='javascript:void(0)' class='pmd-alert-close'>"+$actionText+"</a></div>";	
						}
						return $notification;
					}
				}
				var $notification = notificationValue();
				var boxLength = $(".pmd-alert-container."+ $positionX +"."+ $positionY + " .pmd-alert").length;
				
				if($(this).attr("data-duration") !== undefined){
					$duration = $(this).attr("data-duration");
				}else {
					$duration = 3000;
				}
				
				if (boxLength > 0) {
					if ($positionY == 'top') {
						$currentPath.append($notification);
					}
					else {
						$currentPath.prepend($notification);
					}
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}else {
					$currentPath.append($notification);
					$currentPath.width($(".pmd-alert").outerWidth());
					if($action == "true"){
						$currentPath.children("[data-action='true']").addClass("visible" +" "+ $dataEffect);	
					}else{
						$currentPath.children("[data-action='false']").addClass("visible" +" "+ $dataEffect).delay($duration).slideUp(
							function(){
								$(this).removeClass("visible" +" "+ $dataEffect).remove();
							});	
					}
					$currentPath.children(".pmd-alert").eq(boxLength).addClass($dataType);
				}
				var $middle = $(".pmd-alert").outerWidth() / 2;  
				$(".pmd-alert-container.center").css("marginLeft","-" + $middle+"px");
		}
		
        }

    }


}());
;(function () {
    'use strict';	
    angular
        .module('home')
        .controller('confirmDeleteDialogController', ['$uibModalInstance', 'itemName','itemId','message', 'callBackFunction',  confirmDeleteDialogController])

	function confirmDeleteDialogController($uibModalInstance, itemName,itemId,message, callBackFunction){
		var vm = this;
		vm.itemName = itemName;
		vm.message = message;
		vm.close = function(){
			$uibModalInstance.dismiss();
		}
		
		vm.Confirm = function(){
			callBackFunction(itemId);
			$uibModalInstance.dismiss();
        }
		
	}	
}());
;(function() {
    'use strict';

    angular
        .module('home')
        .controller('loginController', ['$rootScope', '$scope','$state','$localStorage','authorizationService','appCONSTANTS',loginController]);
   
    function loginController($rootScope, $scope,$state, $localStorage,authorizationService,appCONSTANTS) {
    
		if ($localStorage.authInfo) {  
			if ($localStorage.authInfo.Role  == "GlobalAdmin") {
				$state.go('restaurantType');

			} else if ($localStorage.authInfo.Role  == "RestaurantAdmin") {
				$state.go('Menu');

			} 
		}
		else
		{
			 $state.go('login');
		}
	}

}());(function() {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope','$translate', '$scope', 'appCONSTANTS',  '$state',  '_', 'authenticationService', 'authorizationService', '$localStorage', 'RestaurantInfoResource', homeCtrl])
       
    function homeCtrl($rootScope, $translate, $scope, appCONSTANTS, $state, _,authenticationService, authorizationService,$localStorage,RestaurantInfoResource) {
        
        var vm=this;
        $scope.emailEmpty = false;
        $scope.passwordEmpty = false;
		$scope.languages = [{
            id:"en",
            label:"english"
        },
        {
            id:"ar",
            label:"arabic"
        }];
		if($localStorage.language == null){
            $scope.selectedLanguage = $scope.languages[0].id;
            $localStorage.language = $scope.selectedLanguage;
        }
        else
            $scope.selectedLanguage = $localStorage.language;
            
        $translate.use($scope.selectedLanguage); 
        $scope.restaurantName = "";
		$scope.init =
            function() {
                $scope.user = authorizationService.getUser();
                if ($scope.user.role  == "RestaurantAdmin") {
                    RestaurantInfoResource.getRestaurantInfo().$promise.then(function(results) {
                       $scope.restaurantName = results.restaurantName;
                    },
                    function(data, status) {
                    });
    
                } 
            }
        $scope.init();
		
        $scope.submit = function(username, password) {
           
            authorizationService.isPasswordchanged=false;
            $('#passwordChanged').hide();
          //  $('#userInActivated').hide();
            if (!username)
                $scope.emailEmpty = true;
            if (!password)
                $scope.passwordEmpty = true;;
            if (username && password) {
                $scope.afterSubmit = false;
                $scope.emailEmpty = $scope.passwordEmpty = false;
                authenticationService.authenticate(username, password).then(loginSuccess,loginFailed)
                    //.error(loginFailed);;
            } else {
                $scope.afterSubmit = false;
            }
        };
		
        $scope.reloadPage = true;
        $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            if(fromState.name != "" && $scope.reloadPage){
                    e.preventDefault();
                    $scope.reloadPage = false;
                    $state.go(toState.name,toParams, { reload: true });
                }     
        });

		$scope.$watch(function () { return $localStorage.authInfo; },function(newVal,oldVal){
		   if(oldVal!=undefined && newVal === undefined && $localStorage.authInfo == undefined){
			 console.log('logout'); 
			   $state.go('login');
		  }
		  if(oldVal===undefined && newVal !== undefined&&$localStorage.authInfo != undefined){
			 console.log('login'); 
					$scope.user = authorizationService.getUser();
					loginSuccess()
			// authorizationService.isLoggedIn() && !location.href.contains('connect')
		  }
		})
        function loginSuccess(response) {
            $scope.afterSubmit = false;
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
            $scope.user = authorizationService.getUser();
            $scope.restaurantName = "";
            if ($scope.user.role == "GlobalAdmin") {
                $state.go('restaurantType');

            } else if ($scope.user.role  == "RestaurantAdmin") {
                $state.go('Menu');
                RestaurantInfoResource.getRestaurantInfo().$promise.then(function(results) {
                   $scope.restaurantName = results.restaurantName;
                },
                function(data, status) {
                });

            } 
            else  {
                authorizationService.logout();
                $state.go('login');
            } 

        }

        function loginFailed(response) {
            $scope.afterSubmit = true;
            
            // $scope.invalidLoginInfo = true;
            if (response) {
                if (response.data.error == "invalid grant") {
                    $scope.invalidLoginInfo = true;
                    $scope.inActiveUser = false;
                    $scope.AccountDeActivated = false;
                }
                if (response.data.error == "inactive user" || response.data.error == "Account deleted") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = true;
                    $scope.AccountDeActivated = false;                    
                }
                if (response.data.error == "Account deactivated") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = false;
                    $scope.AccountDeActivated = true;
                }
            }
            if (response == null) {
                $scope.invalidLoginInfo = false;
                $scope.inActiveUser = true;
            }
        }

        $scope.logout = function() {
            authorizationService.logout();
            $scope.restaurantName = "";
            $state.go('login');
        }
        $scope.reset = function() {
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
        }
        $scope.isLoggedIn = function() {
            return authorizationService.isLoggedIn();
        }
		$scope.changeLanguage = function(language){
			$scope.selectedLanguage = language;
			$localStorage.language = $scope.selectedLanguage;
            $state.reload();
            $translate.use(language); 
		}
		$scope.getCurrentTime = function(){
			return (new Date()).getTime()
		}
		
		
    }

    
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .constant('AUTH_EVENTS', {
      loginFailed : 'login-failed',
      loginSuccess : 'login-success',
      logoutSuccess : 'logout-success',
      refreshedToken : 'refresh-token-success',
      invalidToken : 'invalid-token',
      failedToAuthorize: 'not-authorized',
      invalidRefreshToken: 'refresh-token-failure',
      passwordChanged: 'password-changed'

    });
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authEventsHandlerService', authEventsHandlerService);

    authEventsHandlerService.$inject = ['$rootScope', 'AUTH_EVENTS', '$state'];

  function authEventsHandlerService($rootScope, AUTH_EVENTS, $state) {
    var factory = {
      initialize : initialize
    }

    return factory;

    function initialize() {
      $rootScope.$on(AUTH_EVENTS.logoutSuccess,logoutHandler);
    }

    function logoutHandler(){
      $state.go('login');
    }
  }
}());
;(function() {
  'use strict';

  angular
    .module('core')
    .factory('authenticationService', authenticationService);

  authenticationService.$inject = ['$injector', 'appCONSTANTS', 'authorizationService', 'AUTH_EVENTS', '$rootScope', '$q'];

  function authenticationService($injector, appCONSTANTS, authorizationService, AUTH_EVENTS, $rootScope, $q) {

    var factory = {
      authenticate: authenticate,
      getToken: getToken,
      isAuthenticated: isAuthenticated
    };

    return factory;

    function authenticate(email, password) {
      var credentials = {
        'username': email,
        'password': password
      }
      var request = requestToken(credentials, 'password');
      request.then(authenticated,authenticaionFailed);
      return request;
        
        //.error(authenticaionFailed);

    }


    function authenticated(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
      return data;
    }

    function authenticaionFailed(data) {
      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      return data;
    }

    function getToken(forceRefresh) {
      if(!isAuthenticated()){
        return $q.reject({
          status : 401
        });
      }
      var authInfo = authorizationService.getAuthInfo();
      var expirydate = new Date(authInfo['.expires']); 
      if (forceRefresh || new Date() >= expirydate) {
        return refreshToken(authInfo['refresh_token']).then(refreshedToken,function(){
         authorizationService.logout();
        });
      }
      var defer = $q.defer();
      defer.resolve(authInfo);
      return defer.promise;
    }

    function isAuthenticated() {
      return !!authorizationService.getAuthInfo();
    }

    function refreshToken(refreshToken) {
      var credentials = {
        'refresh_token': refreshToken
      };
      return requestToken(credentials, 'refresh_token');
    }

    function refreshedToken(response){
      $rootScope.$broadcast(AUTH_EVENTS.refreshedToken);
      authorizationService.setAuthInfo(response);
      return response.data;
    }


    function requestToken(credentials, grantType) {
      angular.extend(credentials, {
          //'client_id': vlCONSTANTS.API_Client_Id,
        'grant_type': grantType
      });

      var config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      var $http = $injector.get("$http");
	  var result = $http
        .post(appCONSTANTS.API_URL + "token", $.param(credentials), config);
		result.then(function(data){
          authorizationService.setAuthInfo(data);
        });
      return result;
        
    }
  }
})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('unAuthenticatedInterceptor', unAuthenticatedInterceptor);

    unAuthenticatedInterceptor.$inject = ['$q','$rootScope','AUTH_EVENTS'];

    function unAuthenticatedInterceptor($q,$rootScope,AUTH_EVENTS) {
      var factory = {
        responseError: responseErrorInterceptor
      };
      return factory;

      function responseErrorInterceptor(rejection) {
          if(rejection.status == 403) {
              $rootScope.$broadcast(AUTH_EVENTS.failedToAuthorize);
          }else if (rejection.status == 401) {
            if (rejection.data=="password changed") {
              $rootScope.$broadcast(AUTH_EVENTS.passwordChanged);
            }
            else {
              $rootScope.$broadcast(AUTH_EVENTS.invalidToken);
            }
          }
          else if (rejection.status == 406) {
              $rootScope.$broadcast(AUTH_EVENTS.invalidRefreshToken);
          }
          //  else if (rejection.status == 400) {
          //     $rootScope.$broadcast(AUTH_EVENTS.refresh-token-failure);
          // }
          
          return $q.reject(rejection);
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('unAuthenticatedInterceptor');
    }
  })();

})();
;(function() {
  'use strict';
  (function() {
    angular
      .module('core')
      .factory('useTokenInterceptor', useTokenInterceptor);

    useTokenInterceptor.$inject = ['authenticationService','$localStorage'];


    function useTokenInterceptor(authenticationService,$localStorage) {
      var tokenInterceptor = {
        request: requestInterceptor
      };
      return tokenInterceptor;

      function requestInterceptor(config) {
          if (config.useToken) {
            return authenticationService.getToken()
              .then(function(data){
                config.headers['Authorization'] = data['token_type'] + " " + data['access_token'];
				if(config.params== null || config.params.lang ==null)
					config.headers['Accept-Language'] = $localStorage.language;//"en";
				else
					config.headers['Accept-Language'] = config.params.lang;
                if (!config.headers.hasOwnProperty('Content-Type')) 
                {
                    config.headers['Content-Type'] = 'application/json';
                }
                return config;
              });

          }
          return config;
        }
    }


  })();



  //inject interceptor to $http
  (function() {
    angular
      .module("core")
      .config(config);

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
      $httpProvider.interceptors.push('useTokenInterceptor');
    }
  })();

})();
;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];

  function runBlock(PermissionStore, authorizationService, userRolesEnum) {
    PermissionStore
      .definePermission('GlobalAdmin', function () {
          return authorizationService.hasRole(String(userRolesEnum.GlobalAdmin));
      });
  }

}());
;(function() {
    'use strict';
  
    angular
      .module('core')
      .run(runBlock);
  
    runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];
  
    function runBlock(PermissionStore, authorizationService, userRolesEnum) {
      PermissionStore
        .definePermission('RestaurantAdmin', function () {
            return authorizationService.hasRole(String(userRolesEnum.RestaurantAdmin));
        });
    }
  
  }());
  ;(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore','authorizationService'];

  function runBlock (PermissionStore, authorizationService){
    PermissionStore
      .definePermission('anonymous',function(){
        return !authorizationService.isLoggedIn();
      });
  }

}());
;(function() {
  'use strict';

 
  angular
    .module('core')
    .factory('authorizationService', authorizationService);

  authorizationService.$inject = ['$rootScope', '$localStorage', 'AUTH_EVENTS'];

  function authorizationService($rootScope, $localStorage, AUTH_EVENTS) {
    var factory = {
      getAuthInfo: getAuthInfo,
      getUser: getUser,
      hasRole: hasRole,
      isLoggedIn: isLoggedIn,
      logout: logout,
      setAuthInfo: setAuthInfo,
      isDisabled: false,
      isPasswordchanged:false
    };

    return factory;

   
    function isLoggedIn() {
      return !!$localStorage.authInfo;
    }

    
    function getAuthInfo() {
      return $localStorage.authInfo;
    }

    
    function getUser() {
      var info = getAuthInfo();
      return {
        name: info? info.Username : "",
        role: info ? info.Role : "",
        id: info ? info.UserId : ""
      };
    }

   
    function hasRole(role) {
      if (!isLoggedIn()) {
        return false;
      }
      // return JSON.parse(getAuthInfo().Roles).indexOf(role) > -1;
      return getAuthInfo().Role == role;
    }
	
    function logout() {
      $localStorage.authInfo = undefined;
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    }

    function setAuthInfo(info) {
      $localStorage.authInfo = info.data;
      var currentDate = new Date();
      $localStorage.authInfo['expires_in'] = currentDate.setSeconds(currentDate.getSeconds() + $localStorage.authInfo['expires_in']);
    }
  }

}());
