'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createAdapter = require('component-registry').createAdapter;

var IEmailField = require('isomorphic-schema').interfaces.IEmailField;
var IInputFieldWidget = require('../interfaces').IInputFieldWidget;
var TextInputWidget = require('react-formlib').form_field_widgets.TextField;

var EmailInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: IEmailField,
    
    ReactComponent: TextInputWidget
});

module.exports.EmailInputAdapter = EmailInputAdapter;