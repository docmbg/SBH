import React from "react";
import ReactDOM from "react-dom";
import SimpleImageComponent from "./simpleImageComponent.jsx";
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';



const itemsPerRow = 3;
const rowsPerPage = 3;
class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.componentProperties.images || [],
      currentPage: this.props.componentProperties.currentPage || 0,
      imageCollection: this.props.imageCollection || [],
      currentImage: 0
    };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      images: nextProps.componentProperties.images,
      imageCollection: nextProps.imageCollection || []
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
    let images = this.state.imageCollection;
    console.log("Pass save, IMAGES:", images);
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

  handleImageClick(index) {
    let imageCollection = [].concat(this.state.imageCollection);
    imageCollection[index]["selected"] = !imageCollection[index]["selected"];
    let images = [].concat(imageCollection);
    this.setState({
      imageCollection, images
    })
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  render() {
    console.log(this.props.editable)
    let that = this;
    let currentPage = this.state.currentPage;
    let filteredImages = this.state.images;
    // let filteredImages = this.state.images || []).filter(function (e, i) {
    //   return (
    //     i >= currentPage * itemsPerRow * rowsPerPage &&
    //     i < (currentPage + 1) * itemsPerRow * rowsPerPage
    //   );
    // });
    filteredImages = filteredImages.filter(function (e) {
      return e["selected"]
    });
    let photoSet = [];
    if (filteredImages) {
      let counter = 0;
      let ph = [];
      for (let i = 0; i < filteredImages.length; i++) {
        let image = new Image();
        image.src = filteredImages[i]['imgSrc'];
        if (counter == 9) {
          counter = 0;
          photoSet.push(ph);
        }
        else {
          counter++;
          ph.push({
            src: image.src,
            width: image.width,
            height: image.height
          })
        }
      }
      // photoSet = filteredImages.map(function (e) {
      //   let image = new Image();
      //   image.src = e.imgSrc;
      //   return {
      //     src: e.imgSrc,
      //     width: image.width,
      //     height: image.height
      //   }
      // })
    }
    console.log(photoSet)

    let rowHeight =
      Math.ceil((this.state.images || []).length / itemsPerRow) > itemsPerRow
        ? "33.333%"
        : 100 / Math.ceil((this.state.images || []).length / itemsPerRow) + "%";
    if (this.props.editable) {
      console.log('editable')
      return (
        <div>
          <button className='dxc-close' onClick={() => this.passClose()}>
            <i className="material-icons">&#xE5CD;</i>
          </button>
          <input name="myFile" type="file" onChange={() => this.previewFile()} multiple />
          <div className="modal-content-imageCollection">
            {console.log("before map:", this.state.images)}
            {(this.state.images || []).map(function (e, i) {
              return (
                <div
                  className="modal-content-imageCollection-item"
                >
                  <div className={`modal-content-imageCollection-item-check`}>
                    <label>
                      <input type="checkbox" name="" defaultChecked={e["selected"] == true} onClick={() => that.handleImageClick(i)} value={e["selected"] == true} />
                      <i className="helper"></i>
                    </label>
                  </div>
                  <div className={`modal-content-imageCollection-item-image ${e["selected"] ? "" : "transparent"}`}>
                    <img src={e["imgSrc"]} />
                  </div>
                </div>
              )
            })}

          </div>
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
    // console.log(
    //   Math.floor((this.state.images || []).length / (itemsPerRow * rowsPerPage))
    // );
    else {
      console.log('not editable')
      return (
        <div className="imageCollection-container">
          {/* <div
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
                (this.state.images || []).length / (itemsPerRow * rowsPerPage)
              ) && filteredImages.length < 9
              ? "hidden"
              : ""
            }`}
        >
          <div className="content-imageGallery-pageIndicator-arrow"> &#9658;</div>
        </div> */}
          <div
            onClick={() => this.handlePageChange(-1)}
            className={`content-imageGallery-pageIndicator previous ${
              this.state.currentPage == 0 ? "hidden" : ""
              }`}
          >
            <div className="content-imageGallery-pageIndicator-arrow">&#9668;</div>
          </div>

          {
            <div>
              <Gallery photos={photoSet[this.state.currentPage]} onClick={this.openLightbox} />
              <Lightbox images={photoSet[this.state.currentPage]}
                onClose={this.closeLightbox}
                onClickPrev={this.gotoPrevious}
                onClickNext={this.gotoNext}
                currentImage={this.state.currentImage}
                isOpen={this.state.lightboxIsOpen}
              />
            </div>
          }
          <div
            onClick={() => this.handlePageChange(1)}
            className={`content-imageGallery-pageIndicator next ${
              this.state.currentPage ==
                Math.floor(
                  (this.state.images || []).length / (itemsPerRow * rowsPerPage)
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
}
export default ImageGallery;
