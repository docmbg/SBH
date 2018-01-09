import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, browserHistory   } from 'react-router';

let interval;
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: (this.props.slides || []),
            currentPicture: 'asdasd',
            currentPictureIndex: 0,
            timeBetweenSlides: 5000,
            timeTillChange: 0,
            className: `sliderPicture`
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            slides: nextProps.slides,
            sliderStyles: nextProps.sliderStyles,
        })
    }
    componentDidMount() {

        let _this = this;
        if (this.state.slides.length) {
            interval = setInterval(function change() {
                let timeTillChange = _this.state.timeTillChange;
                if (timeTillChange == 0) {
                    _this.pickNextPicture(_this.state.currentPictureIndex, _this.state.slides, _this.state.timeBetweenSlides);
                } else {
                    timeTillChange = timeTillChange - 250;
                    if (timeTillChange == 0) {
                        _this.setState({
                            timeTillChange: timeTillChange,
                            className: 'slidePicture movingToLeft'
                        })
                    } else {
                        _this.setState({
                            timeTillChange: timeTillChange,
                            className: 'sliderPicture'

                        })
                    }
                }
                return change
            }(), 250)
        }

    }
    componentWillUnmount(){
        clearInterval(interval); 
    }

    pickNextPicture(index, slides, timeBetweenSlides) {
        if (index >= slides.length) {
            index = 0;
        }
        this.setState({
            currentPicture: this.state.slides.length == 0 ? '' : this.state.slides[index]['src'],
            currentPictureIndex: index + 1,
            timeTillChange: timeBetweenSlides
        })
    }

    goToSlide(e) {
        this.pickNextPicture(e.target.value - 1, this.state.slides, this.state.timeBetweenSlides)
    }

    render() {
        let _this = this;
        let style = {
            // backgroundImage: `url(${this.state.currentPicture})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            //transition: 'opacity 0.5s ease-out',
            width: '100%',
            height: '100%'
        }
        let slides = (this.state.slides || []);
        return (
            <div className="content-slider">
                <img 
                src={this.state.currentPicture} 
                className={`${this.state.className} content-slider-image`} 
                style={{opacity: (parseInt(_this.props.sliderStyles.sliderImageOpacity)/100).toFixed(2)}}/>
                {
                    slides.map(function (elem, index) {
                        if (index + 1 == _this.state.currentPictureIndex) {
                            return (<div className={`content-slider-infobox`}>
                                <div 
                                    className={`content-slider-infobox-wrapper ${_this.props.sliderStyles.sliderBackgroundStyle || ""} ${_this.props.sliderStyles.sliderBackgroundColor || ""}`}
                                    style={{opacity: (parseInt(_this.props.sliderStyles.sliderBackgroundOpacity)/100).toFixed(2)}}
                                >
                                </div>
                                <div className={`content-slider-infobox-text`}>
                                <p className={`content-slider-infobox-title ${_this.props.sliderStyles.sliderTextColor || ""}`}>{elem.title}</p>
                                <div className={`content-slider-infobox-description ${_this.props.sliderStyles.sliderTextColor || ""}`}>{elem.description}</div>
                                    <div className={`content-slider-infobox-readMore`}>
                                        <a href={elem.link} target="_blank">
                                            <div className={`${_this.props.sliderStyles.sliderButtonColor || ""} ${_this.props.sliderStyles.sliderButtonTextColor || ""}`}>
                                                {_this.props.sliderStyles.readMoreText || ""}
                                            </div>
                                        </a>
                                    </div>
                                    
                                </div>
                            </div>)
                        }
                    })
                }
                <div className="content-slider-indicators-wrapper">
                    <ul className={`${_this.props.sliderStyles.sliderIndicatorsStyle} ${_this.props.sliderStyles.sliderIndicatorsShape}`}>
                        {
                            slides.map((elem, index) =>
                                (
                                    <li key={index} value={index + 1} onClick={(e) => _this.goToSlide(e)}
                                        className={index + 1 == _this.state.currentPictureIndex ? 'content-slider-indicators-indicator active' : 'content-slider-indicators-indicator'}>
                                        <span>{index + 1}</span>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>

        )
    }
}

export default Slider;