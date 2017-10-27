import 'babel-polyfill';
import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "",
            editorState: EditorState.createEmpty()
        };
        this.onEditorStateChange = (editorState) => {
            // console.log(JSON.stringify(editorState));
            this.setState({
                editorState,
            });
        };
    }
    componentWillMount(){
        if(localStorage.getItem(this.props.pageName)){
            this.setState({
                editorState: EditorState.createWithContent(JSON.parse(localStorage.getItem(this.props.pageName)))
            })
        }
    }
    saveToLocalStorage(){
        localStorage.setTerm(this.state.pageName, JSON.stringify(this.state.editorState))
    }
    onNameChange(e){
        this.setState({
            pageName : e.target.value
        })
    }

    render() {
        return (
            <div className="contentEditor-container">
                <button onClick={() => this.saveToLocalStorage()}>Save</button>
                <p>Page name</p>
                <input value={this.state.pageName} onChange={(e) => this.onNameChange(e)}></input>
                <div className="contentEditor">
                    <Editor
                        editorState={this.state.editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </div>

            </div>
        );
    }
}

export default TextEditor;