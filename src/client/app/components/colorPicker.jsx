import React from 'react';
import ReactDOM from 'react-dom';
import { ChromePicker } from 'react-color';


export default class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           chosenColor: this.props.chosenColor
        }
        this.handleChangeComplete = (color, event) => {
            this.setState({ chosenColor: color.hex });
        };
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         chosenColor: nextProps.chosenColor
    //     })
    // }

    saveEdit() {
        this.props.passProps(this.state.chosenColor)
    }



    render() {
        return (   
            <div className="colorPickerWrapper">
            <ChromePicker
                color={ this.state.chosenColor }
                onChangeComplete={this.handleChangeComplete}
            />
            <button className="colorPickerButton confirm" onClick={()=>this.saveEdit()}> Confirm </button>
            </div>
        )
    }
}