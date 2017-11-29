import React from 'react';
import ReactDOM from 'react-dom';

class SimpleImageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc: this.props.componentProperties.imgSrc,
            imgHeight: this.props.componentProperties.imgHeight,
            imgWidth: this.props.componentProperties.imgWidth,
            editable: this.props.editable
        }
    }
    passProps(e, occ) {
        let newVal = e.target.value;
        switch (occ) {
            case ("imgSrc"):
                this.setState({
                    imgSrc: newVal
                })
                break;
            case ("imgHeight"):
                this.setState({
                    imgHeight: newVal
                })
                break;
            case ("imgWidth"):
                this.setState({
                    imgWidth: newVal
                })
                break;
            default:
                console.log("Nothing to change")
        }

    }
    saveEdit() {
        console.log("Image pass props")
        console.log({
            imgSrc: this.state.imgSrc,
            imgWidth: this.state.imgHeight,
            imgHeight: this.state.imgWidth
        })
        this.props.passProps({
            imgSrc: this.state.imgSrc,
            imgWidth: this.state.imgHeight,
            imgHeight: this.state.imgWidth
        })
    }
    render() {
        if (!this.props.editable) {
            return (
                <img
                    className="content-simpleImage content-disabled"
                    src={this.props.componentProperties.imgSrc}
                    onClick={() => this.props.handleImageModal(this.props.componentProperties.imgSrc)}
                    width='100%'
                    height='100%'
                />
            );
        } else {
            return (
                <div>
                    <p className="modal-content-edit-header">Image Width</p>
                    <input
                        type="number"
                        value={parseInt((this.state.imgWidth || "0px").replace("px", ""))}
                        onChange={(e) => this.passProps(e, "imgWidth")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <p className="modal-content-edit-header">Image Height</p>
                    <input
                        type="number"
                        value={parseInt((this.state.imgHeight || "0px").replace("px", ""))}
                        onChange={(e) => this.passProps(e, "imgHeight")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <p className="modal-content-edit-header">Image Source</p>
                    <input
                        type="text" value={this.state.imgSrc || ""}
                        onChange={(e) => this.passProps(e, "imgSrc")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <div>
                        <button
                            onClick={() => this.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                </div>
            )
        }
    }
}

export default SimpleImageComponent;