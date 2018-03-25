(function () {
    'use strict';

    angular
        .module('home')
        .controller('homeCtrl', ['$rootScope', '$translate', '$scope', 'HomeResource', 'ResturantResource', 'appCONSTANTS', '$state', '_', 'authenticationService', 'authorizationService', '$localStorage', 'userRolesEnum', 'ToastService', 'CartIconService', 'totalCartService','$location', '$window', 'FeedBackResource','$filter','OfflineDataResource','ItemsResource','$timeout', homeCtrl])


    function homeCtrl($rootScope, $translate, $scope, HomeResource, ResturantResource, appCONSTANTS, $state, _, authenticationService, authorizationService, $localStorage, userRolesEnum, ToastService,CartIconService,  totalCartService,$location,$window, FeedBackResource,$filter,OfflineDataResource,ItemsResource,$timeout) {
        // Event listener for state change.
        // if ($location.protocol() !== 'https') {
        //     $window.location.href = $location.absUrl().replace('http', 'https');
        // }

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
           if(authorizationService.isLoggedIn()){
            var k = ResturantResource.getResturantGlobalInfo().$promise.then(function (results) {

                $scope.globalInfo = results


            },
                function (data, status) {
                    ToastService.show("right", "bottom", "fadeInUp", data.message, "error");
                });

           }
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
           
               $translate.use(appCONSTANTS.defaultLanguage); 
               $localStorage.language = appCONSTANTS.defaultLanguage;
            $scope.selectedLanguage = appCONSTANTS.defaultLanguage;
            
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
            $translate.use(language);
            $state.reload();
            // $route.reload();
        }
        
        $scope.rate = 0;
        $scope.createBy = "";
        $scope.comment = "";
        $scope.feedbacks= [] ;
        $scope.page = 1;
        $scope.getAllComments = function(){
            $scope.rate = 0;
            $scope.createBy = "";
            $scope.comment = "";
            $scope.page = 1;
            if(navigator.onLine){                
            ResturantResource.getResturantGlobalInfo().$promise.then(function (results) {
                $scope.globalInfo = results
            });

           
            FeedBackResource.getAllFeedBack({pagesize:4}).$promise.then(function (results) {
                $scope.feedbacks = results;
                
                $scope.feedbacks.results.forEach(function(element) {
                    element.createTime = element.createTime+"z"
                    element.createTime = $filter('date')(new Date(element.createTime), "dd/MM/yyyy hh:mm a");
                    
                }, this);
            },
            function (data, status) {

             });
            }
            else{
                var allFeedBack = OfflineDataResource.get("feedbacks");
                $scope.feedbacks.results = allFeedBack.slice(0, 4);
                $scope.feedbacks.nextPageURL = 4;
                var allRates = $filter('filter')(allFeedBack, { rate: '!0' });
                var rate = 0;
                allRates.forEach(function(element) {
                    if(element != null){
                        rate += element.rate;
                    }
                }, this);
                $scope.globalInfo.rate = rate/allRates.length;
            }
                
        }
        $scope.getMoreComments = function(){
            $scope.page ++;
            if(navigator.onLine){
                FeedBackResource.getAllFeedBack({page:$scope.page,pagesize:4}).$promise.then(function (results) {
                    
                    results.results.forEach(function(element) {
                        element.createTime = element.createTime+"z"
                        element.createTime = $filter('date')(new Date(element.createTime), "dd/MM/yyyy hh:mm a");
                        
                    }, this);
                    $scope.feedbacks.results = $scope.feedbacks.results.concat(results.results);
                    $scope.feedbacks.nextPageURL = results.nextPageURL;
                },
                function (data, status) {
                    // $scope.feedbacks.results = $scope.feedbacks.results.concat(results.results);
                    // $scope.feedbacks.nextPageURL = results.nextPageURL;
                 });
            }
            else{
                var allFeedBack = OfflineDataResource.get("feedbacks");
                $scope.feedbacks.results = $scope.feedbacks.results.concat(allFeedBack.slice($scope.feedbacks.nextPageURL, $scope.feedbacks.nextPageURL+4));
                $scope.feedbacks.nextPageURL = $scope.feedbacks.nextPageURL+4;
                if($scope.feedbacks.nextPageURL >= allFeedBack.length)
                $scope.feedbacks.nextPageURL = null;
            }
                
        }   
        // $window.addEventListener("offline", function() {
        //     $state.reload();
        // }, false);
        
        $window.addEventListener("online", function() {
      //  $scope.$watch(function () { return navigator.onLine }, function (newValue) {
        $timeout(function(){
            
            if (navigator.onLine) {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready.then(function (reg) {
                        FeedBackResource.getAllFeedBack({pagesize:0}).$promise.then(function (results) {
                            results.results.forEach(function(element) {
                                element.createTime = element.createTime+"z"
                                element.createTime = $filter('date')(new Date(element.createTime), "dd/MM/yyyy hh:mm a");
                                
                            }, this);
                            OfflineDataResource.setAllData("feedbacks",results.results);
                        },
                        function (data, status) {
    
                        });
                    })
                }
                var allFeedBack = OfflineDataResource.get("newFeedbacks");
                if(allFeedBack!= null && allFeedBack.length>0){
                    allFeedBack.forEach(function(element) {
                        if(element != null){
                            var newComment = new FeedBackResource();
                            newComment.rate = element.rate;
                            newComment.createBy = element.createBy;
                            newComment.comment = element.comment;
                            newComment.createTime = element.createTime;
                            newComment.$createFeedBack();
                        }
                    }, this);
                    OfflineDataResource.setAllData("newFeedbacks",null);
                }

                var likeItem = OfflineDataResource.get("itemLike");
                if(likeItem!= null && likeItem.length>0){
                    likeItem.forEach(function(element) {
                        if(element != null){
                            ItemsResource.likeItem({itemId:element});
                        }
                    }, this);
                    OfflineDataResource.setAllData("itemLike",null);
                }

                var disLikeItem = OfflineDataResource.get("itemDisLike");
                if(disLikeItem!= null && disLikeItem.length>0){
                    disLikeItem.forEach(function(element) {
                        if(element != null){
                            ItemsResource.dislikeItem({itemId:element});
                        }
                    }, this);
                    OfflineDataResource.setAllData("itemDisLike",null);
                }
            }
        },3000);
        
        }, false);
        
        $scope.applyComment = function(rate,createBy,comment)
        {
            if(navigator.onLine){
                var newComment = new FeedBackResource();
                newComment.rate = rate;
                newComment.createBy = createBy;
                newComment.comment = comment;
                newComment.createTime = (new Date()).toISOString();
                newComment.$createFeedBack();
            }
            else{
                var newFeedBack = [];
                newFeedBack.push({rate:rate,createBy:createBy,comment:comment,createTime: $filter('date')(new Date(), "dd/MM/yyyy hh:mm a")})
                var allFeedBack = newFeedBack.concat(OfflineDataResource.get("feedbacks"));
                OfflineDataResource.setAllData("feedbacks",allFeedBack);
                
                var feedBackCopy = angular.copy(newFeedBack)
                feedBackCopy[0].createTime = (new Date()).toISOString();
                feedBackCopy = feedBackCopy.concat(OfflineDataResource.get("newFeedbacks"));
                OfflineDataResource.setAllData("newFeedbacks",feedBackCopy);
                
            }
            
        }
    }
}


());
