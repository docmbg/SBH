import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import Modal from './components/modal.jsx';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ContentContainer from './components/contentContainer.jsx';
import TextEditor from './components/textEditor.jsx';




const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 480 };
const draggableComponents = [
  {
    type: 'Slider-Component',
    defaultSize: {
      w: 5,
      h: 12
    }
  },
  {
    type: 'ImageContainer-Component',
    defaultSize: {
      w: 6,
      h: 7
    }
  },
  {
    type: 'TextArea-Component',
    defaultSize: {
      w: 4,
      h: 10
    }
  }
];
const windowW = window.innerWidth;
const windowH = window.innerHeight;

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function handleDragStart(e) {

}

class App extends React.Component {
  constructor(props) {
    super(props);
    const layouts = {};
    const currentItems = 0;
    const items = [];
    const currentModalElement = "";
    const currentStateJSON = "[]";
    const currentActiveModal = "0";
    const draggedComponent = '';
    const currentComponentProps = {}
    const currentPage = "";
    const currentMode = "";
    const allAdded = 0;
    const x = 0;
    const y = 0;
    const dragging = false;
    const shadowComponent = {
      style: {
        width: '200px',
        position: 'absolute',
        top: '0px',
        display: 'none',
        left: '0px',
        border: '2px solid black',
        height: '200px',
      }
    }
    const defaultProps = {
      className: "layout",
      items: 20,
      rowHeight: 30
    };
    const modalOpened = false;
    this.state = {
      currentPage,
      dragging,
      shadowComponent,
      draggedComponent,
      layouts, defaultProps, currentItems,
      items, modalOpened, currentModalElement, currentComponentProps,
      currentStateJSON, allAdded
    };
  }
  componentWillMount() {
    if (getParameterByName("type") == "edit" || window.location.href.indexOf("?") < 0) {
      this.setState({
        currentMode: "edit",
        currentPage: getParameterByName("page") || "",
        currentStateJSON: (localStorage.getItem(getParameterByName("page")) || "[]")
      })
    } else {
      this.setState({
        currentMode: "view",
        currentPage: getParameterByName("page"),
        currentStateJSON: localStorage.getItem(getParameterByName("page"))
      })
    }

  }
  onLayoutChange(layout, layouts) {
    this.setState({ layouts });
  }

  openModal(e, modalKey, modalType) {
    let currentElement = JSON.parse(this.state.currentStateJSON).filter(function (e) {
      return e["containerKey"] == modalKey
    })[0]
    if (modalKey == this.state.currentActiveModal) {
      this.setState({
        modalOpened: true,
        currentActiveModal: modalKey,
        currentModalElement: modalType,

      });
    } else {
      this.setState({
        modalOpened: true,
        currentActiveModal: modalKey,
        currentModalElement: modalType,
        currentComponentProps: currentElement ? currentElement["innerElement"]["innerElementProps"] : {}
      });
    }


  }

