import React from 'react';
import ReactDOM from 'react-dom';
import ImagePopUp from './imagePopUp.jsx';

class ImageCollection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            activeImage : null,
        }
    }
    updateActiveImage(activeImage,evt){
        evt.stopPropagation();
        this.setState({
            activeImage
        })
    }
    render(){
        let that = this;
        if(!this.props.images){
            return (
                <div>
                    Loading...
                </div>
            )
        }
        return (
            <div className="imageCollection-container">
                
                {
                    that.props.images.map(function(e,i){
                        let stObj = {
                            backgroundImage : `url('${e}')`
                        }
                        return (
                            <div className="imagePopUp"
                                key={`img-${i}`}
                                style={stObj}
                                onClick={(g) => that.updateActiveImage(i,g)}
                            >
                                <ImagePopUp 
                                        imageSrc={e} 
                                        updateActive={that.updateActiveImage.bind(that)} 
                                        imageIndex = {i}
                                        isActive={i==that.state.activeImage}
                                    />
                            </div>
                        )
                    }
                        
                    )
                }
            </div>
        )
    }
}
export default ImageCollection;