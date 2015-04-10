'use strict';
/*
    Here are some convenience methods for form_field widgets
*/

var React       = require('react/addons');

var fieldMixin = {
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.node,
        
        formSchema: React.PropTypes.object,
        onChange: React.PropTypes.func.isRequired,
        
        formErrors: React.PropTypes.shape({
                fieldErrors: React.PropTypes.object,
                invariantErrors: React.PropTypes.array
        }),
        
        label: React.PropTypes.string,
        help: React.PropTypes.string,
    },
    
    hasPropInFormSchema: function () {
        // Check for missing schema field
        if (this.props.formSchema && !this.props.formSchema._fields[this.props.name]) {
            console.error("[FieldMixin] The schema " + this.props.formSchema.name + " is missing a field called: " + this.props.name + " (or perhaps you misspelled it... check the form field widget)");
            return false;
        } else {
            return true;
        }
    },
    
    getInitialState: function () {
        return {};
    },
    
    didChange: function (e) {
        e.preventDefault();
        
        // Mark that this field just changed
        var state = this.state;
        state.isEditing = true;
        this.setState(state);
        
        var value = e.target.value;
        
        if (!this.hasPropInFormSchema()) return;
        
        // Convert field content to correct data type
        if (this.props.formSchema && value) {
            value = this.props.formSchema._fields[this.props.name].fromString(value);
        }
        
        // Return the changed value
        this.props.onChange(this.props.name, value );
    },

    isValid: function (nextProps) {
        if (!this.hasPropInFormSchema(nextProps)) return;
        
        var theProps = nextProps || this.props;
        
        // Check if field is valid
        var isValid;
        if (this.getErrorObj(theProps)) {
            isValid = false;
        } else if (theProps.value) {
            isValid = true;
        };
        return isValid;
    },
    
    isRequired: function () {
        if (!this.hasPropInFormSchema()) return;
        
        // Check if field is required
        var isRequired = theProps.formSchema && theProps.formSchema._fields[theProps.name]._isRequired;
        return isRequired;
    },
    
    getBsValidationState: function (nextProps) {
        var errorObj = this.getErrorObj(nextProps);
        
        var bsValidationState;
        if (typeof errorObj !== 'undefined') {
            switch (errorObj.type) {
                case "type_error":
                case "constraint_error":
                    bsValidationState = 'error';
                    break; 
                case "required":
                    break;
                default:
                    break;
            }
        } else if (this.isValid(nextProps)) {
            bsValidationState = 'success';
        };
        return bsValidationState;
    },
    
    getErrorObj: function (nextProps) {
        var theProps = nextProps || this.props;
        // Get error message
        var error;
        if (theProps.formErrors && theProps.formErrors.fieldErrors) {
            var error = theProps.formErrors.fieldErrors[theProps.name];
        }
        return error;
    },
    
    getErrorMessage: function (nextProps) {
        var errorObj = this.getErrorObj(nextProps);
        return errorObj && errorObj.message;
    },
    
    getFormattedValue: function () {
        if (!this.hasPropInFormSchema()) return;
        
        // Format field content
        var value = this.props.value || '';
        if (this.props.formSchema && value) {
            value = this.props.formSchema._fields[this.props.name].toFormattedString(value);            
        }
        return value;
    },
    
    getFieldType: function () {
        return this.props.formSchema && this.props.formSchema._fields[this.props.name]
    }
}

module.exports = fieldMixin;
