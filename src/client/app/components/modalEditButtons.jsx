import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalEditButtons extends React.Component {
    constructor(props) {
        super(props);
    }

    confirmRemove(){
        let confirmResult = confirm('This is will permanently delete the item. Are you sure you want to proceed?')
        if(confirmResult){
            this.props.passClose()
        }
    }

    render() {
        let _this = this;
        return (
            <div className="buttonWrapper">
                <button className="grid-controls-button button--settings" onClick={(evt) => _this.props.passOpen(evt)}>
                    <i className="fa fa-cog fa-4x" ></i>

                </button>
                <button className="grid-controls-button button--remove" onClick={(evt) => this.confirmRemove()}>
                    <i className="fa fa-trash fa-4x"></i>
                </button>
            </div>
        )
    }

}
