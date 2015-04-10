'use strict';
var React       = require('react/addons');

var FieldError  = require('./field_error');

var FieldMixin  = require('../form_mixins/field_mixin');

var ListItemField = React.createClass({
    didChange: function (e) {
        e.preventDefault();
        
        var value = this.refs.theField.getDOMNode().value;
        if (this.props.suffix) {
            value = value.replace(this.props.suffix, '');
        };

        // console.log("[TextField] onChange: " + this.props.name + " = " + value);
        this.props.onChange(this.props.name, value );
    },
    
    render: function () {
        // Wrap the fieldErrors so they work with FieldError component
        var formErrors = {
            fieldErrors: this.props.fieldErrors
        };
        
        return (
            <div className={'inputGroup ' + this.props.inputClasses}>
                <div className="inputGroup__input">
                    <input ref="theField"
                        value={this.props.value}
                        type="text"
                        className={'inputGroup__field ' + this.props.inputClasses}
                        onChange={this.didChange}
                        placeholder={this.props.placeholder} />
                </div>
                <FieldError fieldName={this.props.name} formErrors={formErrors} />
            </div>
        )
    }
});

var ListField = React.createClass({
    mixins: [FieldMixin],

    propTypes: {
        // Some more propTypes in fieldMixin

        placeholder: React.PropTypes.string,
        suffix: React.PropTypes.string, // Add a suffix to the value in the textbox
    },

    didSelect: function (index, value) {
        var newValue = this.props.value;
        newValue[index] = value;
        // console.log("[TextField] onChange: " + this.props.name + " = " + value);
        this.props.didChange(newValue);
    },

    render: function () {
        
        var tmpFieldErrors = this.props.formErrors.fieldErrors;
        var itemFormErrors = tmpFieldErrors && tmpFieldErrors[this.props.name] && tmpFieldErrors[this.props.name].errors;

        return (
            <div>
            
                {
                    // List item widgets
                    this.props.value.map(function (item, i) {
                        return (<ListItemField 
                                    inputClasses="" name={i.toString()} placeholder={'Namn på mottagaren för gåvobevis ' + (i + 1)}
                                    value={item} 
                                    fieldWidget={this.props.fieldWidget} 
                                    fieldErrors={itemFormErrors} 
                                    onChange={this.didSelect} />)
                    }.bind(this))
                }
                
            </div>
        );
    }
});

module.exports = ListField;
