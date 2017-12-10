angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/editRestaurant.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text">{{\'UpdateRestaurantLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newRestaurantForm">\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">       \n' +
    '				<label>{{\'restaurantTypesLbl\' | translate}}</label>\n' +
    '				<select required class="select-simple form-control pmd-select2" ng-model="editRestCtrl.restaurant.restaurantTypeId">\n' +
    '					<option ng-selected="editRestCtrl.restaurant.restaurantTypeId == item.id" \n' +
    '						ng-repeat="item in editRestCtrl.RestaurantType" \n' +
    '						ng-value="{{item.restaurantTypeId}}">{{item.typeName}}</option>\n' +
    '				</select>\n' +
    '				<div ng-if="editRestCtrl.RestaurantType.length <=0">{{\'NoRestaurantDefault\' | translate}} </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="restaurantName" ng-model="editRestCtrl.restaurant.restaurantName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantName.$error" >\n' +
    '					<div ng-if="newRestaurantForm.restaurantName.$error.required && !newRestaurantForm.restaurantName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantName.$error.minlength || newRestaurantForm.restaurantName.$error.maxlength) && !newRestaurantForm.restaurantName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'DescriptionLbl\' | translate}}</label>\n' +
    '				<textarea required  class="form-control" name="restaurantDescription" ng-model="editRestCtrl.restaurant.restaurantDescription" ng-minlength="3" ng-maxlength="300"></textarea>\n' +
    '				<div ng-messages="newRestaurantForm.restaurantDescription.$error" >\n' +
    '					<div ng-if="newRestaurantForm.restaurantDescription.$error.required && !newRestaurantForm.restaurantDescription.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantDescription.$error.minlength || newRestaurantForm.restaurantDescription.$error.maxlength) && !newRestaurantForm.restaurantDescription.$error.required">{{\'DescLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>			\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'AdminUserLbl\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="restaurantAdmin" ng-model="editRestCtrl.restaurant.restaurantAdminUserName">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantAdmin.$error" >\n' +
    '                    <div ng-if="newRestaurantForm.restaurantAdmin.$error.required && !newRestaurantForm.restaurantAdmin.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'AdminUserPasswordLbl\' | translate}}</label>\n' +
    '				<input required type="password" class="mat-input form-control" name="restaurantAdminPassword" ng-model="editRestCtrl.restaurant.restaurantAdminPassword" ng-minlength="8" ng-maxlength="25">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantAdminPassword.$error" >\n' +
    '					<div ng-if="newRestaurantForm.restaurantAdminPassword.$error.required && !newRestaurantForm.restaurantAdminPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantAdminPassword.$error.minlength || newRestaurantForm.restaurantAdminPassword.$error.maxlength) && !newRestaurantForm.restaurantAdminPassword.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >\n' +
    '				<label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '				<input required type="password" class="mat-input form-control" name="confirmPassword"  ng-model="editRestCtrl.confirmPassword" equalto="newRestaurantForm.restaurantAdminPassword" >\n' +
    '				<div ng-messages="newRestaurantForm.confirmPassword.$error" >\n' +
    '                    <div ng-if="newRestaurantForm.confirmPassword.$error.required && !newRestaurantForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                    <div ng-if="newRestaurantForm.confirmPassword.$error.equalto && !newRestaurantForm.confirmPassword.$error.required">Passwords don\'t match.</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >       \n' +
    '					<input id="logoImage" name="logoImage" style="display: none;" onchange="angular.element(this).scope().AddRestaurantLogo(this.files)" type="file" required>\n' +
    '					<button ng-click="editRestCtrl.LoadUploadLogo()" >{{\'UploadBtn\' | translate}}</button>\n' +
    '					<img ng-src="{{editRestCtrl.restaurant.logoURL}}" style="max-height: 200px;max-width: 200px;">\n' +
    '					<div ng-messages="newRestaurantForm.logoImage.$error" >\n' +
    '						<div ng-if="newRestaurantForm.logoImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '			\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newRestaurantForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editRestCtrl.updateRestaurant()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editRestCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/editType.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<button class="close" type="button" ng-click="editRestTypeDlCtrl.close()">×</button>\n' +
    '		<h2 class="pmd-card-title-text">{{\'UpdateRestaurantTypeLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editTypeForm">\n' +
    '			<div ng-if="editRestTypeDlCtrl.mode==\'map\'">\n' +
    '				<select required class="select-simple form-control pmd-select2" \n' +
    '						ng-options="item.typeName for item in editRestTypeDlCtrl.englishRestaurantType"  \n' +
    '						ng-model="editRestTypeDlCtrl.selectedType">\n' +
    '				</select>\n' +
    '				<div ng-if="editRestTypeDlCtrl.englishRestaurantType.length <=0">{{\'NoSideItemDefault\' | translate}} </div>                    				\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="typeName" ng-model="editRestTypeDlCtrl.typeName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="editTypeForm.typeName.$error" >\n' +
    '					<div ng-if="editTypeForm.typeName.$error.required && !editTypeForm.typeName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(editTypeForm.typeName.$error.minlength || editTypeForm.typeName.$error.maxlength) && !editTypeForm.typeName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editRestTypeDlCtrl.updateType()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editRestTypeDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/newRestaurant.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text" ng-if="rewRestCtrl.mode==\'new\'">{{\'NewRestaurantLbl\' | translate}}</h2>\n' +
    '		<h2 class="pmd-card-title-text" ng-if="rewRestCtrl.mode==\'map\'">{{\'UpdateRestaurantLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newRestaurantForm">\n' +
    '			<div ng-if="rewRestCtrl.mode==\'map\'">\n' +
    '				<select class="select-simple form-control pmd-select2"\n' +
    '					ng-options="item.restaurantName for item in rewRestCtrl.defaultRestaurant"  \n' +
    '					ng-model="rewRestCtrl.selectedRestaurant">\n' +
    '				</select>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-if="rewRestCtrl.mode==\'new\'">       \n' +
    '				<label>Restaurant Type</label>\n' +
    '				<select class="select-simple form-control pmd-select2" \n' +
    '					ng-options="item.typeName for item in rewRestCtrl.RestaurantType"  \n' +
    '					ng-model="rewRestCtrl.selectedType">\n' +
    '				</select>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="restaurantName" ng-model="rewRestCtrl.restaurantName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantName.$error" >\n' +
    '					<div ng-if="newRestaurantForm.restaurantName.$error.required && !newRestaurantForm.restaurantName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantName.$error.minlength || newRestaurantForm.restaurantName.$error.maxlength) && !newRestaurantForm.restaurantName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'DescriptionLbl\' | translate}}</label>\n' +
    '				<textarea required  class="form-control" name="restaurantDescription" ng-model="rewRestCtrl.restaurantDescription"  ng-minlength="3" ng-maxlength="300"></textarea>\n' +
    '				<div ng-messages="newRestaurantForm.restaurantDescription.$error" >\n' +
    '					<div ng-if="newRestaurantForm.restaurantDescription.$error.required && !newRestaurantForm.restaurantDescription.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantDescription.$error.minlength || newRestaurantForm.restaurantDescription.$error.maxlength) && !newRestaurantForm.restaurantDescription.$error.required">{{\'DescLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>			\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label" ng-if="rewRestCtrl.mode==\'new\'">\n' +
    '				<label for="first-name">{{\'AdminUserLbl\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="restaurantAdmin" ng-model="rewRestCtrl.restaurantAdmin">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantAdmin.$error" >\n' +
    '                    <div ng-if="newRestaurantForm.restaurantAdmin.$error.required && !newRestaurantForm.restaurantAdmin.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label" ng-if="rewRestCtrl.mode==\'new\'">\n' +
    '				<label for="first-name">{{\'AdminUserPasswordLbl\' | translate}}</label>\n' +
    '				<input required type="password" class="mat-input form-control" name="restaurantAdminPassword" ng-model="rewRestCtrl.restaurantAdminPassword" ng-minlength="8" ng-maxlength="25">\n' +
    '				<div ng-messages="newRestaurantForm.restaurantAdminPassword.$error" >\n' +
    '                    <div ng-if="newRestaurantForm.restaurantAdminPassword.$error.required && !newRestaurantForm.restaurantAdminPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newRestaurantForm.restaurantAdminPassword.$error.minlength || newRestaurantForm.restaurantAdminPassword.$error.maxlength) && !newRestaurantForm.restaurantAdminPassword.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label" ng-if="rewRestCtrl.mode==\'new\'">\n' +
    '				<label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '				<input required type="password" class="mat-input form-control" name="confirmPassword"  ng-model="rewRestCtrl.confirmPassword" equalto="newRestaurantForm.restaurantAdminPassword" >\n' +
    '				<div ng-messages="newRestaurantForm.confirmPassword.$error" >\n' +
    '                    <div ng-if="newRestaurantForm.confirmPassword.$error.required && !newRestaurantForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                    <div ng-if="newRestaurantForm.confirmPassword.$error.equalto && !newRestaurantForm.confirmPassword.$error.required">Passwords don\'t match.</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-if="rewRestCtrl.mode==\'new\'">       \n' +
    '					<input id="logoImage" name="logoImage" style="display: none;" onchange="angular.element(this).scope().AddRestaurantLogo(this.files)" type="file" required>\n' +
    '					<button ng-click="rewRestCtrl.LoadUploadLogo()" >{{\'UploadBtn\' | translate}}</button>\n' +
    '					<img ng-src="{{rewRestCtrl.restaurantLogo}}" style="max-height: 200px;max-width: 200px;">\n' +
    '					<div ng-messages="newRestaurantForm.logoImage.$error" >\n' +
    '						<div ng-if="newRestaurantForm.logoImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newRestaurantForm.$invalid || (rewRestCtrl.mode==\'new\' && rewRestCtrl.restaurantLogo== null) " class="btn pmd-ripple-effect btn-primary" type="button" ng-click="rewRestCtrl.save()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="rewRestCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/newType.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<button class="close" type="button" ng-click="restTypeDlCtrl.close()">×</button>\n' +
    '		<h2 class="pmd-card-title-text">{{\'NewRestaurantTypeLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newTypeForm">\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="typeName" ng-model="restTypeDlCtrl.typeName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="newTypeForm.typeName.$error" >\n' +
    '                    <div ng-if="newTypeForm.typeName.$error.required && !newTypeForm.typeName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newTypeForm.typeName.$error.minlength || newTypeForm.typeName.$error.maxlength) && !newTypeForm.typeName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newTypeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="restTypeDlCtrl.AddNewType()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="restTypeDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/restaurant.html',
    '<div >\n' +
    '	<div style="margin-bottom:10px">\n' +
    '		<button  ng-click="$state.go(\'newRestaurant\');" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddRestaurantBtn\' | translate}}</button>\n' +
    '\n' +
    '	</div>\n' +
    '	<div ng-if="restaurantCtrl.restaurant.results.length == 0">\n' +
    '			<span>{{\'NoRestaurantAvailable\' | translate}}</span>\n' +
    '		</div>\n' +
    '		\n' +
    '	<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="restaurantCtrl.restaurant.results.length >0">\n' +
    '		\n' +
    '		<div class="table-responsive">\n' +
    '			<table class="table pmd-table table-hover">\n' +
    '				<thead>\n' +
    '					<tr>\n' +
    '						<th >{{\'Name\' | translate}}</th>\n' +
    '						<th >{{\'LogoLbl\' | translate}}</th>\n' +
    '						<th >{{\'DescriptionLbl\' | translate}}</th>\n' +
    '						<th >{{\'AdminUserLbl\' | translate}}</th>\n' +
    '						<th >{{\'TypeLbl\' | translate}}</th>\n' +
    '						<th>{{\'ReadyLbl\' | translate}}</th>\n' +
    '						<th >{{\'status\' | translate}}</th>\n' +
    '					</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '					<tr ng-repeat="restaurant in restaurantCtrl.restaurant.results">\n' +
    '						<td data-title="Name"width="20%" >{{restaurant.restaurantName}}</td>\n' +
    '						<td data-title="logo" ><img ng-src="{{restaurant.logoURL}}?type=\'thumbnail\'&date={{restaurantCtrl.Now}}"  ng-alt="{{restaurant.restaurantName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '						<td data-title="Description" >{{restaurant.restaurantDescription}}</td>\n' +
    '						<td data-title="Admin user" width="15%" >{{restaurant.restaurantAdminUserName}}</td>\n' +
    '						<td data-title="Type" width="15%" >{{restaurant.restaurantTypeName}}</td>\n' +
    '						<td>{{restaurant.isReady}}</td>\n' +
    '						<td width="15%" >\n' +
    '							<a ng-show="!restaurant.isActive" ng-class="{disabled: !restaurant.isReady}"  ng-click="restaurantCtrl.Activate(restaurant)" class="cursorPointer">{{\'ActivateBtn\' | translate}}</a>\n' +
    '							<a ng-show="restaurant.isActive" ng-click="restaurantCtrl.Deactivate(restaurant)" class="cursorPointer">{{\'DeActivateBtn\' | translate}}</a>\n' +
    '							<i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editRestaurant\', {restaurantId: restaurant.restaurantId});">mode_edit</i> \n' +
    '							<i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="restaurantCtrl.openDeleteRestaurantDialog(restaurant.restaurantName,restaurant.restaurantId)">delete</i>\n' +
    '						</td>\n' +
    '					</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</div>\n' +
    '		<div style="text-align:center;" paging page="1" page-size="10" total="restaurantCtrl.restaurant.totalCount" paging-action="restaurantCtrl.changePage( page)"\n' +
    '		 flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '			</div>\n' +
    '	</div> \n' +
    '\n' +
    '\n' +
    '</div>					\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/GlobalAdmin/templates/restaurantType.html',
    '<div >\n' +
    '	<div style="margin-bottom:10px">\n' +
    '		<button  ng-click="restaurantTypeCtrl.openTypeDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddType\' | translate}}</button>\n' +
    '\n' +
    '	</div>\n' +
    '	<div ng-if="restaurantTypeCtrl.restaurantTypes.length == 0">\n' +
    '			<span>{{\'NoRestaurantTypesAvailable\' | translate}}</span>\n' +
    '		</div>\n' +
    '	<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="restaurantTypeCtrl.restaurantTypes.length > 0">\n' +
    '		<div class="table-responsive">\n' +
    '			<table class="table pmd-table table-hover">\n' +
    '				<thead>\n' +
    '					<tr>\n' +
    '						<th >{{\'Name\' | translate}}</th>\n' +
    '						<th ></th>\n' +
    '					</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '					<tr ng-repeat="type in restaurantTypeCtrl.restaurantTypes">\n' +
    '						<td data-title="Name" width="70%">{{type.typeName}}</td>\n' +
    '						<td width="30%">\n' +
    '							<i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="restaurantTypeCtrl.openEditTypeDialog($index)">mode_edit</i> \n' +
    '							<i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="restaurantTypeCtrl.openDeleteTypeDialog(type.typeName,type.restaurantTypeId)">delete</i>\n' +
    '						</td>\n' +
    '					</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</div>\n' +
    '	</div> \n' +
    '\n' +
    '\n' +
    '</div>					\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/Category.html',
    '<div >\n' +
    '        <div style="margin-bottom:10px">\n' +
    '            <button  ng-click="categoryCtrl.openCategoryDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddCategoryBtn\' | translate}}</button>\n' +
    '            <span ng-if="!categoryCtrl.categories.isParentTranslated"> <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'MenuNotTranslated\' | translate}}</span>\n' +
    '        </div>\n' +
    '        \n' +
    '        <div ng-if="categoryCtrl.categories.results.length == 0">\n' +
    '                <span>{{\'NoCategoryAvailable\' | translate}}</span>\n' +
    '        </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="categoryCtrl.categories.results.length > 0">\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th >{{\'Name\' | translate}}</th>\n' +
    '                            <th >{{\'Imagelbl\' | translate}}</th>\n' +
    '                            <th >{{\'status\' | translate}}</th>\n' +
    '                            <th ></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <tr ng-repeat="category in categoryCtrl.categories.results">\n' +
    '                            <td data-title="Name" >{{category.categoryName}}</td>\n' +
    '                            <td data-title="Image" ><img ng-src="{{category.imageURL}}?type=\'thumbnail\'&date={{categoryCtrl.Now}}" ng-alt="{{category.categoryName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '                            <!-- <td></td> -->\n' +
    '                            <td>\n' +
    '                                <a ng-show="!category.isActive" ng-click="categoryCtrl.Activate(category)" class="cursorPointer">{{\'ActivateBtn\' | translate}}</a>\n' +
    '                                <a ng-show="category.isActive" ng-click="categoryCtrl.Deactivate(category)" class="cursorPointer">{{\'DeActivateBtn\' | translate}}</a>\n' +
    '                            </td>\n' +
    '                            <td width="30%">\n' +
    '                                <a ng-click="$state.go(\'Items\', {categoryId: category.categoryId});" class="cursorPointer">{{\'ItemsBtn\' | translate}}</a>\n' +
    '                                <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="categoryCtrl.openEditCategoryDialog($index)">mode_edit</i> \n' +
    '                                <i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="categoryCtrl.openDeleteCategoryDialog(category.categoryName,category.categoryId)">delete</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '            <div style="text-align:center;" paging page="1" page-size="10" total="categoryCtrl.categories.totalCount" paging-action="categoryCtrl.changePage( page)"\n' +
    '            flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '               </div>\n' +
    '        </div> \n' +
    '    \n' +
    '    \n' +
    '    </div>					\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/Item.html',
    '<div >\n' +
    '    <div style="margin-bottom:10px">\n' +
    '        <button  ng-click="$state.go(\'newItem\',{categoryId: $stateParams.categoryId});" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddItemBtn\' | translate}}</button>\n' +
    '        <span ng-if="!itemCtrl.items.isParentTranslated"> <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'CategoryNotTranslated\' | translate}}</span>\n' +
    '    </div>\n' +
    '    \n' +
    '    <div ng-if="itemCtrl.items.results.length == 0">\n' +
    '            <span>{{\'NoItemAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '    <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="itemCtrl.items.results.length > 0">\n' +
    '        <div class="table-responsive">\n' +
    '            <table class="table pmd-table table-hover">\n' +
    '                <thead>\n' +
    '                    <tr>\n' +
    '                        <th >{{\'Name\' | translate}}</th>\n' +
    '                        <th >{{\'Imagelbl\' | translate}}</th>\n' +
    '                        <th >{{\'DescriptionLbl\' | translate}}</th>\n' +
    '                        <!-- <th >{{\'Pricelbl\' | translate}}</th> -->\n' +
    '                        <th >{{\'size\' | translate}}</th>\n' +
    '                        <!-- <th >{{\'sideItem\' | translate}}</th> -->\n' +
    '                        <!-- <th >{{\'MaxValueLbl\' | translate}}</th> -->\n' +
    '                        <th >{{\'status\' | translate}}</th>\n' +
    '                        <th ></th>\n' +
    '                    </tr>\n' +
    '                </thead>\n' +
    '                <tbody>\n' +
    '                    <tr ng-repeat="item in itemCtrl.items.results">\n' +
    '                        <td data-title="Name"  width="15%">{{item.itemName}}</td>\n' +
    '                        <td data-title="Image" ><img ng-src="{{item.imageURL}}?type=\'thumbnail\'&date={{itemCtrl.Now}}" ng-alt="{{item.itemName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '                        <td data-title="Description">{{item.itemDescription}}</td>                        \n' +
    '                        <!-- <td data-title="Description" width="5%">{{item.price}}</td>                         -->\n' +
    '                        <td data-title="Size" width="10%" >\n' +
    '                            <div ng-init="sizeLimit=2">\n' +
    '                                <span ng-repeat="size in item.sizes|limitTo:sizeLimit">\n' +
    '                                    {{size.sizeName}} <span>{{size.price}}</span><span ng-if="!$last">,</span>\n' +
    '                                </span>\n' +
    '                                <div class="cursorPointer font12" ng-show="item.sizes.length > 2">\n' +
    '                                    <span  ng-show="sizeLimit == 2" ng-click="sizeLimit=item.sizes.length">{{item.sizes.length -2}} more size</span>\n' +
    '                                    <span  ng-show="sizeLimit != 2" ng-click="sizeLimit=2">Collapse</span>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </td>                        \n' +
    '                        <!-- <td data-title="SideItems"  width="10%">\n' +
    '                            <div ng-init="sideItemLimit=2">\n' +
    '                                <span ng-repeat="sideItem in item.sideItems|limitTo:sideItemLimit">\n' +
    '                                    {{sideItem.sideItemName}}<span ng-if="!$last">,</span>\n' +
    '                                </span>\n' +
    '                                <div class="cursorPointer font12" ng-show="item.sideItems.length > 2">\n' +
    '                                    <span  ng-show="sideItemLimit == 2" ng-click="sideItemLimit=item.sideItems.length">{{item.sideItems.length -2}} more side items</span>\n' +
    '                                    <span  ng-show="sideItemLimit != 2" ng-click="sideItemLimit=2">Collapse</span>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </td>          -->\n' +
    '                        <!-- <td data-title="Description"  width="5%">{{item.maxSideItemValue}}</td>                                        -->\n' +
    '                        <td>\n' +
    '                            <a ng-show="!item.isActive" ng-click="itemCtrl.Activate(item)" class="cursorPointer">{{\'ActivateBtn\' | translate}}</a>\n' +
    '                            <a ng-show="item.isActive" ng-click="itemCtrl.Deactivate(item)" class="cursorPointer">{{\'DeActivateBtn\' | translate}}</a>\n' +
    '                        </td>\n' +
    '                        <td width="10%" >\n' +
    '                            <!-- <a ng-click="$state.go(\'Category\');" class="cursorPointer">{{\'CategoriesBtn\' | translate}}</a> -->\n' +
    '                            <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="$state.go(\'editItem\',{categoryId:item.categoryId,itemId:item.itemID});">mode_edit</i> \n' +
    '                            <i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="itemCtrl.openDeleteItemDialog(item.itemName,item.itemID)">delete</i>\n' +
    '                        </td>\n' +
    '                    </tr>\n' +
    '                </tbody>\n' +
    '            </table>\n' +
    '        </div>\n' +
    '        <div style="text-align:center;" paging page="1" page-size="10" total="itemCtrl.items.totalCount" paging-action="itemCtrl.changePage( page)"\n' +
    '        flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '           </div>\n' +
    '    </div> \n' +
    '\n' +
    '\n' +
    '</div>					\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/background.html',
    '<div >\n' +
    '       \n' +
    '    <div style="margin-bottom:10px">\n' +
    '            <button  ng-click="backgroundCtrl.openbackgroundDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddbackgroundBtn\' | translate}}</button>\n' +
    '            <!-- <span ng-if="!backgroundCtrl.Backgrounds.isParentTranslated"> <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'MenuNotTranslated\' | translate}}</span> -->\n' +
    '        </div> \n' +
    '        <div ng-if="backgroundCtrl.Backgrounds.results.length == 0">\n' +
    '                <span>{{\'NoBackgroundAvailable\' | translate}}</span>\n' +
    '        </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="backgroundCtrl.Backgrounds.results.length > 0">\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr> \n' +
    '                            <th >{{\'Imagelbl\' | translate}}</th>\n' +
    '                            <th >{{\'status\' | translate}}</th>\n' +
    '                            <th ></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <tr ng-repeat="Background in backgroundCtrl.Backgrounds.results"> \n' +
    '                            <td data-title="Image" ><img ng-src="{{Background.imageUrl}}" ng-alt="{{Background.BackgroundName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '                            <!-- <td></td> -->\n' +
    '                            <td>\n' +
    '                                 <a ng-show="Background.isActive"   class="cursorPointer">{{\'CurrentBtn\' | translate}}</a>\n' +
    '                                 <a ng-show="!Background.isActive" ng-click="backgroundCtrl.Activate(Background)" class="cursorPointer">{{\'NotCurrentBtn\' | translate}}</a>\n' +
    '                            </td>\n' +
    '                          \n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '            <div style="text-align:center;" paging page="1" page-size="10" total="backgroundCtrl.Backgrounds.totalCount" paging-action="backgroundCtrl.changePage( page)"\n' +
    '            flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '               </div>\n' +
    '        </div> \n' +
    '    \n' +
    '    \n' +
    '    </div>					\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/categoryTemplate.html',
    '<div ng-if="CategoryTemplateCtrl.menus.length == 0">\n' +
    '        <span>{{\'NoMenusAvailable\' | translate}}</span>\n' +
    '    </div>\n' +
    '   \n' +
    '<div class="modal-content" ng-if="CategoryTemplateCtrl.menus.length > 0">\n' +
    '   \n' +
    '    <div class="modal-header bordered" >        \n' +
    '            <div class="row">\n' +
    '                <div class="col-md-2">\n' +
    '                    <div class="form-group">\n' +
    '                        <select  class="select-simple form-control pmd-select2"\n' +
    '                            ng-options="item.menuName for item in CategoryTemplateCtrl.menus"  \n' +
    '                            ng-model="CategoryTemplateCtrl.selectedMenu"\n' +
    '                            ng-change="CategoryTemplateCtrl.changeMenu()">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-md-2">\n' +
    '                    <div class="form-group">\n' +
    '                        <select   class="select-simple form-control pmd-select2"\n' +
    '                            ng-options="item.categoryName for item in CategoryTemplateCtrl.categories"  \n' +
    '                            ng-model="CategoryTemplateCtrl.selectedCategory"\n' +
    '                            ng-change="CategoryTemplateCtrl.changeCategory()">\n' +
    '                        </select>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="col-md-6">\n' +
    '                    <span>Total items {{CategoryTemplateCtrl.selectedCategory.itemCount}}</span>\n' +
    '                    <span>Total remaining items {{CategoryTemplateCtrl.remainingItems}}</span>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <span ng-show="!CategoryTemplateCtrl.isCategoryTemplateReady">\n' +
    '                Select template for page {{CategoryTemplateCtrl.page}}\n' +
    '            </span>\n' +
    '    </div>\n' +
    '    <div class="modal-body">\n' +
    '        <div class="row">\n' +
    '            <div ng-repeat="template in CategoryTemplateCtrl.templates">\n' +
    '                <div class="col-md-2">\n' +
    '                    <label style="padding-right: 20px" >\n' +
    '                        <div class="column">\n' +
    '                            <div class="row-md-2">\n' +
    '                                <div class="row">\n' +
    '                                    <input ng-disabled="CategoryTemplateCtrl.isCategoryTemplateReady" type="radio" ng-model="CategoryTemplateCtrl.selectedTemplateId" value="{{CategoryTemplateCtrl.templates[$index].id}}">\n' +
    '                                    <img ng-src="{{CategoryTemplateCtrl.templates[$index].imageURL}}" style="height: 200px;width: 150px;"/>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                            <div class="row-md-2" style="text-align:center">\n' +
    '                                <span>\n' +
    '                                    maximum  {{CategoryTemplateCtrl.templates[$index].itemCount}} item\n' +
    '                                </span>\n' +
    '                            </div>\n' +
    '                                \n' +
    '                        </div>\n' +
    '                    </label>\n' +
    '                </div>\n' +
    '\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <button ng-disabled="CategoryTemplateCtrl.selectedTemplateId<=0" ng-click="CategoryTemplateCtrl.selectTemplate()" style="margin-bottom: 20px;" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">OK</button>\n' +
    '    \n' +
    '        <div class="row">\n' +
    '            \n' +
    '        <div ng-if="CategoryTemplateCtrl.selectedTemplates.length > 0">Selected templates</div>\n' +
    '            <div ng-repeat="template in CategoryTemplateCtrl.selectedTemplates"   >\n' +
    '                 <div class="col-md-2">\n' +
    '                    <div  >  \n' +
    '                        <div style="padding-right: 20px"  >\n' +
    '                            <div class="column">\n' +
    '                                <div class="row-md-2">\n' +
    '                                     <img ng-src="{{CategoryTemplateCtrl.selectedTemplates[$index].imageURL}}" style="height: 200px;"/>\n' +
    '                                </div>\n' +
    '                                <div class="row-md-2" style="text-align:center">\n' +
    '                                    <span>\n' +
    '                                       page {{CategoryTemplateCtrl.selectedTemplates[$index].page}} \n' +
    '                                    </span>\n' +
    '                                </div>                                \n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '        <button  ng-if="CategoryTemplateCtrl.selectedTemplates.length > 0" ng-disabled="!CategoryTemplateCtrl.isCategoryTemplateReady" ng-click="CategoryTemplateCtrl.save()"  class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '    </div>\n' +
    '</div>\n' +
    '\n' +
    '\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editCategory.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="editCategoryDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'UpdateCategoryLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="editCategoryForm">\n' +
    '                <div ng-if="editCategoryDlCtrl.mode==\'map\'">\n' +
    '                    <select required class="select-simple form-control pmd-select2" \n' +
    '                            ng-options="item.categoryName for item in editCategoryDlCtrl.englishCategories"  \n' +
    '                            ng-model="editCategoryDlCtrl.selecteCategory">\n' +
    '                    </select>\n' +
    '                    <div ng-if="editCategoryDlCtrl.englishCategories.length <=0">{{\'NoCategoryDefault\' | translate}} </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                        <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                        <input required type="text" class="mat-input form-control" name="categoryName" ng-model="editCategoryDlCtrl.categoryName"  ng-minlength="3" ng-maxlength="100">\n' +
    '                        <div ng-messages="editCategoryForm.categoryName.$error" >\n' +
    '                            <div ng-if="editCategoryForm.categoryName.$error.required && !editCategoryForm.categoryName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="(editCategoryForm.categoryName.$error.minlength || editCategoryForm.categoryName.$error.maxlength) && !editCategoryForm.categoryName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed"ng-if="editCategoryDlCtrl.mode==\'edit\'" >       \n' +
    '                        <input id="categoryImage" name="categoryImage" style="display: none;" onchange="angular.element(this).scope().AddCategoryImage(this.files)" type="file" required>\n' +
    '                        <button ng-click="editCategoryDlCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '                        <span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedCategoryImage\' | translate}}</span>\n' +
    '                        <img ng-src="{{editCategoryDlCtrl.categoryImage}}" style="max-height: 137px;max-width: 210px;">\n' +
    '                        <div ng-messages="editCategoryForm.categoryImage.$error" >\n' +
    '                            <div ng-if="editCategoryForm.categoryImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="editCategoryForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editCategoryDlCtrl.updateCategory()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editCategoryDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editItem.html',
    '<script type="text/javascript">\n' +
    '	$(document).ready(function() {\n' +
    '		<!-- Select Multiple Tags -->\n' +
    '		$(".select-tags").select2({\n' +
    '			tags: false,\n' +
    '			theme: "bootstrap",\n' +
    '		})\n' +
    '	});\n' +
    '</script>\n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<!-- <h2 class="pmd-card-title-text" ng-if="editItemCtrl.mode==\'new\'">{{\'NewItemtLbl\' | translate}}</h2> -->\n' +
    '		<h2 class="pmd-card-title-text" >{{\'UpdateItemLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newItemForm">\n' +
    '			<!-- <div ng-if="editItemCtrl.mode==\'map\'">\n' +
    '				<select class="select-simple form-control pmd-select2"\n' +
    '					ng-options="item.restaurantName for item in editItemCtrl.defaultRestaurant"  \n' +
    '					ng-model="editItemCtrl.selectedRestaurant">\n' +
    '				</select>\n' +
    '			</div> -->\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="itemName" ng-model="editItemCtrl.item.itemName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="newItemForm.itemName.$error" >\n' +
    '					<div ng-if="newItemForm.itemName.$error.required && !newItemForm.itemName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newItemForm.itemName.$error.minlength || newItemForm.itemName.$error.maxlength) && !newItemForm.itemName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'DescriptionLbl\' | translate}}</label>\n' +
    '				<textarea required  class="form-control" name="itemDescription" ng-model="editItemCtrl.item.itemDescription"  ng-minlength="3" ng-maxlength="300"></textarea>\n' +
    '				<div ng-messages="newItemForm.itemDescription.$error" >\n' +
    '					<div ng-if="newItemForm.itemDescription.$error.required && !newItemForm.itemDescription.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newItemForm.itemDescription.$error.minlength || newItemForm.itemDescription.$error.maxlength) && !newItemForm.itemDescription.$error.required">{{\'DescLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>			\n' +
    '			<!-- <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >\n' +
    '				<label for="first-name">{{\'Pricelbl\' | translate}}</label>\n' +
    '				<input required type="number" class="mat-input form-control" name="price" ng-model="editItemCtrl.item.price" min="1">\n' +
    '				<div ng-messages="newItemForm.price.$error" >\n' +
    '                    <div ng-if="newItemForm.price.$error.required && !newItemForm.price.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div> -->\n' +
    '				\n' +
    '			\n' +
    '			<!-- <div class="group-fields clearfix row">\n' +
    '				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n' +
    '					<div class="checkbox pmd-default-theme">\n' +
    '						<label class=" checkbox-pmd-ripple-effect">\n' +
    '							<input type="checkbox" ng-model="editItemCtrl.hasSize">\n' +
    '							<span>{{\'hasSizeLbl\' | translate}}</span>\n' +
    '						</label>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div>\n' +
    '\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-show="editItemCtrl.hasSize" >\n' +
    '				<label>{{\'selectSizeLbl\' | translate}}</label>\n' +
    '                <select class="form-control select-tags pmd-select2-tags" multiple ng-model="editItemCtrl.SelectedSize">\n' +
    '                    <option ng-repeat="size in editItemCtrl.Sizes" value="{{size.sizeId}}">{{size.sizeName}}</option>                    \n' +
    '                </select>\n' +
    '			</div> -->\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >\n' +
    '					<label>{{\'selectSizeLbl\' | translate}}</label>\n' +
    '					<select required class="form-control select-tags pmd-select2-tags" multiple\n' +
    '					ng-change="editItemCtrl.sizeChange()" ng-model="editItemCtrl.SelectedSizeId" name="SelectedSize">\n' +
    '						<option ng-repeat="size in editItemCtrl.Sizes" \n' +
    '						  ng-value="{{size.sizeId}}">\n' +
    '							{{size.sizeName}} </option>                    \n' +
    '					</select>\n' +
    '					<div ng-if="newItemForm.SelectedSizeId.$error.required && !newItemForm.SelectedSizeId.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '				</div>\n' +
    '	\n' +
    '				<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-repeat="itemSize in editItemCtrl.SelectedSize">\n' +
    '						<label for="first-name">{{\'Pricelbl\' | translate}} {{(itemSize.sizeName)}} </label>\n' +
    '						<input  type="number" class="mat-input form-control" name="price" ng-model="editItemCtrl.SelectedSize[$index].price" min="1" ng-maxlength="100">\n' +
    '						<div ng-messages="newItemForm.price.$error" >\n' +
    '							<div ng-if="newItemForm.price.$error.required && !newItemForm.price.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '							<div ng-if="newItemForm.price.$error.maxlength">{{\'PriceLengthError\' | translate}}</div>\n' +
    '						</div>\n' +
    '					</div>\n' +
    '			<!-- <div class="group-fields clearfix row">\n' +
    '				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n' +
    '					<div class="checkbox pmd-default-theme">\n' +
    '						<label class=" checkbox-pmd-ripple-effect">\n' +
    '							<input type="checkbox" ng-model="editItemCtrl.hasSideItem">\n' +
    '							<span>{{\'hasSideItemLbl\' | translate}}</span>\n' +
    '						</label>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div> -->\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-show="editItemCtrl.hasSideItem"  >\n' +
    '				<label>{{\'selectSideItemLbl\' | translate}}</label>\n' +
    '                <select class="form-control select-tags pmd-select2-tags" ng-change="editItemCtrl.CheckMaxSideItemValue()" multiple ng-model="editItemCtrl.SelectedSideItems">\n' +
    '                    <option ng-repeat="sideItem in editItemCtrl.SideItems" value="{{sideItem.sideItemId}}">{{sideItem.sideItemName}}</option>                    \n' +
    '                </select>\n' +
    '			</div>\n' +
    '            \n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-if="editItemCtrl.hasSideItem">\n' +
    '					<label for="first-name">{{\'MaxValueLbl\' | translate}}</label>\n' +
    '					<input  type="number" class="mat-input form-control" ng-change="editItemCtrl.CheckMaxSideItemValue()" name="maxSideItemValue" ng-model="editItemCtrl.item.maxSideItemValue" min="1">\n' +
    '					<div ng-messages="newItemForm.maxSideItemValue.$error" >\n' +
    '						<div ng-if="newItemForm.maxSideItemValue.$error.required && !newItemForm.maxSideItemValue.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '					<div ng-show="editItemCtrl.maxSideItemValueError">\n' +
    '						<span> {{\'MaxSideItemValueError\' | translate}}\n' +
    '						</span>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '			\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">       \n' +
    '					<input id="itemImage" name="itemImage" style="display: none;" onchange="angular.element(this).scope().AddItemImage(this.files)" type="file" required>\n' +
    '					<button ng-click="editItemCtrl.LoadUploadLogo()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedItemImage1\' | translate}}</span>\n' +
    '					<img ng-src="{{editItemCtrl.item.imageURL}}" style="max-height: 200px;max-width: 200px;">\n' +
    '					<div ng-messages="newItemForm.itemImage.$error" >\n' +
    '						<div ng-if="newItemForm.itemImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">       \n' +
    '					<input id="itemImage2" name="itemImage2" style="display: none;" onchange="angular.element(this).scope().AddItemImage2(this.files)" type="file" required>\n' +
    '					<button ng-click="editItemCtrl.LoadUploadLogo2()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedItemImage2\' | translate}}</span>\n' +
    '					<img ng-src="{{editItemCtrl.item.imageURL2}}" style="max-height: 200px;max-width: 200px;">\n' +
    '					<div ng-messages="newItemForm.itemImage2.$error" >\n' +
    '						<div ng-if="newItemForm.itemImage2.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newItemForm.$invalid || (editItemCtrl.mode==\'new\' && editItemCtrl.itemImage== null && editItemCtrl.itemImage2== null) \n' +
    '		|| (editItemCtrl.hasSideItem && editItemCtrl.SelectedSideItems.length<=0)|| (editItemCtrl.hasSideItem && editItemCtrl.maxSideItemValueError)" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editItemCtrl.updateItem()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editItemCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editMenu.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<button class="close" type="button" ng-click="editMenuDlCtrl.close()">×</button>\n' +
    '		<h2 class="pmd-card-title-text">{{\'UpdateMenuLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="editMenuForm">\n' +
    '			<div ng-if="editMenuDlCtrl.mode==\'map\'">\n' +
    '				<select required class="select-simple form-control pmd-select2" \n' +
    '						ng-options="item.menuName for item in editMenuDlCtrl.englishMenus"  \n' +
    '						ng-model="editMenuDlCtrl.selectedMenu">\n' +
    '				</select>\n' +
    '				<div ng-if="editMenuDlCtrl.englishMenus.length <=0">{{\'NoMenuDefault\' | translate}} </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="menuName" ng-model="editMenuDlCtrl.menuName" ng-minlength="3" ng-maxlength="40">\n' +
    '				<div ng-messages="editMenuForm.menuName.$error" >\n' +
    '					<div ng-if="editMenuForm.menuName.$error.required && !editMenuForm.menuName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(editMenuDlCtrl.menuName.$error.minlength || editMenuDlCtrl.menuName.$error.maxlength) && !editMenuDlCtrl.menuName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed"ng-if="editMenuDlCtrl.mode==\'edit\'" >       \n' +
    '					<input id="menuImage" name="menuImage" style="display: none;" onchange="angular.element(this).scope().AddMenuImage(this.files)" type="file" required>\n' +
    '					<button ng-click="editMenuDlCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedMenuImage\' | translate}}</span>\n' +
    '					<img ng-src="{{editMenuDlCtrl.menuImage}}" style="max-height: 286px;max-width: 477px;">\n' +
    '					<div ng-messages="editMenuForm.menuImage.$error" >\n' +
    '						<div ng-if="editMenuForm.menuImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="editMenuForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editMenuDlCtrl.updateMenu()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editMenuDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editSideItem.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="editSideItemDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'UpdateSizeLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="editSideItemForm">\n' +
    '                <div ng-if="editSideItemDlCtrl.mode==\'map\'">\n' +
    '                    <select required class="select-simple form-control pmd-select2" \n' +
    '                            ng-options="item.sideItemName for item in editSideItemDlCtrl.englishSideItems"  \n' +
    '                            ng-model="editSideItemDlCtrl.selectedSideItem">\n' +
    '                    </select>\n' +
    '                    <div ng-if="editSideItemDlCtrl.englishSideItems.length <=0">{{\'NoSideItemDefault\' | translate}} </div>                    \n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="sideItemName" ng-model="editSideItemDlCtrl.sideItemName" ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="editSideItemForm.sideItemName.$error" >\n' +
    '                        <div ng-if="editSideItemForm.sideItemName.$error.required && !editSideItemForm.sideItemName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(editSideItemForm.sideItemName.$error.minlength || editSideItemForm.sideItemName.$error.maxlength) && !editSideItemForm.sideItemName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-if="editSideItemDlCtrl.mode==\'edit\'">\n' +
    '                        <label for="first-name">{{\'value\' | translate}}</label>\n' +
    '                        <input required type="number" class="mat-input form-control" name="value" ng-model="editSideItemDlCtrl.value"  min="1">\n' +
    '                        <div ng-messages="editSideItemForm.value.$error" >\n' +
    '                            <div ng-if="editSideItemForm.value.$error.required && !editSideItemForm.value.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="editSideItemForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editSideItemDlCtrl.updateSideItem()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editSideItemDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editSize.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="editSizeDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'UpdateSizeLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="editSizeForm">\n' +
    '                <div ng-if="editSizeDlCtrl.mode==\'map\'">\n' +
    '                    <select required class="select-simple form-control pmd-select2" \n' +
    '                            ng-options="item.sizeName for item in editSizeDlCtrl.englishSizes"  \n' +
    '                            ng-model="editSizeDlCtrl.selectedSize">\n' +
    '                    </select>\n' +
    '                    <div ng-if="editSizeDlCtrl.englishSizes.length <=0">{{\'NoSizeDefault\' | translate}} </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="sizeName" ng-model="editSizeDlCtrl.sizeName" ng-minlength="1" ng-maxlength="10">\n' +
    '                    <div ng-messages="editSizeForm.sizeName.$error" >\n' +
    '                        <div ng-if="editSizeForm.sizeName.$error.required && !editSizeForm.sizeName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(editSizeForm.sizeName.$error.minlength || editSizeForm.sizeName.$error.maxlength) && !editSizeForm.sizeName.$error.required">{{\'SizeLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="editSizeForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editSizeDlCtrl.updateSize()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editSizeDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/editWaiter.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="editWaiterDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'UpdateWaiterLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newWaiterForm">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label  pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'UserName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userName" ng-model="editWaiterDlCtrl.waiter.userName" ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newWaiterForm.userName.$error" >\n' +
    '                        <div ng-if="newWaiterForm.userName.$error.required && !newWaiterForm.userName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newWaiterForm.userName.$error.minlength || newWaiterForm.userName.$error.maxlength) && !newWaiterForm.userName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label  pmd-textfield-floating-label-completed">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="name" ng-model="editWaiterDlCtrl.waiter.name" ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newWaiterForm.name.$error" >\n' +
    '                        <div ng-if="newWaiterForm.name.$error.required && !newWaiterForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newWaiterForm.name.$error.minlength || newWaiterForm.name.$error.maxlength) && !newWaiterForm.name.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >\n' +
    '                        <label for="first-name">{{\'WaiterUserPasswordLbl\' | translate}}</label>\n' +
    '                        <input required type="password" class="mat-input form-control" name="password" ng-model="editWaiterDlCtrl.waiter.password" ng-minlength="8" ng-maxlength="25">\n' +
    '                        <div ng-messages="newWaiterForm.password.$error" >\n' +
    '                            <div ng-if="newWaiterForm.password.$error.required && !newWaiterForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="(newWaiterForm.password.$error.minlength || newWaiterForm.password.$error.maxlength) && !newWaiterForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >\n' +
    '                        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '                        <input required type="password" class="mat-input form-control" name="confirmPassword"  ng-model="editWaiterDlCtrl.waiter.confirmPassword" equalto="newWaiterForm.password" >\n' +
    '                        <div ng-messages="newWaiterForm.confirmPassword.$error" >\n' +
    '                            <div ng-if="newWaiterForm.confirmPassword.$error.required && !newWaiterForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="newWaiterForm.confirmPassword.$error.equalto && !newWaiterForm.confirmPassword.$error.required">Passwords don\'t match.</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newWaiterForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="editWaiterDlCtrl.updateWaiter()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="editWaiterDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/menu.html',
    '<div >\n' +
    '	<div style="margin-bottom:10px">\n' +
    '		<button  ng-click="menuCtrl.openMenuDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddMenuBtn\' | translate}}</button>\n' +
    '		<span ng-if="!menuCtrl.menus.isParentTranslated"> <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RestaurantNotTranslated\' | translate}}</span>\n' +
    '		<button ng-disabled="menuCtrl.RestaurantIsReady"  ng-click="menuCtrl.Publish()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'ReadyLbl\' | translate}}</button>\n' +
    '	</div>\n' +
    '	<div ng-if="menuCtrl.menus.results.length == 0">\n' +
    '			<span>{{\'NoMenusAvailable\' | translate}}</span>\n' +
    '		</div>\n' +
    '	\n' +
    '	<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="menuCtrl.menus.results.length > 0">\n' +
    '		<div class="table-responsive">\n' +
    '			<table class="table pmd-table table-hover">\n' +
    '				<thead>\n' +
    '					<tr>\n' +
    '						<th >{{\'Name\' | translate}}</th>\n' +
    '						<th >{{\'Imagelbl\' | translate}}</th>\n' +
    '						<th >{{\'status\' | translate}}</th>\n' +
    '						<th ></th>\n' +
    '						<th ></th>\n' +
    '					</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '					<tr ng-repeat="menu in menuCtrl.menus.results">\n' +
    '						<td data-title="Name" width="50%">{{menu.menuName}}</td>\n' +
    '						<td data-title="Image" ><img ng-src="{{menu.imageURL}}?type=\'thumbnail\'&date={{menuCtrl.Now}}" ng-alt="{{menu.menuName}}" style="max-height: 200px;max-width: 200px;"/></td>\n' +
    '						<td>\n' +
    '							<a ng-show="!menu.isActive" ng-click="menuCtrl.Activate(menu)" class="cursorPointer">{{\'ActivateBtn\' | translate}}</a>\n' +
    '							<a ng-show="menu.isActive" ng-click="menuCtrl.Deactivate(menu)" class="cursorPointer">{{\'DeActivateBtn\' | translate}}</a>   \n' +
    '						</td>\n' +
    '						<td>\n' +
    '							<a ng-click="$state.go(\'Category\', {menuId: menu.menuId});" class="cursorPointer">{{\'CategoriesBtn\' | translate}}</a>\n' +
    '						</td>\n' +
    '						<td >\n' +
    '							<i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="menuCtrl.openEditMenuDialog($index)">mode_edit</i> \n' +
    '							<i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="menuCtrl.openDeleteMenuDialog(menu.menuName,menu.menuId)">delete</i>\n' +
    '						</td>\n' +
    '					</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</div>\n' +
    '		<div style="text-align:center;" paging page="1" page-size="10" total="menuCtrl.menus.totalCount" paging-action="menuCtrl.changePage( page)"\n' +
    '		flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '		   </div>\n' +
    '	</div> \n' +
    '\n' +
    '\n' +
    '</div>					\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newBackground.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="backgroundCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'NewbackgroundLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newbackgroundForm">\n' +
    '           \n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >       \n' +
    '                        <input id="backgroundImage" name="backgroundImage" style="display: none;" onchange="angular.element(this).scope().AddbackgroundImage(this.files)" type="file" required>\n' +
    '                        <button ng-click="backgroundCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '                        <img ng-src="{{backgroundCtrl.backgroundImage}}" style="max-height: 200px;max-width: 200px;">\n' +
    '                        <span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedBackgroundImage\' | translate}}</span>\n' +
    '                          <div ng-messages="newbackgroundForm.backgroundImage.$error" >\n' +
    '                            <div ng-if="newbackgroundForm.backgroundImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newbackgroundForm.$invalid  || backgroundCtrl.backgroundImage== null" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="backgroundCtrl.AddNewbackground()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="backgroundCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newCategory.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="categoryDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'newCategoryLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newCategoryForm">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="categoryName" ng-model="categoryDlCtrl.categoryName"  ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newCategoryForm.categoryName.$error" >\n' +
    '                        <div ng-if="newCategoryForm.categoryName.$error.required && !newCategoryForm.categoryName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newCategoryForm.categoryName.$error.minlength || newCategoryForm.categoryName.$error.maxlength) && !newCategoryForm.categoryName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >       \n' +
    '                        <input id="categoryImage" name="categoryImage" style="display: none;" onchange="angular.element(this).scope().AddCategoryImage(this.files)" type="file" required>\n' +
    '                        <button ng-click="categoryDlCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '                        <span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedCategoryImage\' | translate}}</span>\n' +
    '                        <img ng-src="{{categoryDlCtrl.categoryImage}}" style="max-height: 137px;max-width: 210px;">\n' +
    '                        <div ng-messages="newCategoryForm.categoryImage.$error" >\n' +
    '                            <div ng-if="newCategoryForm.categoryImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '                        </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newCategoryForm.$invalid  || categoryDlCtrl.categoryImage== null || categoryDlCtrl.isChanged" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="categoryDlCtrl.AddNewCategory()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="categoryDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newItem.html',
    '<script type="text/javascript">\n' +
    '	$(document).ready(function() {\n' +
    '		<!-- Select Multiple Tags -->\n' +
    '		$(".select-tags").select2({\n' +
    '			tags: false,\n' +
    '			theme: "bootstrap",\n' +
    '		})\n' +
    '	});\n' +
    '</script>\n' +
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<h2 class="pmd-card-title-text" ng-if="newItemCtrl.mode==\'new\'">{{\'NewItemtLbl\' | translate}}</h2>\n' +
    '		<h2 class="pmd-card-title-text" ng-if="newItemCtrl.mode==\'map\'">{{\'UpdateItemLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newItemForm">\n' +
    '			<div ng-if="newItemCtrl.mode==\'map\'">\n' +
    '				<select required class="select-simple form-control pmd-select2"\n' +
    '					ng-options="item.itemName for item in newItemCtrl.defaultItems"  \n' +
    '					ng-model="newItemCtrl.selectedItem">\n' +
    '				</select>\n' +
    '				<div ng-if="newItemCtrl.defaultItems.length <=0">{{\'NoItemDefault\' | translate}} </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="itemName" ng-model="newItemCtrl.itemName" ng-minlength="3" ng-maxlength="100">\n' +
    '				<div ng-messages="newItemForm.itemName.$error" >\n' +
    '					<div ng-if="newItemForm.itemName.$error.required && !newItemForm.itemName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newItemForm.itemName.$error.minlength || newItemForm.itemName.$error.maxlength) && !newItemForm.itemName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'DescriptionLbl\' | translate}}</label>\n' +
    '				<textarea required  class="form-control" name="itemDescription" ng-model="newItemCtrl.itemDescription"  ng-minlength="3" ng-maxlength="300"></textarea>\n' +
    '				<div ng-messages="newItemForm.itemDescription.$error" >\n' +
    '					<div ng-if="newItemForm.itemDescription.$error.required && !newItemForm.itemDescription.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newItemForm.itemDescription.$error.minlength || newItemForm.itemDescription.$error.maxlength) && !newItemForm.itemDescription.$error.required">{{\'DescLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>			\n' +
    '			<!-- <div class="form-group pmd-textfield pmd-textfield-floating-label" ng-if="newItemCtrl.mode==\'new\'">\n' +
    '				<label for="first-name">{{\'Pricelbl\' | translate}}</label>\n' +
    '				<input required type="number" class="mat-input form-control" name="price" ng-model="newItemCtrl.price" min="1">\n' +
    '				<div ng-messages="newItemForm.price.$error" >\n' +
    '                    <div ng-if="newItemForm.price.$error.required && !newItemForm.price.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div> -->\n' +
    '\n' +
    '			\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-show="newItemCtrl.mode==\'new\'" >\n' +
    '				<label>{{\'selectSizeLbl\' | translate}}</label>\n' +
    '                <select  class="form-control select-tags pmd-select2-tags" multiple ng-model="newItemCtrl.SelectedSize" name="SelectedSize">\n' +
    '                    <option ng-repeat="size in newItemCtrl.Sizes"  ng-value="{{size}}">{{size.sizeName}}</option>                    \n' +
    '				</select>\n' +
    '				<div ng-if="newItemForm.SelectedSize.$error.required && !newItemForm.SelectedSize.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '			</div>\n' +
    '\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-repeat="itemSize in newItemCtrl.SelectedSize">\n' +
    '					<label for="first-name">{{\'Pricelbl\' | translate}} {{(itemSize.sizeName)}} </label>\n' +
    '					<input  type="number" class="mat-input form-control" name="price" ng-model="newItemCtrl.SelectedSize[$index].price" min="1" ng-maxlength="100">\n' +
    '					<div ng-messages="newItemForm.price.$error" >\n' +
    '						<div ng-if="newItemForm.price.$error.required && !newItemForm.price.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '						<div ng-if="newItemForm.price.$error.maxlength">{{\'PriceLengthError\' | translate}}</div>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			\n' +
    '			<!-- <div class="group-fields clearfix row" ng-if="newItemCtrl.mode==\'new\'">\n' +
    '				<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\n' +
    '					<div class="checkbox pmd-default-theme">\n' +
    '						<label class=" checkbox-pmd-ripple-effect">\n' +
    '							<input type="checkbox" ng-model="newItemCtrl.hasSideItem" >\n' +
    '							<span>{{\'hasSideItemLbl\' | translate}}</span>\n' +
    '						</label>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '			</div> -->\n' +
    '            <div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" ng-show="newItemCtrl.hasSideItem"  >\n' +
    '				<label>{{\'selectSideItemLbl\' | translate}}</label>\n' +
    '                <select class="form-control select-tags pmd-select2-tags" ng-change="newItemCtrl.CheckMaxSideItemValue()" multiple ng-model="newItemCtrl.SelectedSideItems">\n' +
    '                    <option ng-repeat="sideItem in newItemCtrl.SideItems" value="{{sideItem.sideItemId}}">{{sideItem.sideItemName}}</option>                    \n' +
    '                </select>\n' +
    '			</div>		\n' +
    '						\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label" ng-if="newItemCtrl.mode==\'new\'" ng-show="newItemCtrl.hasSideItem" >\n' +
    '					<label for="first-name">{{\'MaxValueLbl\' | translate}}</label>\n' +
    '					<input required ng-if="newItemCtrl.hasSideItem" type="number" ng-change="newItemCtrl.CheckMaxSideItemValue()" class="mat-input form-control" name="maxSideItemValue" ng-model="newItemCtrl.maxSideItemValue" min="1">\n' +
    '					<div ng-messages="newItemForm.maxSideItemValue.$error" >\n' +
    '						<div ng-if="newItemForm.maxSideItemValue.$error.required && !newItemForm.maxSideItemValue.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '					<div ng-show="newItemCtrl.maxSideItemValueError">\n' +
    '						<span> {{\'MaxSideItemValueError\' | translate}}\n' +
    '						</span>\n' +
    '					</div>\n' +
    '				</div>\n' +
    '\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed"  ng-if="newItemCtrl.mode==\'new\'">       \n' +
    '					<input id="itemImage" name="itemImage" style="display: none;" onchange="angular.element(this).scope().AddItemImage(this.files)" type="file" required>\n' +
    '					<button ng-click="newItemCtrl.LoadUploadLogo()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedItemImage1\' | translate}}</span>\n' +
    '					<img ng-src="{{newItemCtrl.itemImage}}" style="max-height: 139px;max-width: 423px;">\n' +
    '					<div ng-messages="newItemForm.itemImage.$error" >\n' +
    '						<div ng-if="newItemForm.itemImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '\n' +
    '\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed"  ng-if="newItemCtrl.mode==\'new\'">       \n' +
    '					<input id="itemImage2" name="itemImage2" style="display: none;" onchange="angular.element(this).scope().AddItemImage2(this.files)" type="file" required>\n' +
    '					<button ng-click="newItemCtrl.LoadUploadLogo2()" >{{\'UploadImageBtn\' | translate}}</button>\n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedItemImage2\' | translate}}</span>\n' +
    '					<img ng-src="{{newItemCtrl.itemImage2}}" style="max-height: 69px;max-width: 112px;">\n' +
    '					<div ng-messages="newItemForm.itemImage2.$error" >\n' +
    '						<div ng-if="newItemForm.itemImage2.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '\n' +
    '\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newItemForm.$invalid || (newItemCtrl.mode==\'new\' && newItemCtrl.itemImage== null && newItemCtrl.itemImage2 == null) \n' +
    '		|| (newItemCtrl.SelectedSize.length<=0 && newItemCtrl.mode==\'new\')  \n' +
    '		|| (newItemCtrl.hasSideItem && newItemCtrl.SelectedSideItems.length<=0) || (newItemCtrl.hasSideItem && newItemCtrl.maxSideItemValueError) " class="btn pmd-ripple-effect btn-primary" type="button" ng-click="newItemCtrl.save()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="newItemCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newMenu.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-header bordered">\n' +
    '		<button class="close" type="button" ng-click="menuDlCtrl.close()">×</button>\n' +
    '		<h2 class="pmd-card-title-text">{{\'NewMenuLbl\' | translate}}</h2>\n' +
    '	</div>\n' +
    '	<div class="modal-body">\n' +
    '		<form class="form-horizontal" name="newMenuForm">\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '				<label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '				<input required type="text" class="mat-input form-control" name="menuName" ng-model="menuDlCtrl.menuName" ng-minlength="3" ng-maxlength="40">\n' +
    '				<div ng-messages="newMenuForm.menuName.$error" >\n' +
    '                    <div ng-if="newMenuForm.menuName.$error.required && !newMenuForm.menuName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '					<div ng-if="(newMenuForm.menuName.$error.minlength || newMenuForm.menuName.$error.maxlength) && !newMenuForm.menuName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                </div>\n' +
    '			</div>\n' +
    '			<div class="form-group pmd-textfield pmd-textfield-floating-label pmd-textfield-floating-label-completed" >       \n' +
    '					<input id="menuImage" name="menuImage" style="display: none;" onchange="angular.element(this).scope().AddMenuImage(this.files)" type="file" required>\n' +
    '					<button ng-click="menuDlCtrl.LoadUploadImage()" >{{\'UploadImageBtn\' | translate}}</button> \n' +
    '					<span > <i class="material-icons md-dark pmd-md warrningIcon">warning</i> {{\'RecommendedMenuImage\' | translate}}</span>\n' +
    '					<img ng-src="{{menuDlCtrl.menuImage}}" style="max-height: 286px;max-width: 477px;">\n' +
    '					<div ng-messages="newMenuForm.menuImage.$error" >\n' +
    '						<div ng-if="newMenuForm.menuImage.$error.required">{{\'requiredErr\' | translate}}</div>\n' +
    '					</div>\n' +
    '			</div>\n' +
    '		</form>\n' +
    '	</div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button ng-disabled="newMenuForm.$invalid  || menuDlCtrl.menuImage== null || menuDlCtrl.isChanged" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="menuDlCtrl.AddNewMenu()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default" type="button" ng-click="menuDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>\n' +
    '\n' +
    '	\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newSideItem.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="sideItemDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'NewSideItemLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newSideItemForm">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="sideItemName" ng-model="sideItemDlCtrl.sideItemName"  ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newSideItemForm.sideItemName.$error" >\n' +
    '                        <div ng-if="newSideItemForm.sideItemName.$error.required && !newSideItemForm.sideItemName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newSideItemForm.sideItemName.$error.minlength || newSideItemForm.sideItemName.$error.maxlength) && !newSideItemForm.sideItemName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'value\' | translate}}</label>\n' +
    '                    <input required type="number" class="mat-input form-control" name="value" ng-model="sideItemDlCtrl.value"  min="1">\n' +
    '                    <div ng-messages="newSideItemForm.value.$error" >\n' +
    '                        <div ng-if="newSideItemForm.value.$error.required && !newSideItemForm.value.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newSideItemForm.$invalid || sideItemDlCtrl.isChanged" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="sideItemDlCtrl.AddNewSideItem()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="sideItemDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newSize.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="sizeDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'NewSizeLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newSizeForm">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="sizeName" ng-model="sizeDlCtrl.sizeName"  ng-minlength="3" ng-maxlength="10">\n' +
    '                    <div ng-messages="newSizeForm.sizeName.$error" >\n' +
    '                        <div ng-if="newSizeForm.sizeName.$error.required && !newSizeForm.sizeName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newSizeForm.sizeName.$error.minlength || newSizeForm.sizeName.$error.maxlength) && !newSizeForm.sizeName.$error.required">{{\'SizeLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newSizeForm.$invalid || sizeDlCtrl.isChanged" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="sizeDlCtrl.AddNewSize()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="sizeDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/newWaiter.html',
    '<div class="modal-content">\n' +
    '        <div class="modal-header bordered">\n' +
    '            <button class="close" type="button" ng-click="waiterDlCtrl.close()">×</button>\n' +
    '            <h2 class="pmd-card-title-text">{{\'NewWaiterLbl\' | translate}}</h2>\n' +
    '        </div>\n' +
    '        <div class="modal-body">\n' +
    '            <form class="form-horizontal" name="newWaiterForm">\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'UserName\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="userName" ng-model="waiterDlCtrl.userName" ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newWaiterForm.userName.$error" >\n' +
    '                        <div ng-if="newWaiterForm.userName.$error.required && !newWaiterForm.userName.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newWaiterForm.userName.$error.minlength || newWaiterForm.userName.$error.maxlength) && !newWaiterForm.userName.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                    <label for="first-name">{{\'Name\' | translate}}</label>\n' +
    '                    <input required type="text" class="mat-input form-control" name="name" ng-model="waiterDlCtrl.name" ng-minlength="3" ng-maxlength="100">\n' +
    '                    <div ng-messages="newWaiterForm.name.$error" >\n' +
    '                        <div ng-if="newWaiterForm.name.$error.required && !newWaiterForm.name.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                        <div ng-if="(newWaiterForm.name.$error.minlength || newWaiterForm.name.$error.maxlength) && !newWaiterForm.name.$error.required">{{\'NameLengthError\' | translate}}</div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div class="form-group pmd-textfield pmd-textfield-floating-label" >\n' +
    '                        <label for="first-name">{{\'WaiterUserPasswordLbl\' | translate}}</label>\n' +
    '                        <input required type="password" class="mat-input form-control" name="password" ng-model="waiterDlCtrl.password" ng-minlength="8" ng-maxlength="25">\n' +
    '                        <div ng-messages="newWaiterForm.password.$error" >\n' +
    '                            <div ng-if="newWaiterForm.password.$error.required && !newWaiterForm.password.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="(newWaiterForm.password.$error.minlength || newWaiterForm.password.$error.maxlength) && !newWaiterForm.password.newPassword.$error.required">Password length must be 8-25 char.</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label" >\n' +
    '                        <label for="first-name">{{\'ConfirmPasswordLbl\' | translate}}</label>\n' +
    '                        <input required type="password" class="mat-input form-control" name="confirmPassword"  ng-model="waiterDlCtrl.confirmPassword" equalto="newWaiterForm.password" >\n' +
    '                        <div ng-messages="newWaiterForm.confirmPassword.$error" >\n' +
    '                            <div ng-if="newWaiterForm.confirmPassword.$error.required && !newWaiterForm.confirmPassword.$pristine">{{\'requiredErr\' | translate}}</div>\n' +
    '                            <div ng-if="newWaiterForm.confirmPassword.$error.equalto && !newWaiterForm.confirmPassword.$error.required">Passwords don\'t match.</div>\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '            </form>\n' +
    '        </div>\n' +
    '        <div class="pmd-modal-action text-right">\n' +
    '            <button ng-disabled="newWaiterForm.$invalid" class="btn pmd-ripple-effect btn-primary" type="button" ng-click="waiterDlCtrl.AddNewWaiter()">{{\'saveChangesBtn\' | translate}}</button>\n' +
    '            <button class="btn pmd-ripple-effect btn-default" type="button" ng-click="waiterDlCtrl.close()">{{\'DiscardBtn\' | translate}}</button>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '    \n' +
    '        \n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/sideItem.html',
    '<div >\n' +
    '        <div style="margin-bottom:10px">\n' +
    '            <button  ng-click="sideItemCtrl.openSideItemDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddSideItemBtn\' | translate}}</button>\n' +
    '    \n' +
    '        </div>\n' +
    '        <div ng-if="sideItemCtrl.sideItems.results.length == 0">\n' +
    '                <span>{{\'NoSideItemsAvailable\' | translate}}</span>\n' +
    '            </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="sideItemCtrl.sideItems.results.length > 0">\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th >{{\'Name\' | translate}}</th>\n' +
    '                            <th >{{\'value\' | translate}}</th>\n' +
    '                            <th ></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <tr ng-repeat="item in sideItemCtrl.sideItems.results">\n' +
    '                            <td data-title="Name" width="40%">{{item.sideItemName}}</td>\n' +
    '                            <td data-title="Name" width="40%">{{item.value}}</td>\n' +
    '                            <td  width="20%">\n' +
    '                                <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="sideItemCtrl.openEditSideItemDialog($index)">mode_edit</i> \n' +
    '                                <i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="sideItemCtrl.openDeleteSideItemDialog(item.sideItemName,item.sideItemId)">delete</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '            <div style="text-align:center;" paging page="1" page-size="10" total="sideItemCtrl.sideItems.totalCount" paging-action="sideItemCtrl.changePage( page)"\n' +
    '            flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '               </div>\n' +
    '        </div> \n' +
    '    \n' +
    '    \n' +
    '    </div>					\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/size.html',
    '<div >\n' +
    '        <div style="margin-bottom:10px">\n' +
    '            <button  ng-click="sizeCtrl.openSizeDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddSizeBtn\' | translate}}</button>\n' +
    '    \n' +
    '        </div>\n' +
    '        <div ng-if="sizeCtrl.sizes.results.length == 0">\n' +
    '                <span>{{\'NoSizesAvailable\' | translate}}</span>\n' +
    '            </div>\n' +
    '        <div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="sizeCtrl.sizes.results.length > 0">\n' +
    '            <div class="table-responsive">\n' +
    '                <table class="table pmd-table table-hover">\n' +
    '                    <thead>\n' +
    '                        <tr>\n' +
    '                            <th >{{\'Name\' | translate}}</th>\n' +
    '                            <th ></th>\n' +
    '                        </tr>\n' +
    '                    </thead>\n' +
    '                    <tbody>\n' +
    '                        <tr ng-repeat="size in sizeCtrl.sizes.results">\n' +
    '                            <td data-title="Name" width="30%">{{size.sizeName}}</td>\n' +
    '                            <td  width="70%">\n' +
    '                                <i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="sizeCtrl.openEditSizeDialog($index)">mode_edit</i> \n' +
    '                                <i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="sizeCtrl.openDeleteSizeDialog(size.sizeName,size.sizeId)">delete</i>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </tbody>\n' +
    '                </table>\n' +
    '            </div>\n' +
    '            <div style="text-align:center;" paging page="1" page-size="10" total="sizeCtrl.sizes.totalCount" paging-action="sizeCtrl.changePage( page)"\n' +
    '            flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '               </div>\n' +
    '        </div> \n' +
    '    \n' +
    '    \n' +
    '    </div>					\n' +
    '    ');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/RestaurantAdmin/templates/waiter.html',
    '<div >\n' +
    '	<div style="margin-bottom:10px">\n' +
    '		<button  ng-click="waiterCtrl.openWaiterDialog()" class="btn pmd-ripple-effect btn-primary pmd-z-depth" type="button">{{\'AddWaiterBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '	<div ng-if="waiterCtrl.waiters.results.length == 0">\n' +
    '			<span>{{\'NoWaiterAvailable\' | translate}}</span>\n' +
    '		</div>\n' +
    '	\n' +
    '	<div class="pmd-card pmd-z-depth pmd-card-custom-view" ng-if="waiterCtrl.waiters.results.length > 0">\n' +
    '		<div class="table-responsive">\n' +
    '			<table class="table pmd-table table-hover">\n' +
    '				<thead>\n' +
    '					<tr>\n' +
    '						<th >{{\'Name\' | translate}}</th>\n' +
    '						<th >{{\'UserName\' | translate}}</th>\n' +
    '						<th ></th>\n' +
    '					</tr>\n' +
    '				</thead>\n' +
    '				<tbody>\n' +
    '					<tr ng-repeat="waiter in waiterCtrl.waiters.results">\n' +
    '						<td data-title="Name" width="50%">{{waiter.name}}</td>\n' +
    '						<td>\n' +
    '                            {{waiter.userName}}\n' +
    '						</td>\n' +
    '						<td >\n' +
    '							<i class="material-icons md-dark pmd-md cursorPointer font25" ng-click="waiterCtrl.openEditWaiterDialog($index)">mode_edit</i> \n' +
    '							<i class="material-icons pmd-md deleteButton cursorPointer font25" ng-click="waiterCtrl.openDeleteWaiterDialog(waiter.userName,waiter.userId)">delete</i>\n' +
    '						</td>\n' +
    '					</tr>\n' +
    '				</tbody>\n' +
    '			</table>\n' +
    '		</div>\n' +
    '		<div style="text-align:center;" paging page="1" page-size="10" total="waiterCtrl.menus.totalCount" paging-action="waiterCtrl.changePage( page)"\n' +
    '		flex="nogrow" show-prev-next="true" show-first-last="true" hide-if-empty="true" disabled-class="hide">\n' +
    '		   </div>\n' +
    '	</div> \n' +
    '\n' +
    '\n' +
    '</div>					\n' +
    '');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/Delete/templates/ConfirmDeleteDialog.html',
    '<div class="modal-content">\n' +
    '	<div class="modal-body">{{\'deleteConfirmationLbl\' | translate}}<strong>{{deleteDlCtrl.itemName}}</strong> {{deleteDlCtrl.message}}? </div>\n' +
    '	<div class="pmd-modal-action text-right">\n' +
    '		<button class="btn pmd-ripple-effect btn-primary pmd-btn-flat" type="button" ng-click="deleteDlCtrl.Confirm()">{{\'deleteBtn\' | translate}}</button>\n' +
    '		<button class="btn pmd-ripple-effect btn-default pmd-btn-flat" type="button" ng-click="deleteDlCtrl.close()">{{\'cancelBtn\' | translate}}</button>\n' +
    '	</div>\n' +
    '</div>');
}]);

