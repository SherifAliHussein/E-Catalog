(function() {
	angular
		.module('core')
		.constant('appCONSTANTS', {
		//	  'API_URL': 'http://localhost:28867/api/',
			'API_URL': 'http://ecatalogbackend.azurewebsites.net/api/',
			'defaultLanguage':'en',
			'supportedLanguage':{
				'en-us':{'key':'en-us','value':'english'},
				'ar-eg':{'key':'ar-eg','value':'arabic'}
			}
		})
		.constant('messageTypeEnum', {
      success: 0,
      warning: 1,
      error: 2
		}).constant('userRolesEnum', {
			GlobalAdmin:"GlobalAdmin",
			RestaurantAdmin:"RestaurantAdmin"
    });
}());