import React from 'react';
import ReactDOM from 'react-dom';

export default class ImageModal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.src) {
            return (
                <div className="hidden">
                </div>
            )
        }
        return (
            <div className="image-popup-modal">
                <div
                    className="image-popup-modal-shield"
                    onClick={() => this.props.handleImageClick("")}
                >
                </div>
                <div className="image-popup-modal-content">
                    <img src={this.props.src} className="image-popup-modal-content-image" />
                </div>
            </div>
        )
    }
}