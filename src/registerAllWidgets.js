'use strict';
var TextInputAdapter = require('./form_field_widgets').TextInputAdapter;

module.exports = function (adapterRegistry) {
    adapterRegistry.registerAdapter(TextInputAdapter);
};