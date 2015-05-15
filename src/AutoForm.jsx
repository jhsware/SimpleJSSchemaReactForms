'use strict';
var registry = require('protoncms-core').registry;
var React = require('react');
var createAdapter = require('component-registry').createAdapter;
var createUtility = require('component-registry').createUtility;

var IProtonObject = require('protoncms-core').interfaces.IProtonObject;

var formMixin = require('react-formlib').form_mixins.form_mixin;

var IInputFieldWidget = require('protoncms-core').interfaces.IInputFieldWidget;
var IAutoFormWidget = require('protoncms-core').interfaces.IAutoFormWidget;

var FormGenerator = React.createClass({
    
    mixins: [formMixin],
    
    getInitialState: function () {
        var state = {}
        state.context = this.props.context;
        return state;
    },
    
    componentWillReceiveProps: function (nextProps) {
        var state = this.state;
        state.context = nextProps.context;
        this.setState(state);
    },

    render: function() {
        
        var context = this.state.context;
        
        var theFormEls = [];
        
        var formSchema = this.props.formSchema;
        var schemaFields = formSchema._fields;
        
        for (var fieldKey in schemaFields) {
            var InputWidget = global.adapterRegistry.getAdapter(schemaFields[fieldKey], IInputFieldWidget).ReactComponent;
            var theSchemaField = schemaFields[fieldKey];
            theFormEls.push(
                <div className="IEditObject-formRow">
                    <InputWidget
                        formSchema={formSchema}
                        name={fieldKey}
                        options={theSchemaField.options}
                        fieldErrors={this.state.fieldErrors}
                        invariantErrors={this.state.invariantErrors}
                        serverErrors={this.props.server_errors}
                        
                        type="text"
                        value={context[fieldKey]}
                        placeholder={theSchemaField.placeholder}
                        label={theSchemaField.label}
                        help={theSchemaField.help}
                        addonAfter={theSchemaField.prefix}
                        addonBefore={theSchemaField.suffix}
                        hasFeedback 
                        
                        onChange={this.didUpdate} />
                </div>
            )
        };
        
        return (
            <div className="IAutoFormWidget">

                {theFormEls}

            </div>
        );
    }
});

module.exports.Adapter = createAdapter({
    implements: IAutoFormWidget,
    adapts: IProtonObject,
    
    ReactComponent: FormGenerator
});



module.exports.Utility = createUtility({
    implements: IAutoFormWidget,
    
    ReactComponent: FormGenerator
});
