import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalEditButtons extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        let _this = this;
        return (
            <div className="buttonWrapper">
                <button className="grid-controls-button button--settings" onClick={(evt) => _this.props.passOpen(evt)}>
                    <i className="material-icons">&#xE869;</i>
                </button>
                <button className="grid-controls-button button--remove" onClick={(evt) => _this.props.passClose(evt)}>
                    <i className="material-icons">&#xE5CD;</i>
                </button>
            </div>
        )
    }

}
