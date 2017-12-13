(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('editBranchDialogController', ['$scope','$state','$uibModalInstance','$http','$translate','appCONSTANTS', 'BranchResource','ToastService','mode','englishBranches','branch','callBackFunction',  editBranchDialogController])

	function editBranchDialogController($scope, $state , $uibModalInstance,$http, $translate,appCONSTANTS, BranchResource,ToastService, mode, englishBranches, branch,callBackFunction){
		var vm = this;
		vm.categoryName = "";
		
		vm.mode = mode;
		vm.englishBranches = englishBranches;
		if(mode == "edit")
		{
            vm.branchTitle = branch.branchTitle;
            vm.branchAddress = branch.branchAddress;
        }
		else
            vm.selectedBranch = englishBranches[0];
        
		vm.close = function(){
			$uibModalInstance.dismiss('cancel');
		}
		
		vm.updateBranch = function(){
            var updateBranch = new BranchResource();
            updateBranch.branchTitle = vm.branchTitle;
            updateBranch.branchAddress = vm.branchAddress;
		
            if(mode == "edit"){
				updateBranch.branchId = branch.branchId;
				updateBranch.menuId = branch.menuId;
			}
			else{
				updateBranch.branchId = vm.selectedBranch.branchId;
				updateBranch.menuId = vm.selectedBranch.menuId;
				
			}
			updateBranch.$update().then(
                function(data, status) {
					ToastService.show("right","bottom","fadeInUp",$translate.instant('BranchUpdateSuccess'),"success");
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
})();
