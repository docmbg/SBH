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
      currentPage: this.props.componentProperties.currentPage || 0,
      imageDirectory: this.props.componentProperties.imageDirectory || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.componentProperties.images
    });
  }

  addImage() {
    let images = [].concat(this.state.images);
    images.push({
      imgSrc: ""
    });
    this.setState({
      images
    });
  }

  removeImage(index) {
    let images = [].concat(this.state.images);
    images.splice(index, 1);
    this.setState({
      images
    });
  }

  updateSource(value, index) {
    let images = [].concat(this.state.images);
    images[index]["imgSrc"] = value.target.value;
    this.setState({
      images
    });
  }

  handlePageChange(dir) {
    let currentPage = this.state.currentPage;
    currentPage += dir;
    this.setState({
      currentPage
    });
  }

  updateImages(srcArray) {
    let images = this.state.images.concat(srcArray);
    this.setState({
      images
    })
  }

  previewFile() {
    let that = this;
    let counter = 0;
    let srcArray = [];
    let files = document.querySelector('input[type=file]').files;
    let reader = new FileReader();

    reader.onloadend = function () {

      counter++;
      console.log(counter)
      if (files.length > counter) {
        srcArray.push({ 'imgSrc': reader.result })
        reader.readAsDataURL(files[counter]);
      } else {
        srcArray.push({ 'imgSrc': reader.result })
        that.updateImages(srcArray)
      }
    }
    if (files) {
      reader.readAsDataURL(files[counter]);
    }
  }

  saveEdit() {
    let images = this.state.images;
    this.props.passProps({
      images
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

  render() {
    let that = this;
    let currentPage = this.state.currentPage;
    let filteredImages = this.state.images.filter(function (e, i) {
      return (
        i >= currentPage * itemsPerRow * rowsPerPage &&
        i < (currentPage + 1) * itemsPerRow * rowsPerPage
      );
    });
    let rowHeight =
      Math.ceil(this.state.images.length / itemsPerRow) > itemsPerRow
        ? "33.333%"
        : 100 / Math.ceil(this.state.images.length / itemsPerRow) + "%";
    if (this.props.editable) {
      return (
        <div>
          <button className='dxc-close' onClick={() => this.passClose()}>
            <i className="material-icons">&#xE5CD;</i>
          </button>
          <input name="myFile" type="file" onChange={() => this.previewFile()} multiple />
          <div className="w1">
            {this.state.images.map(function (e, i) {
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
                    {/* <input
                      type="text"
                      value={e["imgSrc"]}
                      onChange={value => that.updateSource(value, i)}
                      className="modal-content-edit-input-text"
                    /> */}
                    <img src={e['imgSrc']} className="smallImage" />
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
              className="dxc-button"
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

        {filteredImages.map(function (e, i) {
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
