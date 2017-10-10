import React from 'react';
import ReactDOM from 'react-dom';

class SimpleTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : this.props.value,
            editable : this.props.editable
        }
    }
    onValueChange(e){
        console.log('passing props')
        let value = e.target.value;
        this.props.passProps({
            currentTextAreaValue : e.target.value
        })
        this.setState({
            value
        })
        
    }
    render(){
        if(!this.props.editable){
            return (
                <div className="simpleTextEditor-disabled">{this.state.value}</div>
            );
        } else {
            return (
                <textarea 
                    className="simpleTextEditor-enabled" 
                    onChange={(e) => this.onValueChange(e)} 
                    value={this.state.value} 
                />
            );
        }
        
    }
}

export default SimpleTextEditor;