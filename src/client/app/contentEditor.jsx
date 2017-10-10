import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageContainer from './simpleImageComponent.jsx';
import SimpleHeader from './simpleHeader.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';

//const currentURL = new URL(window.location.href);
function getRandom(arr){
  let i = Math.floor(Math.random(0,10)*10)%arr.length
  return arr[i]
}
const currentURL = window.location.href;
const placeholderImageUrl = ["./images/kitten1.jpg","./images/kitten2.jpg","./images/kitten3.jpg"];
const defaultValues = {
  "SimpleImageContainer" : {
    "imgWidth" : 400,
    "imgHeight" : 400,
    "imgSrc" : placeholderImageUrl
  },
  "SimpleHeader" : {
    "value" : "Sample text",
    "fontSize" : 11,
    "textUnderline" : false,
    "textBold" : true
  },
  "SimpleTextEditor" : {
    "value" : "Sample text"
  },
}

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImgWidth : "",
      currentImgHeight :"",
      currentImgSrc : "",
      currentTextAreaValue : "",
      currentHeaderValue : "",
      currentHeaderBold : "",
      currentHeaderUnderline : "",
      currentHeaderFontSize : 11,
    }
  }
  componentWillMount() {
    this.revertDefaults();
  }
  revertDefaults(){
    this.setState({
      currentImgWidth : defaultValues["SimpleImageContainer"]["imgWidth"],
      currentImgHeight : defaultValues["SimpleImageContainer"]["imgHeight"],
      currentImgSrc : getRandom(defaultValues["SimpleImageContainer"]["imgSrc"]),
      currentTextAreaValue : defaultValues["SimpleTextEditor"]["value"],
      currentHeaderValue : defaultValues["SimpleHeader"]["value"],
      currentHeaderBold : defaultValues["SimpleHeader"]["textBold"],
      currentHeaderUnderline : defaultValues["SimpleHeader"]["textUnderline"],
      currentHeaderFontSize : defaultValues["SimpleHeader"]["fontSize"],
    })
  }
  changeCurrentEditableComponent(e){
    let currentItem = e.target.value;
    console.log(currentItem)
    this.setState({
      currentItem
    })
    //this.revertDefaults();
  }
  passProps(passArr){
    console.log(passArr)
    let _this = this;
    // Obj
    this.setState({
      passedProps: passArr
    })
  }
  addContent(e){
    let currentItem = this.props.editComponent;
    
    console.log(this.state)
    if(currentItem == "SimpleTextEditor"){
      this.props.passEdit(<SimpleTextEditor 
        value={this.state.passedProps.currentTextAreaValue} 
        editable={false}
      />)
      this.props.passJSON({
        type : currentItem,
        componentProperties : {
          value : this.state.passedProps.currentTextAreaValue,
          editable : false
        }
      })
    } else if(currentItem == "SimpleImageContainer"){
      this.props.passEdit(
        <SimpleImageContainer 
          imgSrc={this.state.passedProps.currentImgSrc} 
          imgWidth={this.state.passedProps.currentImgWidth} 
          imgHeight={this.state.passedProps.currentImgHeight}
          editable={false}
        />
      )
      this.props.passJSON({
        type : currentItem,
        componentProperties : {
          imgSrc : this.state.passedProps.currentImgSrc,
          imgWidth : this.state.passedProps.currentImgWidth,
          imgHeight : this.state.passedProps.currentImgHeight,
          editable : false
        }
      })
    } else if(currentItem == "SimpleHeader"){
      this.props.passEdit(
        <SimpleHeader 
          value={this.state.passedProps.currentHeaderValue} 
          fontSize={this.state.passedProps.currentHeaderFontSize} 
          textBold={this.state.passedProps.currentHeaderBold}
          textUnderline={this.state.passedProps.currentHeaderUnderline}
          editable={false}
        />
      )
      this.props.passJSON({
        type : currentItem,
        componentProperties : {
          value : this.state.passedProps.currentHeaderValue,
          fontSize : this.state.passedProps.currentHeaderFontSize,
          textBold : this.state.passedProps.currentHeaderBold,
          textUnderline : this.state.passedProps.currentHeaderUnderline,
          editable : false
        }
      })
    }
  }
  render() {
    let editContainer;
    if(this.props.editComponent == "SimpleTextEditor"){
      editContainer = <SimpleTextEditor value={this.state.currentTextAreaValue} editable={true} passProps={this.passProps.bind(this)}/>
    } else if(this.props.editComponent == "SimpleImageContainer"){
        editContainer = <SimpleImageContainer 
        imgSrc={this.state.currentImgSrc} 
        imgWidth={this.state.currentImgWidth} 
        imgHeight={this.state.currentImgHeight}
        editable={true}
        passProps={this.passProps.bind(this)}
      />
    } else if(this.props.editComponent == "SimpleHeader"){
        editContainer = <SimpleHeader 
        value={this.state.currentHeaderValue} 
        fontSize={this.state.currentHeaderFontSize} 
        textBold={this.state.currentHeaderBold}
        textUnderline={this.state.currentHeaderUnderline}
        editable={true}
        passProps={this.passProps.bind(this)}
      />
    }
    return (
        <div>
          <button className="addButton" onClick={(e) => this.addContent(e)}>Add</button>
            {editContainer}
        </div>
    )
  }
}

export default ContentEditor;
