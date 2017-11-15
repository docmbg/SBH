import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleHeader from './simpleHeader.jsx';
import TextEditor from './textEditor.jsx';
import SliderWebPart from './slider.jsx';
import SideNav from './sideNav.jsx';
import TabMenu from './tabMenu.jsx';

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
        console.log("Modal recieving props: ", e);
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
                return <SimpleImageComponent componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("TextHeader"):
                return <SimpleHeader componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("TextArea"):
                return <TextEditor componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("Slider"):
                return <SliderWebPart componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("SideNav"):
                return <SideNav componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("TabMenu"):
                return <TabMenu componentProperties={this.props.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
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
                    <button className="modal-content-close modal-content-edit-button--remove" onClick={() => this.closeModal()}>
                    Close
                    </button> 
                        <select className="modal-content-select" onChange={(e) => this.handleModalChange(e)}>
                            <option value="" default></option>
                            <option value="ImageContainer">Image Container</option>
                            <option value="TextHeader">Text Header</option>
                            <option value="TextArea">Text Area</option>
                            <option value="Slider">Slider</option>
                            <option value="SideNav">Side Navigation</option>
                            <option value="TabMenu">Tab Menu</option>
                        </select>
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