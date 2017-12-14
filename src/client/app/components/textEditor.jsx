
import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: (this.props.componentProperties.editorState ? EditorState.createWithContent(convertFromRaw(this.props.componentProperties.editorState)) : EditorState.createEmpty()),
            edited: false,
        };
        this.onEditorStateChange = (editorState) => {
            //console.log("Passing props check: ", this.props.passProps, this.props.componentIndex, this.props.passProps && this.props.componentIndex)
            this.setState({
                editorState,
            })
        };
    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            editorState: (nextProps.componentProperties.editorState ? EditorState.createWithContent(convertFromRaw(nextProps.componentProperties.editorState)) : EditorState.createEmpty()),
        })
    }

    saveEdit() {
        console.log(convertToRaw(this.state.editorState.getCurrentContent()))
        this.props.passProps({
            editorState: convertToRaw(this.state.editorState.getCurrentContent()),
        })
    }

    passClose() {
        let confirmResult = confirm("Would you like to save your changes before exiting?")
        if (!confirmResult) {
            this.props.passClose()
            return false
        }
        this.saveEdit()
    };
    
    render() {

        let editor = <div></div>

        if (this.props.componentProperties.editable) {
            editor = <Editor
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
            />
        } else if (this.state.editorState.getCurrentContent().hasText()) {
            editor = <Editor
                editorState={this.state.editorState}
                toolbarStyle={{ display: "none", visibility: "hidden" }}
                editorStyle={{ width: "100%", height: "100%" }}
                readOnly={true}
            />
        }

        if (this.props.editable) {
            return (
                <div>
                    <div className="contentEditor-wrapper">
                        <div>
                            <button
                                onClick={() => this.saveEdit()}
                                className="dxc-button"
                            >Save</button>
                            <button className='dxc-close' onClick={() => this.passClose()}>
                                <i className="material-icons">&#xE5CD;</i>
                            </button>
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
                </div>
            );
        } else {
            return (
                <div>
                    <div className="contentEditor-container">
                        <div className="contentEditor">
                            {editor}
                        </div>
                    </div>
                </div>
            );
        }
    }

}

export default TextEditor;