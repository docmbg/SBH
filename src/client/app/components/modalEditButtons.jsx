import React from 'react';
import ReactDOM from 'react-dom';

export default class ModalEditButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locker: ''
        }
    }

    componentWillReceiveProps(nextProps){
        let currentStateJSONArr = JSON.parse(nextProps.json);
        let locker;
        let currentElement = currentStateJSONArr.filter(e => e['containerKey'] == this.props.modalKey)[0];
        if(currentElement['containerProps']['static'] == true){
            locker = <i className="fa fa-lock fa-4x" ></i>            
        }else {
            locker = <i className="fa fa-unlock-alt fa-4x" ></i>
        }

        this.setState({locker})
    }   

    confirmRemove(evt){
        evt.stopPropagation();
        let confirmResult = confirm('This is will permanently delete the item. Are you sure you want to proceed?')
        if(confirmResult){
            this.props.passClose()
        }
    }

    render() {
        let _this = this;
        return (
            <div className="buttonWrapper">
                <button className={this.props.preview ? 'hidden': 'grid-controls-button button--settings'} onMouseDown={(evt) => this.props.passLock(evt)}>
                    {this.state.locker}
                </button>
                <button className={this.props.preview ? 'hidden': 'grid-controls-button button--settings'} onMouseDown={(evt) => _this.props.passOpen(evt)}>
                    <i className="fa fa-cog fa-4x" ></i>

                </button>
                <button className={this.props.preview ? 'hidden': 'grid-controls-button button--remove'} onMouseDown={(evt) => this.confirmRemove(evt)}>
                    <i className="fa fa-trash fa-4x"></i>
                </button>
            </div>
        )
    }

}
