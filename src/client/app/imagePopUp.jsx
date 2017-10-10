import React from 'react';
import ReactDOM from 'react-dom';


class ImagePopUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        let that = this;
          if(that.props.isActive){
            return (
                <div className="imagePopUp-container">
                    <div className="imagePopUp-background">
                    </div>
                    <div className="imagePopUp-image" onClick={(g) => that.props.updateActive(null,g)}>
                        <img src={that.props.imageSrc}/>
                    </div>
                    <div className="imagePopUp-title">
                        <p>{that.props.imageTitle || ""}</p>
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


export default ImagePopUp;