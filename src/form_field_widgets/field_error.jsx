'use strict';
var React       = require('react/addons');
var CollapseHeightMixin  = require('../form_mixins/animation_mixin').CollapseHeightMixin;

var FieldError = React.createClass({
    mixins: [CollapseHeightMixin],
    
    animationClassName: "collapse-height",
    
    render: function () {
        
        return (
            <span className='help-block field-error-message'>
                {this.props.message}
            </span>            
        )
    }
})

module.exports = FieldError;
