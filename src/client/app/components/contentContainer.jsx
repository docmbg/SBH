import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageComponent from './simpleImageComponent.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';
import SimpleHeader from './simpleHeader.jsx';
import TextEditor from './textEditor.jsx';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class ContentContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerElementType : this.props.innerElementType,
            innerElementProps: this.props.innerElementProps
        }
    }

    componentsMap(elem) {
        let _this = this;
        switch (elem) {
            case ("ImageContainer"):
                return (
                    <SimpleImageComponent componentProperties={this.props.innerElementProps} editable={false}/>
                )
                break;
            case ("TextArea"):
                // console.log("Before convert from Raw :", _this.props.innerElementProps)
                // let newProps = convertFromRaw(_this.props.innerElementProps)
                return (
                    <TextEditor componentProperties={this.props.innerElementProps} editable={false} passProps={() => null}/>
                )
                break;
            case ("TextHeader"):
                return (
                    <SimpleHeader componentProperties={this.props.innerElementProps} editable={false}/>
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
        console.log(this.props.innerElementProps);
        return (
            this.componentsMap(this.props.innerElementType)
        )
    }
}

export default ContentContainer;