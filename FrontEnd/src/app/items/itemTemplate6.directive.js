angular.module('home').directive('pageTemplate6', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: { pageitems: '=' ,itemdetails: '=' },
        templateUrl: "./app/items/Templates/itemTemplate6.html",
        controller:function($scope,$localStorage,OfflineDataResource){
            if(navigator.onLine){
                $scope.now = new Date(Date.now()).toISOString()
            }
            else{
                $scope.now = OfflineDataResource.getLastUpdate();
            }
            $scope.lang = $localStorage.language;            
            $scope.viewItemDetail=function(item){
                $scope.$parent.$parent.$parent.itemdetails = item;                
            }    
        }
        
    };
});