'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createAdapter = require('component-registry').createAdapter;

var ISelectField = require('isomorphic-schema').interfaces.ISelectField;
var IInputFieldWidget = require('../interfaces').IInputFieldWidget;
var DropDownWidget = require('react-formlib').form_field_widgets.DropDown;

var DropDownAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: ISelectField,
    
    ReactComponent: DropDownWidget
});

module.exports.DropDownAdapter = DropDownAdapter;