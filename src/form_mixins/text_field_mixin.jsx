'use strict';
/*
    Here are some convenience methods for form_field widgets
*/
var React       = require('react/addons');

var fieldMixin = {
    componentDidMount: function () {
        var $el = $(this.getDOMNode()).find("input")
        $el.on('blur', function (e) {
            this.componentWillReceiveProps(this.props);
            // this.didLooseFocus && this.didLooseFocus(e);
        }.bind(this))
    },

    componentWillUnmount: function () {
        var $el = $(this.getDOMNode()).find("input")
        $el.off('blur');
    },
    
    getInitialState: function () {
        var state = this._fieldErrorStateUpdate({}, this.props);
        return state;
    },
    
    _fieldErrorStateUpdate: function (state, nextProps) {    
        // Don't update validation during data entry, it gets confusing
        if (!state.isEditing) {
            state.errMsg = this.getErrorMessage(nextProps);
            state.bsStyle = this.getBsValidationState(nextProps);            
        }
    
        // Clear updated marker
        state.isEditing = false;
        return state;
    },

    componentWillReceiveProps: function (nextProps) {
        var state = this._fieldErrorStateUpdate(this.state, nextProps);
        this.setState(state);
    }
};

module.exports = fieldMixin;