import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';
import SimpleHeader from './simpleHeader.jsx';

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
    handleModalChange(e){
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
        console.log('test')
        this.setState({
            isActive: false
        })
        this.props.updateStatus(false)
    }
    
    drawEditComponent() {
        switch (this.props.currentComponent) {
            case ("ImageContainer"):
                return <SimpleImageComponent componentProperties={this.state.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("TextHeader"):
                return <SimpleHeader componentProperties={this.state.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            case ("TextArea"):
                return <SimpleTextEditor componentProperties={this.state.currentComponentProps} editable={true} passProps={(e) => this.getProps(e)} />
                break;
            default:
                return (
                    <div>
                    </div>
                )
        }
    }
    render() {
        let editProperties = this.drawEditComponent()
        console.log("editProperties: ", editProperties);
        if (this.props.isActive) {
            return (
                <div className="modal-container">
                    <div className="modal-background" onClick={() => this.closeModal()}>
                    </div>
                    <div className="modal-content">
                        <select className="modal-content-select" onChange={(e) => this.handleModalChange(e)}>
                            <option value="" default></option>
                            <option value="ImageContainer">Image Container</option>
                            <option value="TextHeader">Text Header</option>
                            <option value="TextArea">Text Area</option>
                        </select>
                        <div>
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