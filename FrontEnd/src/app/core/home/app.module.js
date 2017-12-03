(function() {
  'use strict';
  angular.module('home', ['core']) 
  .factory('Data', function(){
    var data =
        {
            FirstName: ''
        };
    
    return {
        getFirstName: function () {
            return data.FirstName;
        },
        setFirstName: function (firstName) {
            data.FirstName = firstName;
        }
    };
});
}());
