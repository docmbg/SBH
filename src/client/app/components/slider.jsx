import React from "react";
import ReactDOM from "react-dom";
// import { Slider, Slide } from 'react-materialize';
import Slider from "./sliderComponent.jsx";
import ColorPicker from './colorPicker.jsx';


class SliderWebPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: this.props.componentProperties.slides || [],
      sliderStyles: this.props.componentProperties.sliderStyles || {},
    };
  }

  saveEdit() {
    let slides = this.state.slides;
    let sliderStyles = this.state.sliderStyles;
    this.props.passProps({
      slides,
      sliderStyles
    });
  }



  removeSlide(index) {
    let slides = [].concat(this.state.slides);
    slides.splice(index, 1);
    this.setState({
      slides
    });
  }

  updateSlide(event, index, type) {
    let slides = [].concat(this.state.slides);
    slides[index][type] = event.target.value;
    this.setState({
      slides
    });
  }

  addSlide() {
    let slides = [].concat(this.state.slides);
    slides.push({
      src: "",
      title: "",
      link: "",
      description: "",
      active: false
    });
    this.setState({
      slides
    });
  }

  handleMove(dir, index) {
    let slides = [].concat(this.state.slides);
    if (index + dir >= slides.length || index + dir < 0) {
      return false
    }
    let item1 = slides[index];
    let item2 = slides[index + dir];
    slides[index] = item2;
    slides[index + dir] = item1;
    this.setState({
      slides
    })
  }

  toggleTabContents(i) {
    let slides = this.state.slides;
    if (slides[i]["active"]) {
      slides[i]["active"] = false
    } else {
      slides[i]["active"] = true
    }
    this.setState({
      slides
    })
  }

  handleGeneralChange(evt, instance) {
    console.log(evt, instance)
    let sliderStyles = this.state.sliderStyles;
    sliderStyles[instance] = evt;
    this.setState({
      sliderStyles,
      currentEditedColor: ''
    });
  }

  passClose() {
    let confirmResult = confirm("Would you like to save your changes before exiting?")
    if (!confirmResult) {
      this.props.passClose()
      return false
    }
    this.saveEdit()
  };

  currentEditedColor(value) {
    this.setState({
      currentEditedColor: value
    })
  }

  render() {
    let that = this;
    if (this.props.editable) {
      return (
        <div>
          <button className='dxc-close' onClick={() => this.passClose()}>
            <i className="material-icons">&#xE5CD;</i>
          </button>
          <div className="modal-content-edit-slider-wrapper">
            <div className="modal-content-edit-slider-preview">
              <div className="modal-content-edit-slider-preview-container">
                <img className="modal-content-edit-slider-preview-background slidePicture content-slider-image" />
                <div className={`content-slider-infobox`}>
                  <div
                    className={`content-slider-infobox-wrapper ${that.state
                      .sliderStyles.sliderBackgroundStyle || ""}`}
                    style={{
                      opacity: (
                        parseInt(
                          that.state.sliderStyles.sliderBackgroundOpacity
                        ) / 100
                      ).toFixed(2),
                      backgroundColor: that.state.sliderStyles.sliderBackgroundColor
                    }}
                  />
                  <div className={`content-slider-infobox-text`}>
                    <div className={`content-slider-infobox-readMore`}>
                      <a href={`#`} target="_blank">
                        <div
                          style={
                            {
                              backgroundColor: that.state.sliderStyles.sliderButtonColor,
                              color: that.state.sliderStyles.sliderButtonTextColor
                            }
                          }
                        >
                          {that.state.sliderStyles.readMoreText || ""}
                        </div>
                      </a>
                    </div>
                    <p
                      className={`content-slider-infobox-title`}
                      style={
                        {
                          color: that.state.sliderStyles.sliderTextColor
                        }
                      }
                    >{`Slide Title`}</p>
                  </div>
                </div>
              </div>
              <div className="content-slider-indicators-wrapper">
                <ul
                  className={`${
                    that.state.sliderStyles.sliderIndicatorsStyle
                    } ${that.state.sliderStyles.sliderIndicatorsShape}`}
                >
                  <li className="active">1</li>
                  <li className="">2</li>
                </ul>
              </div>
            </div>
            <div className="modal-content-edit-seperator" />
            <div className="modal-content-edit-slider-general">
              <div className="w3">
                <div className="modal-content-edit-slider-header">
                  Text Styling
                </div>
                <p className="modal-content-edit-header">
                  Slider text background color
                </p>
                <div>
                  {
                    this.state.currentEditedColor != 'sliderBackgroundColor' ?
                      (<div>
                        <button className="colorPickerButton" onClick={() => this.currentEditedColor('sliderBackgroundColor')}> Change </button>
                        <div className="colorDisplayBox" style={{ backgroundColor: (this.state.sliderStyles.sliderBackgroundColor || "#666666") }}></div>
                      </div>) :
                      <ColorPicker chosenColor={this.state.sliderStyles.sliderBackgroundColor || "#666666"} passProps={(e) => this.handleGeneralChange(e, "sliderBackgroundColor")} />
                  }
                </div>
                <p className="modal-content-edit-header">Slider text color</p>

                <div>
                  {
                    this.state.currentEditedColor != 'sliderTextColor' ?
                      (<div>
                        <button className="colorPickerButton" onClick={() => this.currentEditedColor('sliderTextColor')}> Change </button>
                        <div className="colorDisplayBox" style={{ backgroundColor: (this.state.sliderStyles.sliderTextColor || "#FFF") }}></div>
                      </div>) :
                      <ColorPicker chosenColor={this.state.sliderStyles.sliderTextColor || "#FFF"} passProps={(e) => this.handleGeneralChange(e, "sliderTextColor")} />
                  }
                </div>
              </div>
              <div className="w3">
                <div className="modal-content-edit-slider-header">
                  Button Styling
                </div>
                <p className="modal-content-edit-header">Slider button text color</p>

                <div>
                  {
                    this.state.currentEditedColor != 'sliderButtonTextColor' ?
                      (<div>
                        <button className="colorPickerButton" onClick={() => this.currentEditedColor('sliderButtonTextColor')}> Change </button>
                        <div className="colorDisplayBox" style={{ backgroundColor: (this.state.sliderStyles.sliderButtonTextColor || "#FFF") }}></div>
                      </div>) :
                      <ColorPicker chosenColor={this.state.sliderStyles.sliderButtonTextColor || "#FFF"} passProps={(e) => this.handleGeneralChange(e, "sliderButtonTextColor")} />
                  }
                </div>
                <p className="modal-content-edit-header">Slider button color</p>

                <div>
                  {
                    this.state.currentEditedColor != 'sliderButtonColor' ?
                      (<div>
                        <button className="colorPickerButton" onClick={() => this.currentEditedColor('sliderButtonColor')}> Change </button>
                        <div className="colorDisplayBox" style={{ backgroundColor: (this.state.sliderStyles.sliderButtonColor || "#FFF") }}></div>
                      </div>) :
                      <ColorPicker chosenColor={this.state.sliderStyles.sliderButtonColor || "#FFF"} passProps={(e) => this.handleGeneralChange(e, "sliderButtonColor")} />
                  }
                </div>
                <p className="modal-content-edit-header">Slider button text</p>
                <input
                  type="text"
                  value={this.state.sliderStyles.readMoreText}
                  onChange={e => this.handleGeneralChange(e, "readMoreText")}
                />
                <p className="modal-content-edit-header">
                  Slider indicator color
                </p>
                <select
                  onChange={e =>
                    this.handleGeneralChange(e, "sliderIndicatorsStyle")
                  }
                  defaultValue={this.state.sliderStyles.sliderIndicatorsStyle}
                >
                  <option value="content-slider-indicators">Classic</option>
                  <option value="content-slider-indicators--yellow_black">
                    Black and Yellow
                  </option>
                  <option value="content-slider-indicators--black_white">
                    Black and White
                  </option>
                  <option value="content-slider-indicators--blue_gray">
                    Blue and Gray
                  </option>
                  <option value="content-slider-indicators--pictures">
                    DXC Logo
                  </option>
                </select>
              </div>
              <div className="w3">
                <div className="modal-content-edit-slider-header">
                  Appearance Styling
                </div>
                <p className="modal-content-edit-header">
                  Slider indicator shape
                </p>
                <select
                  onChange={e =>
                    this.handleGeneralChange(e.target.value, "sliderIndicatorsShape")
                  }
                  defaultValue={this.state.sliderStyles.sliderIndicatorsShape}
                >
                  <option value="content-slider-indicators">Classic</option>
                  <option value="content-slider-indicators-shape--square_number">
                    Default
                  </option>
                  <option value="content-slider-indicators-shape--circle">
                    Circle (No numbers)
                  </option>
                  <option value="content-slider-indicators-shape--square">
                    Square(No numbers)
                  </option>
                </select>
                <p className="modal-content-edit-header">
                  Slider text background style
                </p>
                <select
                  onChange={e =>
                    this.handleGeneralChange(e.target.value, "sliderBackgroundStyle")
                  }
                  defaultValue={this.state.sliderStyles.sliderBackgroundStyle}
                >
                  <option value="slider-shape-square">Default (Square)</option>
                  <option value="slider-shape-DXC">DXC</option>
                  <option value="slider-shape-hidden">None (hidden)</option>
                </select>
                <p className="modal-content-edit-header">
                  Slider background opacity
                </p>
                <input
                  type="number"
                  value={this.state.sliderStyles.sliderBackgroundOpacity}
                  onChange={e =>
                    this.handleGeneralChange(e.target.value, "sliderBackgroundOpacity")
                  }
                />
                <span>%</span>
                <p className="modal-content-edit-header">Slider image opacity</p>
                <input
                  type={`number`}
                  onChange={e =>
                    this.handleGeneralChange(e.target.value, "sliderImageOpacity")
                  }
                  defaultValue={this.state.sliderStyles.sliderImageOpacity}
                />
                <span>%</span>
              </div>


            </div>
          </div>
          <div className="modal-content-edit-seperator" />
          <div className="modal-content-edit-slider-slides-wrapper">
            <ul>
              {that.state.slides.map(function (e, i) {
                return (

                  <li className="modal-content-edit-tabs" key={`sliders-${i}`}>
                    <div
                      className="modal-content-edit-tabs-name"
                    >{that.state.slides[i]["title"]}</div>
                    <button
                      onClick={() => that.toggleTabContents(i)}
                      className="modal-content-edit-button--toggle"
                    >
                      {e["active"] ? (
                        <i className="material-icons">&#xE22B;</i>
                      ) : (
                          <i className="material-icons">&#xE254;</i>
                        )}
                    </button>

                    <button onClick={() => that.handleMove(-1, i)}>
                      <i className="material-icons">&#xE5D8;</i>
                    </button>
                    <button onClick={() => that.handleMove(1, i)}>
                      <i className="material-icons">&#xE5DB;</i>
                    </button>
                    <button onClick={() => that.removeSlide(i)}>
                      <i className="material-icons">&#xE5CD;</i>
                    </button>

                    <div
                      className={`modal-content-edit-slider-editor ${
                        e["active"] ? "transition-down" : "transition-up"
                        }`}
                    >
                      <div>
                        <p className="modal-content-edit-header">Slide Title</p>
                        <div className="modal-content-edit-slides-title">
                          <input
                            type="text"
                            value={that.state.slides[i]["title"]}
                            onChange={event => that.updateSlide(event, i, "title")}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="modal-content-edit-header">Slide Image</p>
                        <div className="modal-content-edit-slides-image">
                          <input
                            type="text"
                            value={that.state.slides[i]["src"]}
                            onChange={event => that.updateSlide(event, i, "src")}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="modal-content-edit-header">Slide Description</p>
                        <div className="modal-content-edit-slides-image">
                          <textarea
                            type="text"
                            value={that.state.slides[i]["description"]}
                            onChange={event => that.updateSlide(event, i, "description")}
                          />
                        </div>
                      </div>
                      <div>
                        <p className="modal-content-edit-header">Slide Link</p>
                        <div className="modal-content-edit-slides-image">
                          <input
                            type="text"
                            value={that.state.slides[i]["link"]}
                            onChange={event => that.updateSlide(event, i, "link")}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              className="modal-content-edit-button--plus"
              onClick={() => that.addSlide()}
            >
              +
          </button>
          </div>
          <div>
            <button onClick={() => that.saveEdit()} className="dxc-button">
              Save
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <Slider
          sliderStyles={that.props.componentProperties.sliderStyles}
          slides={that.props.componentProperties.slides}
        />
      );
    }
  }
}

export default SliderWebPart;
