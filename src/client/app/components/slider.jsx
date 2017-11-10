import React from 'react';
import ReactDOM from 'react-dom';
// import { Slider, Slide } from 'react-materialize';
import Slider from './sliderComponent.jsx'

class SliderWebPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: (this.props.componentProperties.slides || [])
        }
    }
    saveEdit() {
        let slides = this.state.slides
        this.props.passProps({
            slides
        })
    }
    removeSlide(index) {
        let slides = this.state.slides;
        slides.splice(index, 1);
        this.setState({
            slides
        })
    }
    updateSlide(event, index, type) {
        let slides = this.state.slides;
        slides[index][type] = event.target.value;
        this.setState({
            slides
        })
    }
    addSlide() {
        let slides = this.state.slides;
        slides.push({
            src: "",
            title: "",
            link: ""
        })
        this.setState({
            slides
        })
    }
    render() {
        let that = this;
        if (this.props.editable) {
            return (
                <div className="modal-content-edit-slider-wrapper">
                    <div>
                        {that.state.slides.map(function (e, i) {
                            return (
                                <div className="modal-content-edit-slider-container">
                                    <button
                                        onClick={(i) => this.removeSlide(i)}
                                        className="modal-content-edit-button--remove"
                                    >X</button>
                                    <p className="modal-content-edit-header">Slide Image Source</p>
                                    <input
                                        type="text"
                                        value={that.state.slides[i]["src"]}
                                        onChange={(event) => that.updateSlide(event, i, "src")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                    <p className="modal-content-edit-header">Slide Title</p>
                                    <input
                                        type="text"
                                        value={that.state.slides[i]["title"]}
                                        onChange={(value) => that.updateSlide(value, i, "title")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                    <p className="modal-content-edit-header">Slide Link</p>
                                    <input
                                        type="text"
                                        value={that.state.slides[i]["link"]}
                                        onChange={(value) => that.updateSlide(value, i, "link")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                </div>
                            )
                        })}
                        <button
                            className="modal-content-edit-button--plus"
                            onClick={() => this.addSlide()}
                        >+</button>
                    </div>
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                </div>
            )

        } else {
            return (
                <Slider slides={that.props.componentProperties.slides} />
            )
        }

    }
}

export default SliderWebPart;