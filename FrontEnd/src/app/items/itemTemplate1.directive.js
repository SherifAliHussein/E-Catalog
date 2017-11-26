angular.module('home').directive('pageTemplate1', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: { pageitems: '=' ,itemdetails: '=' },
        templateUrl: "./app/items/Templates/itemTemplate1.html",
        link:function(scope, element, attrs){
            scope.viewItemDetail=function(item){
                scope.itemdetails = item;
            }    
        }
        
    };
});