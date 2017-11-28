angular.module('home').directive('pageTemplate1', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: { pageitems: '=' ,itemdetails: '=' },
        templateUrl: "./app/items/Templates/itemTemplate1.html",
        controller:function($scope){
            console.log($scope.itemdetails)
            $scope.viewItemDetail=function(item){
                $scope.$parent.$parent.$parent.itemdetails = item;


                
            }    
        }
        
    };
});