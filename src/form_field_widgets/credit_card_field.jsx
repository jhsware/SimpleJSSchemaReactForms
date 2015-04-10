'use strict';
var React       = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

var Input       = require('react-bootstrap').Input;

var FieldMixin  = require('../form_mixins/field_mixin');
var TextFieldMixin  = require('../form_mixins/text_field_mixin');
var FieldError = require('./field_error');

var CreditCardField = React.createClass({
    mixins: [FieldMixin, TextFieldMixin],

    propTypes: {
        // Some more propTypes in fieldMixin

        placeholder: React.PropTypes.string,
    },

    render: function () {

        // Check vad card type we have and add a class
        var metaData = (this.props.value && this.getFieldType().getMetaData(this.props.value)) || {};
        var CardTypeEl;
        if (metaData.card_type) {
            CardTypeEl = <div className={'credit-card-field__card-' + metaData.card_type.name} />
        };

        return (
            <ReactTransitionGroup className="animated-form-field">
                <Input
                    type="text"
                    value={this.getFormattedValue()}
                    placeholder={this.props.placeholder}
                    label={this.props.label}
                    help={undefined}
                    bsStyle={this.state.bsStyle}
                    hasFeedback
            
                    addonAfter={this.props.addonAfter}
                    addonBefore={this.props.addonBefore}
            
                    ref="input"
                    groupClassName="group-class"
                    wrapperClassName="wrapper-class"
                    labelClassName="label-class"
                    onChange={this.didChange} />
                
                { this.state.errMsg && <FieldError key='help-message' message={this.state.errMsg} /> }
            </ReactTransitionGroup>
        );
    }
});

module.exports = CreditCardField;
