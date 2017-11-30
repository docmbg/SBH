import React from "react";
import ReactDOM from "react-dom";
import SimpleImageComponent from "./simpleImageComponent.jsx";

const itemsPerRow = 3;
const rowsPerPage = 3;
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.componentProperties.images || [],
      currentPage: this.props.componentProperties.currentPage || 0
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.componentProperties.images
    });
  }
  addImage() {
    let images = this.state.images;
    images.push({
      imgSrc: ""
    });
    this.setState({
      images
    });
  }
  removeImage(index) {
    let images = this.state.images;
    images.splice(index, 1);
    this.setState({
      images
    });
  }
  updateSource(value, index) {
    let images = this.state.images;
    images[index]["imgSrc"] = value.target.value;
    this.setState({
      images
    });
  }
  handlePageChange(dir) {
    console.log("Changing page ", dir);
    let currentPage = this.state.currentPage;
    currentPage += dir;
    this.setState({
      currentPage
    });
  }
  saveEdit() {
    let images = this.state.images;
    this.props.passProps({
      images
    });
  }
  render() {
    console.log(this.state.currentPage);
    let that = this;
    let currentPage = this.state.currentPage;
    let filteredImages = this.state.images.filter(function(e, i) {
      return (
        i >= currentPage * itemsPerRow * rowsPerPage &&
        i < (currentPage + 1) * itemsPerRow * rowsPerPage
      );
    });
    console.log(filteredImages);
    let rowHeight =
      Math.ceil(this.state.images.length / itemsPerRow) > itemsPerRow
        ? "33.333%"
        : 100 / Math.ceil(this.state.images.length / itemsPerRow) + "%";
    console.log(this.state.currentPage);
    if (this.props.editable) {
      return (
        <div>
          <div className="w1">
            {this.state.images.map(function(e, i) {
              return (
                <div className="modal-content-edit-navigation--side-container">
                  <div className="w2">
                    <button
                      onClick={i => that.removeImage(i)}
                      className="modal-content-edit-button--remove"
                    >
                      X
                    </button>
                    <p className="modal-content-edit-header">Image Source</p>
                    <input
                      type="text"
                      value={e["imgSrc"]}
                      onChange={value => that.updateSource(value, i)}
                      className="modal-content-edit-input-text"
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="modal-content-edit-button--plus"
            onClick={() => this.addImage()}
          >
            +
          </button>
          <div>
            <button
              onClick={() => this.saveEdit()}
              className="modal-content-edit--save"
            >
              Save
            </button>
          </div>
        </div>
      );
    }
    console.log(
      Math.floor(this.state.images.length / (itemsPerRow * rowsPerPage))
    );
    return (
      <div className="imageCollection-container">
        <div
          onClick={() => this.handlePageChange(-1)}
          className={`content-imageGallery-pageIndicator previous ${
            this.state.currentPage == 0 ? "hidden" : ""
          }`}
        >
          <div className="content-imageGallery-pageIndicator-arrow">&#9668;</div>
        </div>

        {filteredImages.map(function(e, i) {
          return (
            <div
              className="imageCollection-imageContainer"
              style={{ height: rowHeight }}
            >
              <SimpleImageComponent
                componentProperties={e}
                handleImageModal={src => that.props.handleImageModal(src)}
              />
            </div>
          );
        })}
        <div
          onClick={() => this.handlePageChange(1)}
          className={`content-imageGallery-pageIndicator next ${
            this.state.currentPage ==
              Math.floor(
                this.state.images.length / (itemsPerRow * rowsPerPage)
              ) && filteredImages.length < 9
              ? "hidden"
              : ""
          }`}
        >
          <div className="content-imageGallery-pageIndicator-arrow"> &#9658;</div>
        </div>
      </div>
    );
  }
}
export default ImageGallery;
