angular.module('home').directive('pageTemplate1', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: { pageitems: '=' ,itemdetails: '=' },
        templateUrl: "./app/items/Templates/itemTemplate1.html",
        controller:function($scope,$localStorage,OfflineDataResource){
            console.log($scope.itemdetails)
            $scope.lang = $localStorage.language;
            if(navigator.onLine){
                $scope.now = new Date(Date.now()).toISOString()
            }
            else{
                $scope.now = OfflineDataResource.getLastUpdate();
            }
            $scope.viewItemDetail=function(item){
                $scope.$parent.$parent.$parent.itemdetails = item;

                
            }      
        }
        
    };
});