'use strict';
var createAdapter = require('component-registry').createAdapter;

var IListField = require('isomorphic-schema').interfaces.IListField;
var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var ListInputWidget = require('react-formlib').form_field_widgets.ListField;

var ListInputAdapter = createAdapter({
    implements: IInputFieldWidget,
    adapts: IListField,
    
    ReactComponent: ListInputWidget
});

module.exports = ListInputAdapter;
