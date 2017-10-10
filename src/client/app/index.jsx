import React from 'react';
import ReactDOM from 'react-dom';
import SimpleImageContainer from './simpleImageComponent.jsx';
import SimpleHeader from './simpleHeader.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';
import ContentEditor from './contentEditor.jsx';
import GridLayout from './gridLayout.jsx';
import GridLayoutResponsive  from './gridLayoutResponsive.jsx'
//const currentURL = new URL(window.location.href);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      site: "main",
      mode: "edit",
      siteName: "test-preview",
      currentItem: "SimpleImageContainer",
      content: [],
      contentJSON: [],
      JSON: localStorage.getItem("SBHJSON")
    }
  }
  componentWillMount() {
    let _this = this;
    if (window.location.href.indexOf("?") < 0) {
      this.setState({
        site: "main"
      })
    } else {
      this.setState({
        site: getParams("page", window.location.href)
      })
    }

    if (localStorage.getItem(this.state.siteName) && window.location.href.indexOf("?") > 0) {
      console.log("site name: ", _this.state.siteName, this.state.site);
      this.setState({
        contentJSON: JSON.parse(localStorage.getItem(localStorage.getItem(_this.state.siteName)))
      })
    }
  }
  saveToList() {
    let currentItemId = generateRandomKey();
    if (!localStorage.getItem(this.state.siteName)) {
      localStorage.setItem(this.state.siteName, currentItemId);
      localStorage.setItem(currentItemId, JSON.stringify(this.state.contentJSON))
    } else {
      localStorage.setItem(localStorage.getItem(this.state.siteName), JSON.stringify(this.state.contentJSON));
    }
  }
  changeCurrentEditableComponent(e) {
    let currentItem = e.target.value;
    this.setState({
      currentItem
    })
  }
  addContent(passed) {
    let content = this.state.content;
    content.push(passed)
    this.setState({
      content
    })
  }
  addContentJSON(passed) {
    let contentJSON = this.state.contentJSON;
    contentJSON.push(passed)
    this.setState({
      contentJSON
    })
  }
  parseLayoutChange(layout){
    console.log(layout)
  }
  render() {
    if (this.state.mode == "edit") {
      return (
        <div className="siteContainer">
          <div className="contentRow">
          {/* <GridLayout 
            onLayoutChange={(e) => this.parseLayoutChange(e)} 
            items={20}
            rowHeight= {30}
            cols={12}
          /> */}
          <GridLayoutResponsive />
          </div>
        </div>
      )
    }
  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app'))

export default App;

//util funcs
function getParams(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function generateRandomKey() {
  let p = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 7; i++) {
    p += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return p
}
function parseContentJSON(obj) {
  console.log(obj);
  if (obj["type"] == "SimpleTextEditor") {
    return (<SimpleTextEditor
      value={obj.componentProperties.value}
      editable={false}
    />)
  } else if (obj["type"] == "SimpleImageContainer") {
    return (<SimpleImageContainer
      imgSrc={obj.componentProperties.imgSrc}
      imgWidth={obj.componentProperties.imgWidth}
      imgHeight={obj.componentProperties.imgHeight}
      editable={false}
    />
    )
  } else if (obj["type"] == "SimpleHeader") {
    return (<SimpleHeader
      value={obj.componentProperties.value}
      fontSize={obj.componentProperties.fontSize}
      textBold={obj.componentProperties.textBold}
      textUnderline={obj.componentProperties.textUnderline}
      editable={false}
    />)
  }
}
