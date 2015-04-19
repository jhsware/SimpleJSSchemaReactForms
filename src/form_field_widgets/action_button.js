'use strict';
'use strict';
/*

    To use this input widget adapter you need to register it with your
    adapter registry.

*/
var createUtility = require('component-registry').createUtility;

var IActionButtonWidget = require('../interfaces').IActionButtonWidget;
var ActionButtonWidget = require('react-formlib').form_field_widgets.ActionButton;

var ActionButtonUtility = createUtility({
    implements: IActionButtonWidget,
    
    ReactComponent: ActionButtonWidget
});

module.exports.ActionButtonUtility = ActionButtonUtility;