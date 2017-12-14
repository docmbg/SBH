import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import TextEditor from './textEditor.jsx';
import SliderWebPart from './slider.jsx';
import VerticalNav from './verticalNav.jsx';
import TabMenu from './tabMenu.jsx';
import Survey from './survey.jsx';
import Calendar from './calendar.jsx';
import ImageGallery from './imageGallery.jsx';
import HorizontalNav from './horizontalNav.jsx';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            currentComponent: "",
            currentComponentProps: {},
            currentActiveModal: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log("Mounting", nextProps.currentComponent);
        if(nextProps.isActive )
        switch (this.props.currentComponent) {
            case ("ImageGallery"):
                console.log("Image Gallery Mount");
                $().SPServices({
                    operation: "GetListItems",
                    async: true,
                    listName: "Images",
                    CAMLQueryOptions: `<QueryOptions><ViewAttributes Scope="Recursive"/></QueryOptions>`,
                    completefunc: function (xData, Status) {
                        console.log("loadImageFromDirectory: ", $(xData.responseXML));
                    }
                })           
                break;
            default:
                return false
        }
    }
    handleModalChange(e) {
        this.setState({
            currentComponent: e
        })
        this.props.updateCurrentElement(e)
    }
    getProps(e) {
        this.setState({
            currentComponentProps: e
        })
        this.props.passProps(e, this.props.currentActiveModal, this.props.currentComponent);
        this.closeModal();
    }
    closeModal() {
       
        this.setState({
            isActive: false
        })
        this.props.updateStatus(false)
    }

    drawEditComponent() {
        switch (this.props.currentComponent) {
            case ("ImageContainer"):
                return <SimpleImageComponent componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()}/>
                break;
            case ("TextArea"):
                return <TextEditor componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()} />
                break;
            case ("Slider"):
                return <SliderWebPart componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()} />
                break;
            case ("VerticalNav"):
                return <VerticalNav componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()} />
                break;
            case ("HorizontalNav"):
                return <HorizontalNav componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()} />
                break;
            case ("TabMenu"):
                return <TabMenu componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()}/>
                break;
            case ("Survey"):
                return <Survey componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()}/>
                break;
            case ("Calendar"):
                return <Calendar componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} passClose={() => this.closeModal()}/>
                break;
            case ("ImageGallery"):
                return <ImageGallery componentProperties={this.props.currentComponentProps} editable={true} handleImageModal={(src) => this.props.handleImageModal(src)} passProps={(e) => this.getProps(e)}  passClose={() => this.closeModal()} />
                break;
            default:
                return (
                    <div>
                    </div>
                )
        }
    }
    render() {
        let editProperties = this.drawEditComponent();
        if (this.props.isActive) {
            return (
                <div className="modal-container">
                    <div className="modal-background">
                    </div>

                    <div className="modal-content">
                        {/* <button className='dxc-close' onClick={() => this.closeModal()}>
                            <i className="material-icons">&#xE5CD;</i>
                        </button> */}
                        {/* <select className="modal-content-select" value={this.props.currentComponent} onChange={(e) => this.handleModalChange(e)}>
                            <option value=""></option>
                            <option value="ImageContainer">Image Container</option>
                            <option value="TextArea">Text Area</option>
                            <option value="Slider">Slider</option>
                            <option value="VerticalNav">Vertical Navigation</option>
                            <option value="HorizontalNav">Horizontal Navigation</option>
                            <option value="TabMenu">Tab Menu</option>
                            <option value="Survey">Survey</option>
                            <option value="Calendar">Calendar</option>
                            <option value="ImageGallery">ImageGallery</option>
                        </select> */}
                        <div className="modal-content-edit-container">
                            {editProperties}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="hidden">
                </div>
            )
        }
    }

}


export default Modal;