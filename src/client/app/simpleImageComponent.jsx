import React from 'react';
import ReactDOM from 'react-dom';

class SimpleImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc : this.props.componentProperties.imgSrc,
            imgHeight : this.props.componentProperties.imgHeight,
            imgWidth : this.props.componentProperties.imgWidth,
        }
    }
    onValueChange(e, changeCase) {
        if (changeCase == "imgSrc") {
            this.setState({
                imgSrc: e.target.value
            })
            this.props.passProps({
                componentProperties : {
                    imgSrc: e.target.value,
                    imgWidth: this.state.imgWidth,
                    imgHeight: this.state.imgHeight
                }
            })
        } else if (changeCase == "imgWidth") {
            this.setState({
                imgWidth: e.target.value
            })
            this.props.passProps({
                componentProperties : {
                    imgSrc: this.state.imgSrc,
                    imgWidth: e.target.value,
                    imgHeight: this.state.imgHeight
                }
            })
        } else if (changeCase == "imgHeight") {
            this.setState({
                imgHeight: e.target.value
            })
            this.props.passProps({
                componentProperties : {
                    imgSrc: this.state.imgSrc,
                    imgWidth: this.state.imgWidth,
                    imgHeight: e.target.value
                }
            })
        }

    }
    render() {
        let editable = {};
        if (!this.props.editable) {
            return (
                <img
                    className="simpleImageComponent-disabled"
                    src={this.state.imgSrc}
                    width={this.state.imgWidth}
                    height={this.state.imgHeight}
                />
            );
        } else {
            return (
                <div className="simpleImageComponent-enabled">
                    <div className="simpleImageComponent-image_details edit-details">
                        <p>Image Width</p>
                        <input className="edit-input-short"
                            type="number"
                            onChange={(e) => this.onValueChange(e, "imgWidth")}
                            value={this.state.imgWidth}
                        />
                        <p>Image Height</p>
                        <input className="edit-input-short"
                            type="number"
                            onChange={(e) => this.onValueChange(e, "imgHeight")}
                            value={this.state.imgHeight}
                        />
                        <p>Image Source</p>
                        <input className="edit-input-long"
                            onChange={(e) => this.onValueChange(e, "imgSrc")}
                            value={this.state.imgSrc}
                        />
                    </div>
                    <div className="simpleImageComponent-image_preview edit-preview">
                        <div className="edit-preview-title">Preview:</div>
                        <img
                            className="displayComponent imageComponent"
                            src={this.state.imgSrc}
                            width={this.state.imgWidth}
                            height={this.state.imgHeight}
                        />
                    </div>
                </div>
            );
        }

    }
}

export default SimpleImageComponent;