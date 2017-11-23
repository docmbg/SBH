import React from 'react';
import ReactDOM from 'react-dom';
// import { Slider, Slide } from 'react-materialize';
import Slider from './sliderComponent.jsx'

class SliderWebPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: (this.props.componentProperties.slides || []),
            sliderStyles: (this.props.componentProperties.sliderStyles || {})
        }
    }
    saveEdit() {
        let slides = this.state.slides;
        let sliderStyles = this.state.sliderStyles;
        this.props.passProps({
            slides, sliderStyles
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
        });
        this.setState({
            slides
        });
    }
    handleGeneralChange(evt, instance) {
        let sliderStyles = this.state.sliderStyles;
        sliderStyles[instance] = evt.target.value;
        this.setState({
            sliderStyles
        });
    }
    render() {
        let that = this;
        if (this.props.editable) {
            return (
                <div>
                    <div className="modal-content-edit-slider-wrapper">
                        <div className="modal-content-edit-slider-preview">
                            <div className="modal-content-edit-slider-preview-container">
                                <img className="modal-content-edit-slider-preview-background slidePicture content-slider-image">
                                </img>
                                <div className={`content-slider-infobox`}>
                                    <div
                                        className={`content-slider-infobox-wrapper ${that.state.sliderStyles.sliderBackgroundStyle || ""} ${that.state.sliderStyles.sliderBackgroundColor || ""}`}
                                        style={{ opacity: (parseInt(that.state.sliderStyles.sliderBackgroundOpacity) / 100).toFixed(2) }}
                                    >
                                    </div>
                                    <div className={`content-slider-infobox-text`}>

                                        <div className={`content-slider-infobox-readMore`}>
                                            <a href={`#`} target="_blank">
                                                <div className={`${that.state.sliderStyles.sliderButtonColor || ""} ${that.state.sliderStyles.sliderButtonTextColor || ""}`}>
                                                    {that.state.sliderStyles.readMoreText || ""}
                                                </div>
                                            </a>
                                        </div>
                                        <p className={`content-slider-infobox-title ${that.state.sliderStyles.sliderTextColor || ""}`}>{`Slide Title`}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="content-slider-indicators-wrapper">
                                <ul className={`${that.state.sliderStyles.sliderIndicatorsStyle} ${that.state.sliderStyles.sliderIndicatorsShape}`}>
                                    <li className='active'>1</li>
                                    <li className=''>2</li>
                                </ul>
                            </div>
                        </div>
                        <div className="modal-content-edit-seperator">
                        </div>
                        <div className="modal-content-edit-slider-general">
                            <div className="w2">
                                <p className="modal-content-edit-header">Slider text background color</p>
                                <select
                                    
                                    defaultValue={this.state.sliderStyles.sliderBackgroundColor}
                                    onChange={(e) => this.handleGeneralChange(e, "sliderBackgroundColor")}
                                >
                                    <option value="dxc-background-black">Black</option>
                                    <option value="dxc-background-gray--dark">Dark gray</option>
                                    <option value="dxc-background-gray--light">Light gray</option>
                                    <option value="dxc-background-white">White</option>
                                    <option value="dxc-background-yellow">Yellow</option>
                                    <option value="dxc-background-blue">Blue</option>
                                    <option value="dxc-background-green">Green</option>
                                </select>
                                <p className="modal-content-edit-header">Slider text background style</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderBackgroundStyle")}
                                    defaultValue={this.state.sliderStyles.sliderBackgroundStyle}
                                >
                                    <option value="slider-shape-square">Default (Square)</option>
                                    <option value="slider-shape-DXC">DXC</option>
                                    <option value="slider-shape-hidden">None (hidden)</option>
                                </select>
                            </div>
                            <div className="w2">
                                <p className="modal-content-edit-header">Slider button color</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderButtonColor")}
                                    defaultValue={this.state.sliderStyles.sliderButtonColor}
                                >

                                    <option value="dxc-background-black">Black</option>
                                    <option value="dxc-background-gray--dark">Dark gray</option>
                                    <option value="dxc-background-gray--light">Light gray</option>
                                    <option value="dxc-background-white">White</option>
                                    <option value="dxc-background-yellow">Yellow</option>
                                    <option value="dxc-background-blue">Blue</option>
                                    <option value="dxc-background-green">Green</option>
                                </select>
                                <p className="modal-content-edit-header">Slider button text</p>
                                <input type="text"
                                    value={this.state.sliderStyles.readMoreText}
                                    onChange={(e) => this.handleGeneralChange(e, "readMoreText")}
                                ></input>
                            </div>
                            <div className="w2">
                                <p className="modal-content-edit-header">Slider text color</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderTextColor")}
                                    defaultValue={this.state.sliderStyles.sliderTextColor}
                                >

                                    <option value="dxc-font-black">Black</option>
                                    <option value="dxc-font-gray--dark">Dark gray</option>
                                    <option value="dxc-font-gray--light">Light gray</option>
                                    <option value="dxc-font-white">White</option>
                                    <option value="dxc-font-yellow">Yellow</option>
                                    <option value="dxc-font-blue">Blue</option>
                                    <option value="dxc-font-green">Green</option>
                                </select>
                                <p className="modal-content-edit-header">Slider background opacity color</p>
                                <input type="number"
                                    value={this.state.sliderStyles.sliderBackgroundOpacity}
                                    onChange={(e) => this.handleGeneralChange(e, "sliderBackgroundOpacity")}
                                ></input><span>%</span>
                            </div>
                            <div className="w2">
                                <p className="modal-content-edit-header">Slider button text color</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderButtonTextColor")}
                                    defaultValue={this.state.sliderStyles.sliderButtonTextColor}
                                >
                                    <option value="dxc-font-black">Black</option>
                                    <option value="dxc-font-gray--dark">Dark gray</option>
                                    <option value="dxc-font-gray--light">Light gray</option>
                                    <option value="dxc-font-white">White</option>
                                    <option value="dxc-font-yellow">Yellow</option>
                                    <option value="dxc-font-blue">Blue</option>
                                    <option value="dxc-font-green">Green</option>
                                </select>
                                
                            </div>
                            <div className="w2">
                            <p className="modal-content-edit-header">Slider indicator color</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderIndicatorsStyle")}
                                    defaultValue={this.state.sliderStyles.sliderIndicatorsStyle}
                                >
                                    <option value="content-slider-indicators">Classic</option>
                                    <option value="content-slider-indicators--yellow_black">Black and Yellow</option>
                                    <option value="content-slider-indicators--black_white">Black and White</option>
                                    <option value="content-slider-indicators--blue_gray">Blue and Gray</option>
                                    <option value="content-slider-indicators--pictures">DXC Logo</option>
                                </select>
                            
                            <p className="modal-content-edit-header">Slider indicator shape</p>
                                <select
                                    
                                    onChange={(e) => this.handleGeneralChange(e, "sliderIndicatorsShape")}
                                    defaultValue={this.state.sliderStyles.sliderIndicatorsShape}
                                >
                                    <option value="content-slider-indicators">Classic</option>
                                    <option value="content-slider-indicators-shape--square_number">Default</option>
                                    <option value="content-slider-indicators-shape--circle">Circle (No numbers)</option>
                                    <option value="content-slider-indicators-shape--square">Square(No numbers)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        {that.state.slides.map(function (e, i) {
                            return (
                                <div className="modal-content-edit-slider-container" key={`slider-${i}`}>
                                    <button
                                        onClick={(i) => that.removeSlide(i)}
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
                            onClick={() => that.addSlide()}
                        >+</button>
                    </div>
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                </div >
            )

        } else {
            return (
                <Slider sliderStyles={that.props.componentProperties.sliderStyles} slides={that.props.componentProperties.slides} />
            )
        }

    }
}

export default SliderWebPart;