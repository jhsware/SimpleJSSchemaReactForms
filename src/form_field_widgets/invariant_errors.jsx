'use strict';
var React       = require('react/addons');

var InvariantErrors = React.createClass({
    propTypes: {
        invariantErrors: React.PropTypes.array
    },
    
    
    render: function () {
        
        if (this.props.invariantErrors) {
            var errorEls = this.props.invariantErrors.map(function (error, i) {
                return (
                    <li key={'inv-error-' + i} className="invariant-errors__error">
                        <span className="invariant-errors__error-message">{error.message}</span>
                    </li>
                );
            })
            return (
                <ul className="invariant-errors">
                    {errorEls}
                </ul>
            );            
        } else {
            return null
        }
    }
});

module.exports = InvariantErrors;
