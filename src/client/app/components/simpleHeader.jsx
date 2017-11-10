import React from 'react';
import ReactDOM from 'react-dom';

class SimpleHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.componentProperties.value || "",
            fontSize: this.props.componentProperties.fontSize || "0",
            textUnderline: this.props.componentProperties.textUnderline || false,
            textBold: this.props.componentProperties.textBold || false,
            editable: this.props.editable
        }
    }
    passProps(e, occ) {
        let newVal = e.target.value;
        switch (occ) {
            case ("value"):
                this.setState({
                    value: newVal
                })
                break;
            case ("fontSize"):
                this.setState({
                    fontSize: newVal
                })
                break;
            case ("textUnderline"):
                this.setState({
                    textUnderline: newVal
                })
                break;
            case ("textBold"):
                this.setState({
                    textBold: newVal
                })
                break;
            default:
                console.log("Nothing to change")
        }
    }
    saveEdit() {
        this.props.passProps({
            value: this.state.value,
            fontSize: this.state.fontSize,
            textUnderline: this.state.textUnderline,
            textBold: this.state.textBold
        })
    }
    render() {
        let styleObj = {
            fontSize: this.state.fontSize.toString() + "px",
            textDecoration: (this.state.textUnderline ? "underline" : "none"),
            fontWeight: (this.state.textBold ? 700 : 450),
        };
        if (!this.props.editable) {
            return (
                <div
                    className="content-simpleHeader content-disabled"
                    style={styleObj}
                >
                    {this.state.value}
                </div>
            )
        }
        else {
            return (
                <div className="modal-content-edit-container">
                    <p className="modal-content-edit-header">Bold</p>
                    <input
                        type="checkbox"
                        defaultChecked={this.state.textBold || false}
                        onChange={(e) => this.passProps(e, "textBold")}
                        className="modal-content-edit-input-checkbox"
                    ></input>
                    <p className="modal-content-edit-header">Underline</p>
                    <input
                        type="checkbox"
                        defaultChecked={this.state.textUnderline || false}
                        onChange={(e) => this.passProps(e, "textBold")}
                        className="modal-content-edit-input-checkbox"
                    ></input>
                    <p className="modal-content-edit-header">Font Size</p>
                    <input
                        type="number"
                        value={parseInt((this.state.fontSize || "0px").replace("px", ""))}
                        onChange={(e) => this.passProps(e, "fontSize")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <p className="modal-content-edit-header">Text</p>
                    <input
                        type="text"
                        value={this.state.value || ""}
                        onChange={(e) => this.passProps(e, "value")}
                        className="modal-content-edit-input-text"
                    ></input>
                    <div>
                        <button
                            className="modal-content-edit--save"
                            onClick={() => this.saveEdit()}
                        >Save</button>
                    </div>
                </div>
            )
        }
    }
}

export default SimpleHeader;