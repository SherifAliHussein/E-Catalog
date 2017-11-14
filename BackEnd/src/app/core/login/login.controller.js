(function() {
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

}())