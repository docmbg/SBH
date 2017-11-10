import React from 'react';
import ReactDOM from 'react-dom';

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: (this.props.slides || []),
            currentPicture: '',
            currentPictureIndex: 0,
            timeBetweenSlides: 5000,
            timeTillChange: 0,
            className: `sliderPicture`
        }
    }
    componentDidMount() {
        let _this = this;
        let interval = setInterval(function change() {
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
    pickNextPicture(index, slides, timeBetweenSlides) {
        if (index == slides.length) {
            index = 0;
        }
        this.setState({
            currentPicture: this.state.slides[index]['src'],
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
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%'
        }
        let slides = this.state.slides;
        return (
            <div className="content-slider">
                <img src={this.state.currentPicture} className={`${this.state.className} content-slider-image`} />
                {
                    slides.map(function (elem, index) {
                        if (index + 1 == _this.state.currentPictureIndex) {
                            return (<div className="content-slider-infobox">
                                <p className="content-slider-infobox-title">{elem.title}</p>
                                <a href={elem.link} className="content-slider-infobox-readMore" target="_blank">
                                    <p className="">Read More</p>
                                </a>
                                <div className="empty"></div>
                            </div>)
                        }
                    })
                }
                <div className="content-slider-indicators-wrapper">
                    <ul className="content-slider-indicators">
                        {
                            slides.map((elem, index) =>
                                (
                                    <li key={index} value={index + 1} onClick={(e) => _this.goToSlide(e)}
                                        className={index + 1 == _this.state.currentPictureIndex ? 'content-slider-indicators-indicator active' : 'content-slider-indicators-indicator'}>
                                        {index + 1}
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