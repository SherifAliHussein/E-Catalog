angular.module('home').directive('flipbook', function(){
    return{
      restrict: 'E',
      replace: true,
      scope: { itempagectrl: '=' ,itemdetails:'='},
      compile: function(){
        return{
          pre: function(scope, iElement, iAttrs, controller){
            var element = $('.text_editor').children();
            // debugger\\
            element.jqte({
              // On focus show the toolbar
              focus: function () {
                 element.parents(".jqte").find(".jqte_toolbar").show();
                 element.parents(".jqte").click(function () { element.parents(".jqte").find(".jqte_toolbar").show(); });
                  scope.$apply(function () {
                     
                  });
              },
              // On blur hide the toolar
              blur: function () {
                element.parents(".jqte").find(".jqte_toolbar").hide();
                  scope.$apply(function () {
                      
                  });
              },
              // On change refresh the model with the textarea value
              change: function () {
                ngModel.$setViewValue(element.parents(".jqte").find(".jqte_editor")[0].innerHTML);
                  scope.$apply(function () {
                      
                  });
              }
            });
            element.parents(".jqte").find(".jqte_toolbar").hide();
          },
          post: function(scope, iElement, iAttrs, controller) {
            iElement.turn({
             
              pages: 8
            })
           
          }
              
        }
      },
      controller: function($scope, $rootScope){
        $scope.hide_book = function(){
          console.log("hide_book");
          $rootScope.show_book = false;
        }
        
      },
      templateUrl: "./app/items/Templates/ItemList.html"
    }
  });