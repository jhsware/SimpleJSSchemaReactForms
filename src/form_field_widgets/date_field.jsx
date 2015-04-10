'use strict';
var React       = require('react/addons');

var DatePicker = require('react-datepicker-component/DatePicker.jsx');
var moment = require('moment');

var FieldError  = require('./field_error');
var FieldMixin  = require('../form_mixins/field_mixin');

var DateField = React.createClass({
    mixins: [FieldMixin],

    propTypes: {
        // Some more propTypes in fieldMixin

        placeholder: React.PropTypes.string,
        suffix: React.PropTypes.string, // Add a suffix to the value in the textbox
    },
    
    didSelectDate: function (date) {
        this.didChange(moment(date).toISOString().substr(0,10));
    },
    
    toggleDatepicker: function (e) {
        e.preventDefault();
        var state = this.state;
        state.datePickerVisible = !state.datePickerVisible;
        this.setState(state);
    },
    
    getInitialState: function () {
        return {
            datePickerVisible: false
        }
    },
    
    _getPickerStartDate: function () {
        if (this.props.value && (this.props.value.length == 10 && moment(this.props.value).isValid())) {
            return new Date(this.props.value);
        } else {
            return new Date();
        }
    },

    render: function () {

        return (
            <div className={'inputGroup '}>
                <div className="inputGroup__input">
                    {/*
                    <span className="inputGroup__addon">Test</span>
                    */}
                    <input ref="theField"
                           value={this.getFormattedValue()}
                           type="text"
                           className={'inputGroup__field '}
                           onChange={this.didChange}
                           placeholder={this.props.placeholder} />
                    <div onClick={this.toggleDatepicker}>[Choose]</div>
                </div>
                { this.state.datePickerVisible && <DatePicker date={this._getPickerStartDate()} onChangeDate={this.didSelectDate} /> }
                <FieldError fieldName={this.props.name} formErrors={this.props.formErrors} />
            </div>
        );
    }
});

module.exports = DateField;
