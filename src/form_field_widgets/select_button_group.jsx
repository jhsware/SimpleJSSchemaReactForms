'use strict';
var React       = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var FieldMixin  = require('../form_mixins/field_mixin');
var CollapseHeightMixin  = require('../form_mixins/animation_mixin').CollapseHeightMixin;

var Other = React.createClass({
    mixins: [CollapseHeightMixin],
    
    animationClassName: "collapse-height",
    
    /*
    componentWillEnter: function (callback) {
        console.log("Will enter...");
        callback();
    },
    */
        
    render: function () {
        return (
            <div className="select-btn-group__other">
                {this.props.children}
            </div>
        )
    }
})

var Button = React.createClass({
    didSelect: function (e) {
        e.preventDefault();
        e.target.value = this.props.value;
        this._owner.didSelect(e);
    },

    render: function () {
        var cx = React.addons.classSet;
        
        var btnClasses = {
            'btn': true,
            'active': this.props.selected
        }
        
        // Add button style
        var btnStyleClass = 'btn-' + (this.props.selected ? 'primary' : 'default');
        btnClasses[btnStyleClass] = true;
        
        // Make block level button
        if (this.props.block) {
            btnClasses['btn-block'] = true;
        }
        
        return (
            <a onClick={this.didSelect} type="button" className={cx(btnClasses)} role="button">{this.props.title}</a>
        );
    }
});

var SelectButtonGroup = React.createClass({
    mixins: [FieldMixin],

    propTypes: {
        name: React.PropTypes.string,
        options: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,
                title: React.PropTypes.string.isRequired
            })
        ).isRequired,
        value: React.PropTypes.string,
        formErrors: React.PropTypes.shape({
                fieldErrors: React.PropTypes.object,
                invariantErrors: React.PropTypes.array
        }),
        layout: React.PropTypes.oneOf(['justified','vertical']),
        other: React.PropTypes.object,
        cellWidth: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    didSelect: function (e) {
        // console.log("[RadioButton] onChange: " + this.props.name + " = " + value);
        this.didChange(e);
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
        var cssClass = this.props.className ? ' ' + this.props.className : '';
        var OptionEls = this.props.options.map(function (option, keyIndex) {
            var isSelected = option.name == this.props.value;
            var attrs = {
                key: 'option-' + keyIndex,
                value: option.name,
                title: option.title,
                selected: isSelected
            }
            if (this.props.layout == 'vertical') {
                attrs['block'] = true;
            }
            return (
                <Button {...attrs} />
            )
        }.bind(this));
        
        // Should we show "other"?
        var OtherEl;
        if (this.props.value == 'other') {
            OtherEl = <Other key="other-el">{this.props.other}</Other>
        }
        
        // Pass the layout attribute to ButtonGroup
        var attrs = {};
        if (this.props.layout) {
            attrs[this.props.layout] = true;
        }
        if (this.props.layout == 'vertical') {
            attrs['block'] = true;
        }
        
        var cx = React.addons.classSet;
        var cssCls = {};
        if (this.props.layout == 'vertical') {
            cssCls['btn-group-vertical'] = true;
            cssCls['btn-block'] = true;
        } else {
            cssCls['btn-group'] = true;
            if (this.props.layout == 'justified') {
                cssCls['btn-group-justified'] = true;
            }
        }
        return (
            <ReactTransitionGroup component="div" className="select-btn-group">
                <div className={cx(cssCls)} {...attrs}>
                    {OptionEls}
                </div>
                {OtherEl}
            </ReactTransitionGroup>
                    
        );
    }
});

module.exports = SelectButtonGroup;
