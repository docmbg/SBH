import React from 'react';
import ReactDOM from 'react-dom';


class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isActive: false
        }
    }

    componentWillReceiveProps(){
        this.setState({
            isActive: this.props.isActive
        })
    }

    closeModal(){
        console.log('test')
        this.setState({
            isActive: false
        })
    }

    render(){
        console.log(this.state.isActive)
          if(this.state.isActive){
            return (
                <div className="modal-container">
                    <div className="modal-background" onClick={()=>this.closeModal()}>
                    </div>
                    <div className="modal-content">
                    </div>

                </div>
            )
        } else {
            return (
                <div className="hidden">
                </div>
            )
        }
    }
    
} 


export default Modal;