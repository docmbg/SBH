import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleHeader from './simpleHeader.jsx';
import TextEditor from './textEditor.jsx';
import SliderWebPart from './slider.jsx';
import SideNav from './sideNav.jsx';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerElementType: this.props.innerElementType,
            innerElementProps: this.props.innerElementProps
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
                return <SimpleHeader componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("Slider"):
                return <SliderWebPart componentProperties={this.props.innerElementProps} editable={false} passProps={() => null} />
                break;
            case ("SideNav"):
                return <SideNav componentProperties={this.props.innerElementProps} editable={false} passProps={(e) => this.getProps(e)} />
                break;
            default:
                return (
                    <div>
                    </div>
                )
        }
    }
    render() {
        return (
            this.componentsMap(this.props.innerElementType)
        )
    }
}

export default ContentContainer;