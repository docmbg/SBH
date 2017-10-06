import React from 'react';
import ReactDOM from 'react-dom';

class SimpleImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: this.props.imgSrc,
            imgWidth: this.props.imgWidth,
            imgHeight: this.props.imgHeight
        }
    }
    onValueChange(e, changeCase) {
        if (changeCase == "imgSrc") {
            this.setState({
                imgSrc: e.target.value
            })
            this.props.passProps({
                currentImgSrc: e.target.value,
                currentImgWidth: this.state.imgWidth,
                currentImgHeight: this.state.imgHeight
            })
        } else if (changeCase == "imgWidth") {
            this.setState({
                imgWidth: e.target.value
            })
            this.props.passProps({
                currentImgSrc: this.state.imgSrc,
                currentImgWidth: e.target.value,
                currentImgHeight: this.state.imgHeight
            })
        } else if (changeCase == "imgHeight") {
            this.setState({
                imgHeight: e.target.value
            })
            this.props.passProps({
                currentImgSrc: this.state.imgSrc,
                currentImgWidth: this.state.imgWidth,
                currentImgHeight: e.target.value
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