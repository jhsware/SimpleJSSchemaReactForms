'use strict';
var React       = require('react/addons');

var FieldError = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool,
        showSpinner: React.PropTypes.bool
    },

    didClick: function (e) {
        e.preventDefault();
        this.props.onClick(e);
    },

    render: function () {
        var cx = React.addons.classSet;
        
        var btnClasses = {
            'btn': true
        }
        
        // Add button style
        var btnStyleClass = 'btn-' + (this.props.disabled ? 'default' : 'success');
        btnClasses[btnStyleClass] = true;
        
        // Make block level button
        if (this.props.block) {
            btnClasses['btn-block'] = true;
        }
        
        var spinnerCls = {
            'glyphicon': true,
            'glyphicon-refresh': true,
            'glyphicon-refresh-animate': this.props.showSpinner,
            'icon-left': true,
            'spinner': true,
            'spinner-hidden': !this.props.showSpinner
        }

        return (
            <a type="button" role="button"
                className={cx(btnClasses)}
                onClick={this.didClick}>
                <span className={cx(spinnerCls)}></span>
                {this.props.text}
            </a>
        );
    }
});

module.exports = FieldError;
