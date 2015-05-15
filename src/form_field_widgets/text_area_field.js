'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createAdapter = require('component-registry').createAdapter;

var ITextAreaField = require('isomorphic-schema').interfaces.ITextAreaField;
var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var TextAreaInputWidget = require('react-formlib').form_field_widgets.TextAreaField;

var TextAreaInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: ITextAreaField,
    
    ReactComponent: TextAreaInputWidget
});

module.exports.TextAreaInputAdapter = TextAreaInputAdapter;