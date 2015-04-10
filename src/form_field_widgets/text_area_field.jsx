'use strict';
var React       = require('react/addons');
var FieldError  = require('./field_error');

var FieldMixin  = require('../form_mixins/field_mixin');

var TextAreaField = React.createClass({
    mixins: [FieldMixin],

    propTypes: {
        // Some more propTypes in fieldMixin

        placeholder: React.PropTypes.string,
        suffix: React.PropTypes.string, // Add a suffix to the value in the textbox
    },

    render: function () {

        return (
            <div className={'inputGroup '}>
                <div className="inputGroup__input">
                    <textarea ref="theField"
                           value={this.getFormattedValue()}
                           type="text"
                           className={'inputGroup__field '}
                           onChange={this.didChange}
                           placeholder={this.props.placeholder} />
                </div>
                <FieldError fieldName={this.props.name} formErrors={this.props.formErrors} />
            </div>
        );
    }
});

module.exports = TextAreaField;
