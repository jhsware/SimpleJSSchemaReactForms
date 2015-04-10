'use strict';
var React       = require('react/addons');

var DropDown = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        options: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                title: React.PropTypes.string.isRequired
            })
        ).isRequired,
        value: React.PropTypes.oneOfType([
              React.PropTypes.string,
              React.PropTypes.number,
        ]),
        formErrors: React.PropTypes.shape({
                fieldErrors: React.PropTypes.object,
                invariantErrors: React.PropTypes.array
        }),
        onChange: React.PropTypes.func
    },
        
    didSelect: function (e) {
        // console.log("[RadioButton] onChange: " + this.props.name + " = " + value);
        var tmpValue = this.getDOMNode().value;
        if (this.props.formSchema) {
            if (this.props.formSchema && !this.props.formSchema._fields[this.props.name]) {
                console.error("[DropDown] The schema " + this.props.formSchema.name + " is missing a field called: " + this.props.name + " (or perhaps you misspelled it... check the form field widget)");
            }
            tmpValue = this.props.formSchema._fields[this.props.name].fromString(tmpValue);
        }
        this.props.onChange(this.props.name, tmpValue);
    },
    
    componentWillUpdate: function (nextProps, nextState) {
        if (nextProps.value == 'other' && this.props.value != 'other') {
            // We just selected the other alternative, if it is an input field
            // we should give it focus
            if (nextProps.other) {
                nextProps.other.props.focusNow = true;
            }
        }
    },
    
    render: function () {
        
        var OptionEls = this.props.options.map(function (option, keyIndex) {
            return (
                <option key={'option-' + keyIndex} value={option.name}>{option.title}</option>
            )
        }.bind(this));

        return (
            <select className="drop-down" value={this.props.value} onChange={this.didSelect}>
                {OptionEls}
            </select>
        );
    }
});

module.exports = DropDown;
