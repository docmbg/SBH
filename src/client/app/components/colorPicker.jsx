import React from 'react';
import ReactDOM from 'react-dom';
import { SketchPicker } from 'react-color';


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
            <SketchPicker
                presetColors={['#000','#666','#ffed00','#64ff00','#00c9ff','#d9d9d9','#fff']}
                color={ this.state.chosenColor }
                onChangeComplete={this.handleChangeComplete}
            />
            <button className="colorPickerButton confirm" onClick={()=>this.saveEdit()}> Confirm </button>
            </div>
        )
    }
}