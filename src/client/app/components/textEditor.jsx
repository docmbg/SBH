import 'babel-polyfill';
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
    componentWillMount(){
        console.log("Component will mount: ", this.props.componentProperties);
    }
    saveEdit(){
        console.log(this.state.editorState);
        console.log("Save edit: ", convertToRaw(this.state.editorState.getCurrentContent()));
        this.props.passProps({
            editorState : convertToRaw(this.state.editorState.getCurrentContent())
        })
    }
    // componentWillMount(){
    //     if(localStorage.getItem(this.props.pageName)){
    //         this.setState({
    //             editorState: EditorState.createWithContent(JSON.parse(localStorage.getItem(this.props.pageName)))
    //         })
    //     }
    // }
    // saveToLocalStorage(){
    //     localStorage.setTerm(this.state.pageName, JSON.stringify(this.state.editorState))
    // }
    // onNameChange(e){
    //     this.setState({
    //         pageName : e.target.value
    //     })
    // }

    render() {
        if(this.props.editable){
            return (
                <div className="contentEditor-wrapper">
                    <div>
                    <button onClick={() => this.saveEdit()}>Save</button>
                    </div>
                <div className="contentEditor-container">
                    {/* <button onClick={() => this.saveToLocalStorage()}>Save</button>
                    <p>Page name</p> */}
                    {/* <input value={this.state.pageName} onChange={(e) => this.onNameChange(e)}></input> */}
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
                    {/* <button onClick={() => this.saveToLocalStorage()}>Save</button>
                    <p>Page name</p> */}
                    {/* <input value={this.state.pageName} onChange={(e) => this.onNameChange(e)}></input> */}
                    <div className="contentEditor">
                        <Editor
                            editorState={this.state.editorState}
                            ReadOnly={true}
                        />
                    </div>
                    
                </div>
            );
        }
        
    }
}

export default TextEditor;