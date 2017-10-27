import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';
import SimpleHeader from './simpleHeader.jsx';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerElementType : this.props.innerElementType,
            innerElementProps: this.props.innerElementProps
        }
    }

    componentsMap(elem) {
        console.log("Content Container Element Props : ", this.props.innerElementProps)
        switch (elem) {
            case ("ImageContainer"):
                return (
                    <SimpleImageComponent componentProperties={this.props.innerElementProps} />
                )
                break;
            case ("TextArea"):
                return (
                    <SimpleTextEditor componentProperties={this.props.innerElementProps} />
                )
                break;
            case ("TextHeader"):
                return (
                    <SimpleHeader componentProperties={this.props.innerElementProps} />
                )
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