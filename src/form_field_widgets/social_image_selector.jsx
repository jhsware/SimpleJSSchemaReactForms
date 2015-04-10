'use strict';
var React       = require('react/addons');

var ProgressBar = React.createClass({

    render: function () {
        return (
            <div className="social-image-selector__progress">
                <div className="social-image-selector__progress-bar" style={{width: this.props.progressPerc + "%"}}/>
            </div>
        )
    }
});

var SocialImageSelector = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.object, // TODO: This should be a shape
        formErrors: React.PropTypes.shape({
                fieldErrors: React.PropTypes.object,
                invariantErrors: React.PropTypes.array
        }),
    },

    legacyDidSubmit: function () {
        // This should only be called on legacy

        // Change the image to "uploading"
        var state = this.state;
        state.loading = true;
        this.setState(state)

        var loop = setInterval(function () {
            var $doc = $($(this.refs.postIframe.getDOMNode()).contents());
            var lst = $doc.find('body').text().split("\n");
            var data = lst[lst.length - 1].split("=>");
            console.log(data[0] + '=' + data[1]);

            if (data[0] == 'progress') {

                var state = this.state;
                state.progress = data[1];
                this.setState(state);

            } else if (data[0] == 'image_url') {

                /* ** SUCCESS *** */

                // All is complete, we can now return the data to the form and re-render everything
                // ...and remove the interval
                clearInterval(loop);
                clearTimeout(timeout);

                // Clear the result form for next post
                $($doc.find('body')).html('');

                // Reset state
                var state = this.state;
                state.loading = false;
                state.progress = 100;
                this.setState(state);

                this.props.onChange(this.props.name, data[1]);
            }
        }.bind(this), 300);

        // Timeout if upload takes too long
        var timeout = setTimeout(function () {

            /* ** FAIL by TIMEOUT *** */

            clearInterval(loop);

            // Reset state
            var state = this.state;
            state.loading = false;
            this.setState(state)

            alert('Vi misslyckades att ladda upp din bild, du kan försöka igen.');
        }.bind(this), 10000);
    },

    getInitialState: function () {
        return {
            loading: false,
            progress: 0,
            showSubmitBtn: false
        }
    },

    componentDidMount: function () {
        console.log("Did mount!");
        if (!FileReader) {
            var state = this.state;
            state.showSubmitBtn = true;
            this.setState(state);
        };
    },

    render: function () {
        var activityText = (this.state.loading ? "Sparar..." : undefined) || (this.props.image_url ? undefined : "Välj en bild!");

        var imageStyle = {
            backgroundImage: (!this.state.loading && this.props.image_url ? "url(" + this.props.image_url + ")" : undefined)
        };

        var progressStyle = {
            width: this.state.progress
        }

        var iframeName = "postIframe-" + this._rootNodeID;
        //iframeName = "_blank";

        var stylePostSubmit = {
            display: (this.state.showSubmitBtn ? 'block' : 'none')
        }

        var cssClass = this.props.isAvatar ? ' imageUpload--avatar' : '';

        return (
            <div className={'imageUpload' + cssClass }>
                <div className="imageUpload__preview" style={imageStyle} />
                {this.state.loading ? <div className="imageUpload__spinner" /> : null}
                <div className="imageUpload__button">
                    <div className="button button--dove">Välj bild</div>
                </div>
                {/*
                <div className="social-image-selector__preview-image" style={imageStyle}>
                    <h3 className="social-image-selector__preview-image-activity-text">{activityText}</h3>
                    {this.state.loading ? <ProgressBar progressPerc={this.state.progress} /> : null}
                </div>
                <h2 className="social-image-selector__header">Ladda upp</h2>
                */}
                <form ref="postForm" target={iframeName} action="/api/uploadImage" method="post" encType='multipart/form-data' onSubmit={this.legacyDidSubmit}>
                    <iframe ref="postIframe" className="imageUpload__iframe" name={iframeName} />
                    <input name="image" className="imageUpload__input" ref="theFile" type="file" accept="image/jpeg" onChange={this.legacyDidSubmit} />
                    {/*
                    <input style={stylePostSubmit} ref="postSubmit" className="social-image-selector__submit" type="submit" />
                    */}
                </form>
            </div>
        );
    }
});

module.exports = SocialImageSelector;
