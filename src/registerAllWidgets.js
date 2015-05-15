'use strict';
var registry = require('protoncms-core').registry;
var formFieldWidgets = require('./form_field_widgets');

registry.registerAdapter(formFieldWidgets.TextInputAdapter);
registry.registerAdapter(formFieldWidgets.IntegerInputAdapter);
registry.registerAdapter(formFieldWidgets.EmailInputAdapter);

registry.registerAdapter(formFieldWidgets.TextAreaInputAdapter);

registry.registerAdapter(formFieldWidgets.DropDownAdapter);

registry.registerUtility(formFieldWidgets.ActionButtonUtility);
