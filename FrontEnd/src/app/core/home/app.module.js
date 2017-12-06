(function() {
  'use strict';
  angular.module('home', ['core']) 
 
  .service('CartIconService', function() {
    this.cartIcon = true;
  })  
.service('totalCartService', function() {
    this.homeTotalNo = 0;
  });
  ;
  
}());
