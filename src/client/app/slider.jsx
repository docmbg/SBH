import React from 'react';
import ReactDOM from 'react-dom';
import { Slider, Slide } from 'react-materialize';

class SliderWebPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: this.props.slides
        }
    }
    
    render() {
        return (
            <Slider interval={10000} /*indicators={false}*/>

                {
                    this.state.slides.map((elem,i) =>
                        <Slide
                            key={`slide-${i}`}
                            src="">
                            <div className="transparentDiv">
                                <p className="mainTitle">{elem.mainTitle}</p>
                            </div>

                            <video autoPlay loop>
                                <source src={elem.picture} type="video/mp4" />
                            </video>

                        </Slide>

                    )
                }

            </Slider>
        )
    }
}

export default SliderWebPart;