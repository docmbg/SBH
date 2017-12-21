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
        let newVal = e.target != undefined ? e.target.value : e;
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

    previewFile() {
        let that = this;
        let counter = 0;
        let srcArray = [];
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.onloadend = function () {
            that.passProps(reader.result, "imgSrc")
        }
        if (file) {
            reader.readAsDataURL(file);
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
                    className="content-simpleImage image-zoom content-disabled"
                    src={this.props.componentProperties.imgSrc}
                    onClick={() => this.props.handleImageModal(this.props.componentProperties.imgSrc)}
                    width='100%'
                    height='100%'
                />
            );
        } else {
            return (
                <div>
                    <button className='dxc-close' onClick={() => this.passClose()}>
                        <i className="material-icons">&#xE5CD;</i>
                    </button>
                    <div>
                        <button
                            onClick={() => this.saveEdit()}
                            className="dxc-button"
                        >Save</button>
                    </div>
                    <p className="modal-content-edit-header">Image Source</p>
                    <input
                        type="text" value={`${this.state.imgSrc != undefined ? this.state.imgSrc.substring(0, 20) : ''}...`}
                        onChange={(e) => this.passProps(e, "imgSrc")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <input name="myFile" type="file" onChange={() => this.previewFile()} />

                </div>
            )
        }
    }
}

export default SimpleImageComponent;