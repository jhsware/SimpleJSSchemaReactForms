'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createAdapter = require('component-registry').createAdapter;

var ITextField = require('isomorphic-schema').interfaces.ITextField;
var IInputFieldWidget = require('../interfaces').IInputFieldWidget;
var TextInputWidget = require('react-formlib').form_field_widgets.TextField;

var Component = createAdapter({
    implements: IInputFieldWidget,
    adapts: ITextField,
    
    ReactComponent: TextInputWidget
});

module.exports = Component;