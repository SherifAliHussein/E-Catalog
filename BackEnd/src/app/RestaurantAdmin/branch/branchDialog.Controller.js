(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('branchDialogController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS' , 'BranchResource','ToastService','callBackFunction','$rootScope',  branchDialogController])

	function branchDialogController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS , BranchResource,ToastService,callBackFunction,$rootScope){
		var vm = this;
		
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		vm.isChanged = false;
		vm.AddNewBranch = function(){
			vm.isChanged = true;
            var newBranch = new BranchResource();
            newBranch.branchTitle = vm.branchTitle;
            newBranch.branchAddress = vm.branchAddress;
            newBranch.$create().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('BranchAddSuccess'),"success");
					 vm.isChanged = false;                     
                    $uibModalInstance.dismiss('cancel');
					callBackFunction();
                },
                function(data, status) {
                    vm.isChanged = false;                     
					ToastService.show("right","bottom","fadeInUp",data.data.message,"error");
                }
            );
        }
        
	}	
}());
