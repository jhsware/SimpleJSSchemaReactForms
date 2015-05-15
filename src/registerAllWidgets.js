'use strict';
var registry = require('protoncms-core').registry;
var formFieldWidgets = require('./form_field_widgets');
var AutoForms = require('./AutoForms');

module.exports = function () {
    registry.registerAdapter(formFieldWidgets.TextInputAdapter);
    registry.registerAdapter(formFieldWidgets.IntegerInputAdapter);
    registry.registerAdapter(formFieldWidgets.EmailInputAdapter);

    registry.registerAdapter(formFieldWidgets.TextAreaInputAdapter);

    registry.registerAdapter(formFieldWidgets.DropDownAdapter);

    registry.registerUtility(formFieldWidgets.ActionButtonUtility);  
    
    registry.registerAdapter(AutoForms.Adapter);
    registry.registerUtility(AutoForms.Utility);
      
}
