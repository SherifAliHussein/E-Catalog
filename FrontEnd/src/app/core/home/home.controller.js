(function() {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope','$translate', '$scope','HomeResource', 'ResturantResource', 'appCONSTANTS',  '$state',  '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService','Data', homeCtrl])
      
        
    function homeCtrl($rootScope, $translate, $scope, HomeResource,ResturantResource,appCONSTANTS, $state, _,authenticationService, authorizationService,$localStorage, userRolesEnum,ToastService,Data) {
        // Event listener for state change.
        $scope.disabled = false;
        
        $scope.$watch(function () { return Data.getFirstName(); }, function (newValue, oldValue) {
            if (newValue !== oldValue)
            {
                 $scope.homeTotalNo = newValue;
                  $scope.disabled = true;
            }
        });

        var k = ResturantResource.getResturantGlobalInfo().$promise.then(function (results) {
          
           $scope.globalInfo = results 
            
        },
        function (data, status) {
            ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
        }); 
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
		$scope.init =
            function() {
				$scope.user = authorizationService.getUser();
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
            if ($scope.user.role != userRolesEnum.Waiter) {    
                authorizationService.logout();
                $state.go('login');

				// $state.go('menu');

            } else {
				$state.go('menu');

			} 

        }

        function loginFailed(response) {
            $scope.afterSubmit = true;
            
            // $scope.invalidLoginInfo = true;
            if (response) {
                if (response.data.error == "invalid grant") {
                    $scope.invalidLoginInfo = true;
                    $scope.inActiveUser = false;
                }
                if (response.data.error == "inactive user") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = true;
                }
            }
            if (response == null) {
                $scope.invalidLoginInfo = false;
                $scope.inActiveUser = true;
            }
        }

        $scope.logout = function() {
            authorizationService.logout();
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
		
		
    }

    
}());
