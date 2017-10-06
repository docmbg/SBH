import React from 'react';
import ReactDOM from 'react-dom';

class SimpleHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            fontSize: this.props.fontSize,
            textUnderline: this.props.textUnderline,
            textBold: this.props.textBold,
            editable: this.props.editable
        }
    }
    onValueChange(e, changeCase) {
        console.log('passing props')

        if (changeCase == "textUnderline") {
            this.setState({
                textUnderline: e.target.value
            })
            this.props.passProps({
                currentHeaderValue: this.state.value,
                currentHeaderBold: this.state.textBold,
                currentHeaderUnderline: e.target.textUnderline,
                currentHeaderFontSize: this.state.fontSize,
            })
        } else if (changeCase == "textBold") {
            this.setState({
                textBold: e.target.value
            })
            this.props.passProps({
                currentHeaderValue: this.state.value,
                currentHeaderBold: e.target.textBold,
                currentHeaderUnderline: this.state.textUnderline,
                currentHeaderFontSize: this.state.fontSize,
            })
        } else if (changeCase == "fontSize") {
            this.setState({
                fontSize: e.target.value
            })
            this.props.passProps({
                currentHeaderValue: this.state.value,
                currentHeaderBold: this.state.textBold,
                currentHeaderUnderline: this.state.textUnderline,
                currentHeaderFontSize: e.target.value,
            })
        } else if (changeCase == "value") {
            this.setState({
                value: e.target.value
            })
            this.props.passProps({
                currentHeaderValue: e.target.value,
                currentHeaderBold: this.state.textBold,
                currentHeaderUnderline: this.state.textUnderline,
                currentHeaderFontSize: this.state.fontSize,
            })
        }

    }
    render() {
        let styleObj = {
            fontSize: this.state.fontSize.toString() + "px",
            textDecoration: (this.state.textUnderline ? "underline" : "none"),
            fontWeight: (this.state.textBold ? 700 : 450),
        };
        if (!this.props.editable) {
            return (
                <div className="simpleHeader-disabled" style={styleObj}>
                    {this.state.value}
                </div>
            )
        }
        return (
            <div className="simpleHeader-enabled">
                <div className="edit-details">
                    <p className="edit-input-title">Underline</p>
                    <input
                        className="edit-input-checkbox"
                        type="checkbox"
                        defaultChecked={this.state.textUnderline}
                        onChange={(e) => this.onValueChange(e, "textUnderline")}
                    />
                    <p className="edit-input-title">Bold</p>
                    <input
                        className="edit-input-checkbox"
                        type="checkbox"
                        checked={this.state.textBold}
                        onChange={(e) => this.onValueChange(e, "textBold")}
                    />
                    <p className="edit-input-title">Font Size</p>
                    <input
                        className="edit-input-short"
                        type="number"
                        defaultChecked={this.state.fontSize}
                        onChange={(e) => this.onValueChange(e, "fontSize")}
                    />
                </div>
                <div className="edit-preview">
                    <p>Text</p>
                    <input onChange={(e) => this.onValueChange(e, "value")} value={this.state.value} style={styleObj} />
                </div>
            </div>
        );
    }
}

export default SimpleHeader;