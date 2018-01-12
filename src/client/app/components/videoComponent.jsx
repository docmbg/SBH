import React from 'react';
import ReactDOM from 'react-dom';

class VideoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vidSrc: this.props.componentProperties.vidSrc,
            vidAutoPlay: this.props.componentProperties.vidSrc,
            editable: this.props.editable
        }
    }

    passClose() {
        let confirmResult = confirm("Would you like to save your changes before exiting?")
        if (!confirmResult) {
            this.props.passClose()
            return false
        }
        this.saveEdit()
    };

    saveEdit() {
        console.log({
            vidSrc: this.state.vidSrc,
            vidAutoPlay: this.state.vidAutoPlay
        })
        this.props.passProps({
            vidSrc: this.state.vidSrc,
            vidAutoPlay: this.state.vidAutoPlay
        })
    }

    updateProp(event, property) {
        switch (property) {
            case "vidSrc":
                this.setState({
                    vidSrc: event.target.value
                })
                break;
            case "vidAutoPlay":
                this.setState({
                    vidAutoPlay: event.target.value == "on" ? true : false
                })
                break;
            default:
                return null;
                break
        }
    }
    
    render() {
        if (!this.props.editable) {
            return (
                <video
                    className="content-simpleImage content-disabled"
                    src={this.props.componentProperties.vidSrc}
                    width='100%'
                    autoPlay={this.props.componentProperties.vidAutoPlay}
                    loop
                    controls={true}
                    poster={`http://www.clker.com/cliparts/Z/C/1/n/M/2/youtube-style-play-button-hi.png`}
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
                    <p className="modal-content-edit-header">Video Source</p>
                    <input
                        className="modal-content-edit-input"
                        onChange={(e) => this.updateProp(e, "vidSrc")}
                    />
                    <p className="modal-content-edit-header">Video Autoplay</p>
                    <div className={`modal-content-imageCollection-item-check`}>
                        <label>
                            <input type="checkbox" name="" onChange={(e) => this.updateProp(e, "vidAutoPlay")} value={this.state.vidAutoPlay} />
                            <i className="helper"></i>
                        </label>
                    </div>
                </div>
            )
        }
    }
}

export default VideoComponent;