'use strict';

/*

    Usage:

    1 Add this mixin

    2 Add a formSchema for validation

    3 Make sure the component has created a default state

    You should now have something like this

        var TheForm = React.createClass({
    
            mixins: [formMixin],
    
            formSchema: theFormSchema,
    
            getInitialState: function () {
                var state = {  
                    form_data: {
                        attr_1: undefined,
                        attr_2: undefined,
                        obj_1: {
                            attr_1: undefined
                        }
                    }
                };
                return state;
            },

            render: function () {
                // Your component render method
            }
        });

    => You get the helper methods:

    - didUpdate -- updates form_data, pass to onChange for subforms and fields
    - _validateFormData -- validates the form based on given formSchema
    - formDataIsValid -- checks if the form validation returned any errors

*/

var _ = require('lodash');
var ObjectField = require('isomorphic-schema').field_validators.object_field;

var formMixin = {
    _validateFormData: function (state, options) {
        // Performs schema validation on passed state, returns state
        // with errors added
        this.formSchema.validate(state.form_data, options);
        state.field_errors = _.cloneDeep(this.formSchema.field_errors);
        state.invariant_errors = _.cloneDeep(this.formSchema.invariant_errors);
        return state;
    },
    
    didUpdate: function (name, value, updatedAttributes) {
        // Update the form
        var state = this.state;
        state.form_data[name] = this.formSchema._fields[name].fromString(value);
                
        // Mark the attribute that has been updated so
        // we can clear server errors in the main form
        var newUpdatedAttributes = {};
        newUpdatedAttributes[name] = updatedAttributes || true;
                
        // Then clear the server error for the updated fields, if needed
        var clearServerErrors = function(serverFieldError, updatedAttributes) {
            _.map(updatedAttributes, function (attr, key) {
                if (attr === true && serverFieldError[key]) {
                    delete serverFieldError[key];
                } else {
                    clearServerErrors(serverFieldError[key], attr);
                }
            })
        }
        state.server_errors && state.server_errors.field_errors && clearServerErrors(state.server_errors.field_errors, newUpdatedAttributes);
        
        // Validate form
        state = this._validateFormData(state, {skipInvariants: true});
        
        this.setState(state);
        
        // Call afterDidUpdate when done to allow form specific manipulation such as syncing data
        // at different levels in the data structure.
        this.afterDidUpdate && this.afterDidUpdate(name, value);
        // Note, this can cause a server error not to be cleared if a submit is made that
        // returns errors and then we change the input at a different place but return to
        // the subform which has had it's properties changed in a afterDidUpdate hook. However
        // this is an uncommon way of using the form so we can live with it for now.
    },
    
    componentWillMount: function () {
        // This method is called on first render
        var state = this._validateFormData(this.state, {skipInvariants: true});
        this.setState(state);
    },
    
    formDataIsValid: function () {
        return this.formSchema.isValid(this.state.field_errors, this.state.invariant_errors);
    },
    
}

module.exports = formMixin;