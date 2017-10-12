import React from 'react';
import ReactDOM from 'react-dom';

class SimpleTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.componentProperties.value || "",
        }
    }
    passProps(e){
        this.setState({
            value : e.target.value
        })
    }
    saveEdit(){
        this.props.passProps({
            value: this.state.value
        })
    }
    render() {
        if(!this.props.editable){
            return (
                <div className="simpleTextEditor-textArea">{this.state.value}</div>
            );
        } else {
            return (
                <div className="editContainer">
                <textarea value={this.state.value || ""} onChange={(e) => this.passProps(e)}></textarea>
                <div>
                    <button onClick={() => this.saveEdit()}>Save</button>
                    </div>
                </div>
            )
        }
    }
}

export default SimpleTextEditor;