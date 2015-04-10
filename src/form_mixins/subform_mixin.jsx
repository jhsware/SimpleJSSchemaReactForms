'use strict';

/*

    Usage:

    1 Add this mixin

    2 Add a formSchema for validation

    You should now have something like this

        var TheSubform = React.createClass({
    
            mixins: [subformMixin],
    
            formSchema: theFormSchema,
    
            render: function () {
                // Your component render method
            }
        });

    3 Make sure the component is passed the attributes:

        - onChange = function (name, value) -- called on form updates
        - name -- the attribute name for the data in the calling forms form_data
        - value -- form data that is manipulated by this form (not the entire data structure of 
            parent form (might be a use case for that too depending on how you compose your form))

    You call the component like this:

        <TheSubform onChange={this.didUpdate} name="attr_name" value={this.state.form_data['attr_name']} />

    => You get the helper methods:

    - didUpdate -- calls parent on data changes, pass to onChange for subforms and fields
    - _validateFormData -- validates the form based on given formSchema
    - formDataIsValid

*/
var _ = require('lodash');
var ObjectField = require('isomorphic-schema').field_validators.object_field;

var subFormMixin = {
    _validateFormData: function (state, props, options) {
        // Performs schema validation on props, returns state
        // with errors added
        this.formSchema.validate(props.value, options);
        
        state.field_errors = _.cloneDeep(this.formSchema.field_errors);
        state.invariant_errors = _.cloneDeep(this.formSchema.invariant_errors);
        
        // Add field errors from server if there are some for this object property
        if (props.serverFieldErrors && props.serverFieldErrors[props.name]) {
            var serverFieldErrors = props.serverFieldErrors[props.name]
            state.field_errors = _.extend(state.field_errors || {}, serverFieldErrors);
        }
        
        return state;
    },
    
    formDataIsValid: function () {
        return this.formSchema.isValid(this.state.field_errors, this.state.invariant_errors);
    },
    
    didUpdate: function (name, value, updatedAttributes) {
        var widgetValue = this.props.value;
        widgetValue[name] = this.formSchema._fields[name].fromString(value);
        
        // Mark the attribute that has been updated so
        // we can clear server errors in the main form
        var newUpdatedAttributes = {};
        newUpdatedAttributes[name] = updatedAttributes || true;
        
        this.props.onChange(this.props.name, widgetValue, newUpdatedAttributes);
    },
    
    componentWillMount: function () {
        // This method is called on first render
        var state = this._validateFormData(this.state, this.props, {skipInvariants: true});
        this.setState(state);
    },
    
    componentWillReceiveProps: function (nextProps) {
        // This method is called on prop changes, but not first render
        var state = this._validateFormData(this.state, nextProps);
        
        this.setState(state);
    }
    
}

module.exports = subFormMixin;