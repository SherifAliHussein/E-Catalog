(function() {
  'use strict';

  angular
    .module('core')
    .run(runBlock);

  runBlock.$inject = ['PermissionStore', 'authorizationService', 'userRolesEnum'];

  function runBlock(PermissionStore, authorizationService, userRolesEnum) {
    PermissionStore
      .definePermission('GlobalAdmin', function () {
          return authorizationService.hasRole(String(userRolesEnum.GlobalAdmin));
      });
  }

}());
