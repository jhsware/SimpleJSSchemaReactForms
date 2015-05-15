'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createAdapter = require('component-registry').createAdapter;

var ITextField = require('isomorphic-schema').interfaces.ITextField;
var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var TextInputWidget = require('react-formlib').form_field_widgets.TextField;

var TextInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: ITextField,
    
    ReactComponent: TextInputWidget
});

module.exports.TextInputAdapter = TextInputAdapter;

var IIntegerField = require('isomorphic-schema').interfaces.IIntegerField;

var IntegerInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: IIntegerField,
    
    ReactComponent: TextInputWidget
});

module.exports.IntegerInputAdapter = IntegerInputAdapter;

var IBoolField = require('isomorphic-schema').interfaces.IBoolField;
var CheckboxInputWidget = require('react-formlib').form_field_widgets.CheckBoxField;

var CheckboxInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: IBoolField,
    
    ReactComponent: CheckboxInputWidget
});

module.exports.CheckboxInputAdapter = CheckboxInputAdapter;