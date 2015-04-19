'use strict';
var createInterface = require('component-registry').createInterface;

var IInputFieldWidget = createInterface({
    name: 'IInputFieldWidget'
    // Render an input field as HTML
});
module.exports.IInputFieldWidget = IInputFieldWidget;

var IActionButtonWidget = createInterface({
    name: 'IActionButtonWidget'
    // Render an action button as HTML
});
module.exports.IActionButtonWidget = IActionButtonWidget;
