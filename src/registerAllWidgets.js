'use strict';
var formFieldWidgets = require('./form_field_widgets');

module.exports = function (adapterRegistry) {
    adapterRegistry.registerAdapter(formFieldWidgets.TextInputAdapter);
    adapterRegistry.registerAdapter(formFieldWidgets.IntegerInputAdapter);
    
    adapterRegistry.registerAdapter(formFieldWidgets.DropDownAdapter);
};