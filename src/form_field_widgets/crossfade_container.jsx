'use strict';
var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var CrossFadeContainer = React.createClass({
    
    render: function () {
            return (
                <ReactTransitionGroup component="div" className="crossfade-container">
                    {this.props.children}
                </ReactTransitionGroup>
            )
    }
});

module.exports = CrossFadeContainer;
