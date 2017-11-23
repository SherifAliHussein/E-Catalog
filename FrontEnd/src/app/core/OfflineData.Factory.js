(function() {
    angular
        .module('home')
        .factory('OfflineDataResource',['$localStorage', OfflineDataResource]);

    function OfflineDataResource($localStorage) {
        var categories;
        return {
            setAllData: function(allMenus) {

                $localStorage.offlineData = allMenus
            },

            getMenus: function() {
                return $localStorage.offlineData
            },
            getAllCategories:function(menuId){
                
                $localStorage.offlineData.forEach(function(menu) {
                    if(menu.menuId == menuId){
                        categories =  menu.categoryModels;    
                    }
                }, this);
                return categories;
                // return $localStorage.offlineData[menuId];
            },
            getAllItems:function(categoryId){
                var items;
                categories.forEach(function(category) {
                    if(category.categoryId == categoryId){
                        items =  category.categoryPageTemplateModel;    
                    }
                }, this);
                return items;
                // return $localStorage.offlineData[menuId];
            }
            
        }

    }


}());
