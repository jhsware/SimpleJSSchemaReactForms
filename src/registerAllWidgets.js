'use strict';
var formFieldWidgets = require('./form_field_widgets');

module.exports = function (registry) {
    registry.registerAdapter(formFieldWidgets.TextInputAdapter);
    registry.registerAdapter(formFieldWidgets.IntegerInputAdapter);
    registry.registerAdapter(formFieldWidgets.EmailInputAdapter);
    
    registry.registerAdapter(formFieldWidgets.CheckboxInputAdapter);

    registry.registerAdapter(formFieldWidgets.TextAreaInputAdapter);

    registry.registerAdapter(formFieldWidgets.DropDownAdapter);

    registry.registerUtility(formFieldWidgets.ActionButtonUtility);  
}
