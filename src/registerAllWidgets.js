'use strict';
var formFieldWidgets = require('./form_field_widgets');

module.exports = function (registry) {
    registry.adapterRegistry.registerAdapter(formFieldWidgets.TextInputAdapter);
    registry.adapterRegistry.registerAdapter(formFieldWidgets.IntegerInputAdapter);
    registry.adapterRegistry.registerAdapter(formFieldWidgets.EmailInputAdapter);
    
    registry.adapterRegistry.registerAdapter(formFieldWidgets.TextAreaInputAdapter);
    
    registry.adapterRegistry.registerAdapter(formFieldWidgets.DropDownAdapter);
    
    registry.utilityRegistry.registerUtility(formFieldWidgets.ActionButtonUtility);
};