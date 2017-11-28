import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleHeader from './simpleHeader.jsx';
import TextEditor from './textEditor.jsx';
import SliderWebPart from './slider.jsx';
import SideNav from './sideNav.jsx';
import ModalEditButtons from './modalEditButtons.jsx';
import TabMenu from './tabMenu.jsx';
import Survey from './survey.jsx';
import Calendar from './calendar.jsx';


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
                return <SimpleImageComponent componentProperties={this.props.innerElementProps} editable={false} />
                break;
            case ("TextArea"):
                return <TextEditor componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("TextHeader"):
                return <SimpleHeader componentProperties={this.props.innerElementProps} editable={this.props.innerElementProps.editable ? true : false} passProps={() => null} />
                break;
            case ("Slider"):
                return <SliderWebPart componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("SideNav"):
                return <SideNav componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
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
                        <ModalEditButtons passOpen={(e) => this.props.passOpen(e)} passClose={(e) => this.props.passClose(e)} />
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