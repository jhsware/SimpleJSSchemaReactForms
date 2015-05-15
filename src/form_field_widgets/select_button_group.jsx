'use strict';
var createAdapter = require('component-registry').createAdapter;

var ISelectField = require('isomorphic-schema').interfaces.ISelectField;
var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var DummyInputWidget = require('react-formlib').form_field_widgets.DummyField;

// TODO: Implement select button group

var DummyInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: ISelectField,
    
    ReactComponent: DummyInputWidget
});

module.exports = DummyInputAdapter;