  addNewContainer(e, xPosition, yPosition) {
    let allAdded = this.state.allAdded;
    allAdded++
    let currentStateJSON = JSON.parse(this.state.currentStateJSON);
    let currentStateJSONArr = currentStateJSON;
    let elementSize = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0].defaultSize;
    console.log(this.state.draggedComponent)
    currentStateJSONArr.push({
      containerKey: allAdded,
      containerProps: {
        w: elementSize.w, h: elementSize.h, x: xPosition, y: yPosition, minW: 1, minH: 1
      },
      innerElement: {
        type: this.state.draggedComponent.split('-')[0],
        innerElementProps: {}
      }
    });
    currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON, allAdded
    });
  }
  savePage() {
    if (this.state.currentPage.length < 1) {
      let prompt = window.prompt("Provide a name for this page");
      if ((prompt.match(/[\!\@\#\$\%\^\&\*\(\) ]/g) || []).length > 0) {
        alert("The name cannot contain special symbols or spaces");
      } else {
        localStorage.setItem(prompt, this.state.currentStateJSON);
      }
    } else {
      localStorage.setItem(this.state.currentPage, this.state.currentStateJSON);
    }

  }
  getModalProps(modalProps, modalKey, modalElementType) {
    let currentStateJSON = JSON.parse(this.state.currentStateJSON);
    currentStateJSON = currentStateJSON.map(function (e) {
      if (e["containerKey"] == modalKey) {
        e["innerElement"]["type"] = modalElementType;
        e["innerElement"]["innerElementProps"] = modalProps;
      }
      return e
    })
    currentStateJSON = JSON.stringify(currentStateJSON)
    this.setState({
      currentStateJSON,
      currentComponentProps: modalProps
    })
  }
  updateCurrentStateJSON(currentLayout) {
    let currentStateJSON = [];
    let currentStateJSONArr = JSON.parse(this.state.currentStateJSON);
    currentStateJSONArr = currentStateJSONArr.map(function (e, i) {
      e["containerProps"] = currentLayout[i]
      return e
    });
    currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON
    });
  }

  onRemoveItem(componentKey) {

    let  currentStateJSONArr  =  JSON.parse(this.state.currentStateJSON);
    let  componentIndex  =  0;
    console.log(currentStateJSONArr)
    currentStateJSONArr.map(function (e, i) {
      if (e["containerKey"]  ==  componentKey) {
        componentIndex  =  i;
      }
    })
    currentStateJSONArr.splice(componentIndex , 1);
    let  currentStateJSON  =  JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON
    })
  }

  onLayoutChange(layout, layouts) {
    this.updateCurrentStateJSON(layout);
  }
  updateStatus(modalOpened) {
    this.setState({
      modalOpened: false,
      currentModalElement: ""
    });
  }
  updateCurrentModalElement(evt) {
    let currentModalElement = evt.target.value;
    this.setState({
      currentModalElement
    });
  }

  allowDrop(e) {
    e.preventDefault();
  }

  drag(e) {
    this.setState({
      draggedComponent: e.target.className
    })
  }

  currentDragPostion(e) {
    if (this.state.draggedComponent.indexOf('Component') > -1) {
      let size = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0].defaultSize
      let width = `${windowW / 12 * size.w}px`;
      let height = `${windowH / 60 * size.h}px`;
      this.setState({
        shadowComponent: {
          style: {
            width: width,
            position: 'absolute',
            top: e.screenY - 60,
            left: e.screenX - 40,
            display: 'block',
            border: '2px dotted grey',
            height: height,
          }
        }
      })
    }
  }

  removeShadowComponent(e) {
    // let shadowComponent = this.state.shadowComponent
    // shadowComponent.style.display = 'none'
    // console.log(shadowComponent)
    this.setState({
      shadowComponent: {
        style: {
          width: '200px',
          position: 'absolute',
          top: e.screenY,
          left: e.screenX,
          display: 'none',
          border: '2px dotted grey',
          height: '200px',
        }
      }
    })
  }

  drop(e) {
    if (this.state.draggedComponent.indexOf('Component') > -1) {
      let xPosition = Math.floor(e.screenX / windowW * 12);//calculation needed
      let yPosition = Math.floor(e.screenY / windowW * 30);//calculation needed    
      this.setState({
        draggedComponent: ''
      })
      this.addNewContainer(e, xPosition, yPosition)
    }
  }

  render() {

    let _this = this;
    let currentStateComponents = JSON.parse(this.state.currentStateJSON);
    if (this.state.currentMode == "edit") {
      return (
        <div className="page" onDragOver={(e) => this.currentDragPostion(e)} onDragEnd={(e) => this.removeShadowComponent(e)}>
          <div className="shadowComponent" style={this.state.shadowComponent.style}></div>
          <div className="page-edit-banner">
            <button onClick={() => this.addNewContainer()} className="page-edit-banner-addButton" >Add a new container</button>
            <button onClick={() => this.savePage()} className="page-edit-banner-addButton">Save the page</button>
            <button onDragStart={(e) => this.drag(e)} draggable="true" className="Slider-Component"><i className="material-icons">&#xE8EB;</i></button>
            <button onDragStart={(e) => this.drag(e)} draggable="true" className="TextArea-Component"><i className="material-icons">&#xE23C;</i></button>
            <button onDragStart={(e) => this.drag(e)} draggable="true" className="ImageContainer-Component"><i className="material-icons">&#xE439;</i></button>
          </div>
          <div className="fullGrid" onDrop={(e) => this.drop(e)} onDragOver={(e) => this.allowDrop(e)} >
            <ResponsiveReactGridLayout className="layout"
              onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
              preventCollision={false}
              layouts={this.state.layouts}
              cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
              breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
              width={1600}
              verticalCompact={false}
              rowHeight={15} >
              {currentStateComponents.map(function (e, i) {
                let modalKey = e["containerKey"];
                let modalType = e["innerElement"] ? (e["innerElement"]["type"] || "") : "";
                return (
                  <div
                    className="gridLayout-cell"
                    key={e["containerKey"]}
                    data-grid={e["containerProps"]}
                  >
                    <ContentContainer innerElementType={e["innerElement"]["type"]} innerElementProps={e["innerElement"]["innerElementProps"]} />
                    <div className="buttonWrapper">
                      <button className="grid-controls-button button--settings" onClick={(e) => _this.openModal(e, modalKey, modalType)}>
                        <i className="material-icons">&#xE869;</i>
                      </button>
                      <button className="grid-controls-button button--remove" onClick={(e) => _this.onRemoveItem(modalKey)}>
                        <i className="material-icons">&#xE5CD;</i>
                      </button>
                    </div>
                  </div>
                );

              })}
            </ResponsiveReactGridLayout>
          </div>
          <Modal
            passProps={(modalProps, modalKey, modalElementType) => this.getModalProps(modalProps, modalKey, modalElementType)}
            currentComponentProps={this.state.currentComponentProps}
            currentComponent={this.state.currentModalElement}
            currentActiveModal={this.state.currentActiveModal}
            isActive={this.state.modalOpened}
            updateStatus={(e) => this.updateStatus(e)}
            updateCurrentElement={(e) => this.updateCurrentModalElement(e)}
          />
        </div>
      );
    } else {
      return (
        <div className="page">
          <ResponsiveReactGridLayout className="layout"
            onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
            preventCollision={false}
            isDraggable={false}
            isResizable={false}
            layouts={this.state.layouts}
            cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
            breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
            width={1600}
            rowHeight={10} >
            {currentStateComponents.map(function (e, i) {
              let modalKey = e["containerKey"];
              return (
                <div
                  className="gridLayout-cell"
                  key={e["containerKey"]}
                  data-grid={e["containerProps"]}
                >
                  <ContentContainer innerElementType={e["innerElement"]["type"]} innerElementProps={e["innerElement"]["innerElementProps"]} />
                </div>
              );

            })}
          </ResponsiveReactGridLayout>
        </div>
      )
    }

  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app'))

export default App;