'use strict';
var createAdapter = require('component-registry').createAdapter;

var IListField = require('isomorphic-schema').interfaces.IListField;
var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var ListInputWidget = require('react-formlib').form_field_widgets.ListField;
/* TODO: Implement proper widget */
var DummyInputWidget = require('react-formlib').form_field_widgets.DummyField;

var DummyInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: IListField,
    
    ReactComponent: DummyInputWidget
});

module.exports = DummyInputAdapter;
