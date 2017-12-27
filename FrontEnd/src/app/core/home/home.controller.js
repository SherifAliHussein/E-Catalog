(function () {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope', '$translate', '$scope', 'HomeResource', 'ResturantResource', 'appCONSTANTS', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'CartIconService', 'totalCartService','$location', '$window', homeCtrl])


    function homeCtrl($rootScope, $translate, $scope, HomeResource, ResturantResource, appCONSTANTS, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService,CartIconService,  totalCartService,$location,$window) {
        // Event listener for state change.
        if ($location.protocol() !== 'https') {
            $window.location.href = $location.absUrl().replace('http', 'https');
        }

        var vm = this;
        vm.total = 0;
        $scope.$watch(function () { return CartIconService.cartIcon }, function (newValue) {
            $scope.cartIcon = newValue;
        });

        $scope.$watch(function () { return totalCartService.homeTotalNo }, function (newValue) {
            $scope.homeTotalNo = newValue;
        });
   

        var storedNames = JSON.parse(localStorage.getItem("checkOut"));
        vm.cart = storedNames;
        if (vm.cart != null) {
            for (var i = 0; i < vm.cart.length; i++) {
                var product = vm.cart[i];
                vm.total += (product.size.price * product.itemobj.count);
            }
            if (vm.total != 0) {
                $scope.homeTotalNo = vm.total;
                $scope.disabled = true;
            } else
                $scope.disabled = false;
        }
        // $scope.$watch(function () { return Data.getFirstName(); }, function (newValue, oldValue) {
        //     if (newValue !== oldValue)
        //     {
        //          $scope.homeTotalNo = newValue;
        //           $scope.disabled = true;
        //     }
        // });

       // if (navigator.onLine) {
            var k = ResturantResource.getResturantGlobalInfo().$promise.then(function (results) {

                $scope.globalInfo = results


            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });
       // }
        var vm = this;
        $scope.emailEmpty = false;
        $scope.passwordEmpty = false;
        $scope.languages = [{
            id: "en",
            display: "AR"
        },
        {
            id: "ar",
            display: "EN"
        }];
        if ($localStorage.language == null) {
            $scope.selectedLanguage = $scope.languages[0].id;
            // $scope.displayLanguage = $scope.languages[0].display;
            $localStorage.language = $scope.selectedLanguage;
        }
        else {
            $scope.selectedLanguage = $localStorage.language;
            // $scope.displayLanguage = $localStorage.language.display;
        }

        $translate.use($scope.selectedLanguage);
        $scope.init =
            function () {
                $scope.user = authorizationService.getUser();
            }
        $scope.init();

        $scope.submit = function (username, password) {

            authorizationService.isPasswordchanged = false;
            $('#passwordChanged').hide();
            //  $('#userInActivated').hide();
            if (!username)
                $scope.emailEmpty = true;
            if (!password)
                $scope.passwordEmpty = true;;
            if (username && password) {
                $scope.afterSubmit = false;
                $scope.emailEmpty = $scope.passwordEmpty = false;
                authenticationService.authenticate(username, password).then(loginSuccess, loginFailed)
                //.error(loginFailed);;
            } else {
                $scope.afterSubmit = false;
            }
        };

        $scope.reloadPage = true;
        $rootScope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
            if (fromState.name != "" && $scope.reloadPage) {
                e.preventDefault();
                $scope.reloadPage = false;
                $state.go(toState.name, toParams, { reload: true });
            }
        });

        $scope.$watch(function () { return $localStorage.authInfo; }, function (newVal, oldVal) {
            if (oldVal != undefined && newVal === undefined && $localStorage.authInfo == undefined) {
                console.log('logout');
                $state.go('login');
            }
            if (oldVal === undefined && newVal !== undefined && $localStorage.authInfo != undefined) {
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
            $scope.restaurantInActiveUser = false;
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
                    $scope.restaurantInActiveUser = false;
                    $scope.PackageExpired = false;
                    $scope.PackageNotActivated = false;
                    $scope.AccountDeActivated = false;
                    
                }
                if (response.data.error == "inactive user" || response.data.error =="Account deleted") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = true;
                    $scope.restaurantInActiveUser = false;
                    $scope.PackageExpired = false;
                    $scope.PackageNotActivated = false;
                    $scope.AccountDeActivated = false;
                    
                }
                if (response.data.error == "restaurant deactivated") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = false;
                    $scope.restaurantInActiveUser = true;
                    $scope.PackageExpired = false;
                    $scope.PackageNotActivated = false;
                    $scope.AccountDeActivated = false;
                    
                }
                if (response.data.error == "Package Expired") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = false;
                    $scope.restaurantInActiveUser = false;
                    $scope.PackageExpired = true;
                    $scope.PackageNotActivated = false;   
                    $scope.AccountDeActivated = false;                 
                }
                if (response.data.error == "Package Not Activated") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = false;
                    $scope.restaurantInActiveUser = false;
                    $scope.PackageExpired = false;
                    $scope.PackageNotActivated = true;
                    $scope.AccountDeActivated = false;
                }
                if (response.data.error == "Account deactivated") {
                    $scope.invalidLoginInfo = false;
                    $scope.inActiveUser = false;
                    $scope.restaurantInActiveUser = false;
                    $scope.PackageExpired = false;
                    $scope.PackageNotActivated = false;
                    $scope.AccountDeActivated = true;
                }
            }
            if (response == null) {
                $scope.invalidLoginInfo = false;
                $scope.inActiveUser = true;
                $scope.restaurantInActiveUser = false;
            }
        }

        $scope.logout = function () {
           
            $scope.homeTotalNo = 0; 
                        $scope.$watch("homeTotalNo", function (newValue) {
                            totalCartService.homeTotalNo = newValue;
                        });
                         localStorage.removeItem('checkOut');
            $scope.globalInfo='';
               authorizationService.logout();
            $state.go('login');
        }
        $scope.reset = function () {
            $scope.invalidLoginInfo = false;
            $scope.inActiveUser = false;
        }
        $scope.isLoggedIn = function () {
            return authorizationService.isLoggedIn();
        }
        $scope.changeLanguage = function (language) {
            $scope.selectedLanguage = language;
            $localStorage.language = $scope.selectedLanguage;
            $state.reload();
            $translate.use(language);
        }
        
    }
}


());
