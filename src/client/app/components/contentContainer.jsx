import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import TextEditor from './textEditor.jsx';
import SliderWebPart from './slider.jsx';
import VerticalNav from './verticalNav.jsx';
import HorizontalNav from './horizontalNav.jsx';
import ModalEditButtons from './modalEditButtons.jsx';
import TabMenu from './tabMenu.jsx';
import Survey from './survey.jsx';
import Calendar from './calendar.jsx';
import ImageGallery from './imageGallery.jsx';
import VideoComponent from './videoComponent.jsx';
import AccountPerson from './accountPerson.jsx';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerElementType: this.props.innerElementType,
            innerElementProps: this.props.innerElementProps,
            display: "none"
        }
    }

    componentsMap(elem) {
        let _this = this;
        switch (elem) {
            case ("ImageContainer"):
                return <SimpleImageComponent componentProperties={this.props.innerElementProps} editable={false} handleImageModal={(src) => this.props.handleImageModal(src)} />
                break;
            case ("VideoComponent"):
                return <VideoComponent componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("TextArea"):
                return <TextEditor componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("Slider"):
                return <SliderWebPart componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("VerticalNav"):
                return <VerticalNav componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("HorizontalNav"):
                return <HorizontalNav componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("TabMenu"):
                return <TabMenu componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} passOpen={(e) => this.props.passOpen(e)} />
                break;
            case ("Survey"):
                return <Survey componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("Calendar"):
                return <Calendar componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("AccountPerson"):
                return <AccountPerson componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            case ("ImageGallery"):
                return <ImageGallery componentProperties={this.props.innerElementProps} editable={false} handleImageModal={(src) => this.props.handleImageModal(src)} passProps={(e) => this.getProps(e)} />
                break;
            default:
                return (
                    <div>
                    </div>
                )
        }
    }

    changeButtonsStyle(display) {
        this.setState({
            display
        })
    }

    render() {
        if (this.props.passOpen) {
            return (
                // onMouseEnter={() => this.changeButtonsStyle('buttonsShow')} onMouseLeave={() => this.changeButtonsStyle('buttonsHide')}
                <div>
                    {/* <div className={this.state.display}> */}
                    <ModalEditButtons preview={this.props.preview} passOpen={(e) => this.props.passOpen(e)} modalKey={this.props.modalKey} passClose={(e) => this.props.passClose(e)} json={this.props.json} passLock={(e) => this.props.passLock(e)} />
                    {/* </div> */}
                    {this.componentsMap(this.props.innerElementType)}
                </div>
            )
        } else {
            return (
                this.componentsMap(this.props.innerElementType)
            )
        }
    }
}

export default ContentContainer;