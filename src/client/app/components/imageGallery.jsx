import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';

class ImageGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            images: this.props.componentProperties.images || []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            images: nextProps.componentProperties.images
        })
    }
    addImage() {
        let images = this.state.images;
        images.push({
            "imgSrc": ""
        })
        this.setState({
            images
        })
    }
    removeImage(index) {
        let images = this.state.images;
        images.splice(index, 1);
        this.setState({
            images
        })
    }
    updateSource(value, index) {
        let images = this.state.images;
        images[index]["imgSrc"] = value.target.value;
        this.setState({
            images
        })
    }

    saveEdit() {
        let images = this.state.images;
        this.props.passProps({
            images
        });
    }
    render() {
        console.log(this.props)
        let that = this;
        if (this.props.editable) {
            return (
                <div>
                    <div className="w1">
                        {this.state.images.map(function (e, i) {
                            return (
                                <div className="modal-content-edit-navigation--side-container">
                                    <div className="w2">
                                        <button
                                            onClick={(i) => that.removeImage(i)}
                                            className="modal-content-edit-button--remove"
                                        >X</button>
                                        <p className="modal-content-edit-header">Image Source</p>
                                        <input
                                            type="text"
                                            value={e["imgSrc"]}
                                            onChange={(value) => that.updateSource(value, i)}
                                            className="modal-content-edit-input-text"
                                        ></input>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <button
                        className="modal-content-edit-button--plus"
                        onClick={() => this.addImage()}
                    >+</button>
                    <div>
                        <button
                            onClick={() => this.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                </div>
            )
        }
        return (
            <div className="imageCollection-container">

                {
                    this.props.componentProperties.images.map(function (e, i) {
                        return (
                            <div className="imageCollection-imageContainer">
                                <SimpleImageComponent 
                                    componentProperties = {e}
                                    handleImageModal={(src) => that.props.handleImageModal(src)}    
                                />
                            </div>
                        )

                    })
                }
            </div>
        )
    }
}
export default ImageGallery;