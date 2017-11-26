(function () {
    'use strict';
	
    angular
        .module('home')
        .controller('ItemController', ['$scope','$translate', '$stateParams', 'appCONSTANTS','categoryItemsTemplatePrepService' ,  ItemController])

    function ItemController($scope,$translate,$stateParams, appCONSTANTS ,categoryItemsTemplatePrepService){
		
        var vm = this;
        vm.vv = "sadasda"
		vm.catgoryTemplates = categoryItemsTemplatePrepService;
        console.log(vm.catgoryTemplates);
        
        // vm.viewItemDetails=function(item){
        //     console.log(item)
        //     vm.itemDetails = categoryItemsTemplatePrepService.templates[0].itemModels[0];
        // }
	}
	
}
());
