import React from 'react';
import ReactDOM from 'react-dom';
// import SimpleImageContainer from './simpleImageComponent.jsx';
// import SimpleHeader from './simpleHeader.jsx';
import SimpleTextEditor from './simpleTextEditor.jsx';
// import ContentEditor from './contentEditor.jsx';
import ReactGridLayout from 'react-grid-layout';
import Slider from './slider.jsx';
import Modal from './modal.jsx';
import { WidthProvider, Responsive } from 'react-grid-layout';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints={ lg: 1600, md: 1200, sm: 768, xs: 480};

//const currentURL = new URL(window.location.href);


class App extends React.Component {
  constructor(props) {
    super(props);
    // const layout = [{ i: '0', x: 0, y: 0, w: 1, h: 2, },
    // { i: '1', x: 1, y: 0, w: 3, h: 2, },
    // { i: '2', x: 4, y: 0, w: 1, h: 2 }]
    const layouts = {} 
    const currentItems = 0
    const items = [];
    const defaultProps = {
      className: "layout",
      items: 20,
      rowHeight: 30
    };
    const modalOpened = false;
    this.state = { layouts, defaultProps, currentItems, items, modalOpened};
  }
  onLayoutChange(layout,layouts) {
    this.setState({layouts});
  }

  openModal(){
   
    this.setState({
      modalOpened: true
    })
  }

  addNewContainer(){
    let currentItems = this.state.currentItems;
    currentItems++;
    let items = this.state.items;
    items.push(
      <div 
        className="gridLayout-cell" 
        key={currentItems.toString()} 
        data-grid={{w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3}}
      >
         <button onClick={()=> this.openModal()}>+</button>
      </div>
    )
    this.setState({
      currentItems, items
    })
  }
  render() {
    let currentEditable;
    let _this = this;
    let modal = this.state.modalOpened == false ? <Modal isActive={false}/> : <Modal isActive={true}/>
    return (
      <div className="layoutContainer">
        <button onClick={() => this.addNewContainer()} className="addButton">Add new container</button>      
        <ResponsiveReactGridLayout className="layout"
        onLayoutChange={(layout, layouts) => this.onLayoutChange(layout,layouts)}
        preventCollision={false}
        layouts={this.state.layouts}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4}}
        breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480}}
        width={1600}
        rowHeight={30} >
        {this.state.items.map(e => e)}
      </ResponsiveReactGridLayout>
      {modal}
      </div>

    )
  }
}


ReactDOM.render(
  <App />
  , document.getElementById('app'))

export default App;

/* function getParams(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
} */