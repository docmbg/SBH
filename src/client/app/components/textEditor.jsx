
import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: (this.props.componentProperties.editorState ? EditorState.createWithContent(convertFromRaw(this.props.componentProperties.editorState)) : EditorState.createEmpty())
        };
        this.onEditorStateChange = (editorState) => {
            this.setState({
                editorState
            })
        };
    }
    saveEdit() {
        this.props.passProps({
            editorState: convertToRaw(this.state.editorState.getCurrentContent())
        })
    }

    render() {
        if (this.props.editable) {
            return (
                <div className="contentEditor-wrapper">
                    <div>
                        <button
                            onClick={() => this.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                    <div className="contentEditor-container">
                        <div className="contentEditor">
                            <Editor
                                editorState={this.state.editorState}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="contentEditor-container">
                    <div className="contentEditor">
                        <Editor
                            editorState={this.state.editorState}
                            toolbarStyle={{ display: "none", visibility: "hidden" }}
                            editorStyle={{ width: "100%", height: "100%" }}
                            readOnly={true}
                        />
                    </div>
                </div>
            );
        }

    }
}

export default TextEditor;