angular.module('home').run(['$templateCache', function($templateCache) {
  $templateCache.put('./app/core/login/templates/login.html',
    '<div class="logincard" ng-if="!isLoggedIn()">\n' +
    '  	<div class="pmd-card card-default pmd-z-depth">\n' +
    '		<div class="login-card">\n' +
    '			<form ng-submit="submit(username,password)" name="loginForm">	\n' +
    '				<div class="pmd-card-body">\n' +
    '					<div class="alert alert-success" role="alert"> Oh snap! Change a few things up and try submitting again. </div>\n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Username</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">perm_identity</i></div>\n' +
    '                            <input type="text" class="form-control" id="exampleInputAmount" required name="username" ng-model="username" ng-change="reset()">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                    \n' +
    '                    <div class="form-group pmd-textfield pmd-textfield-floating-label">\n' +
    '                        <label for="inputError1" class="control-label pmd-input-group-label">Password</label>\n' +
    '                        <div class="input-group">\n' +
    '                            <div class="input-group-addon"><i class="material-icons md-dark pmd-sm">lock_outline</i></div>\n' +
    '                            <input required type="password" name="password" ng-model="password" ng-change="reset()" minlength="6"  class="form-control" id="exampleInputAmount">\n' +
    '                        </div>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="invalidLoginInfo" class="loginFailed">\n' +
    '                    <span>Incorrect username or password.</span>\n' +
    '                </div>\n' +
    '                <div ng-if="inActiveUser" class="loginFailed">\n' +
    '                    <span>Your account is deleted.</span>\n' +
    '                </div>\n' +
    '				<div class="pmd-card-footer card-footer-no-border card-footer-p16 text-center">\n' +
    '					<button  type="submit" class="btn pmd-ripple-effect btn-primary btn-block">Login</button>\n' +
    '				</div>\n' +
    '			</form>\n' +
    '		</div>\n' +
    '		\n' +
    '		\n' +
    '	</div>\n' +
    '</div>\n' +
    '');
}]);
