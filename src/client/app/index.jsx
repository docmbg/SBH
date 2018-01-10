import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import Modal from './components/modal.jsx';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ContentContainer from './components/contentContainer.jsx';
import ImageModal from './components/imageModal.jsx';
import { draggableComponents } from './components/draggableComponents.js';

function get_browser() {
  var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: (tem[1] || '') };
  }
  if (M[1] === 'Chrome') {

    tem = ua.match(/\bOPR|Edge\/(\d+)/)
    if (tem != null) { return { name: 'Opera', version: tem[1] }; }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) { M.splice(1, 1, tem[1]); }
  return {
    name: M[0],
    version: M[1]
  };
}


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 480 };
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

const screenSizes = {
  "1600": "lg",
  "1200": "md",
  "768": "sm",
  "400": "xs"
}



class App extends React.Component {
  constructor(props) {

    // cols={{ lg: 28, md: 24, sm: 20, xs: 16 }}
    // breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
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
    const imageModalSrc = "";
    const x = 0;
    const y = 0;
    const vertical = false;
    const browser = '';
    const gridDivs = [];
    const dragging = false;
    const componentMenuVisible = false;
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
      previewMode: false,
      currentPage,
      dragging,
      shadowComponent,
      draggedComponent,
      browser,
      vertical,
      gridDivs,
      layouts, defaultProps, currentItems,
      items, modalOpened, currentModalElement, currentComponentProps,
      currentStateJSON, allAdded, imageModalSrc, componentMenuVisible
    };
  }
  componentWillMount() {
    this.calculateGridDivs();
    if (window.location.href == 'localhost:3000') {
      that.setState({
        currentMode: "edit",
        currentPage: "",
        currentStateJSON: "[]",
        allAdded: 0,
        browser: get_browser()['name'],
        id: 0

      })
      return false;
    }
    let response;
    let currentPage = getParameterByName("page") || '';
    let that = this;
    $().SPServices({
      operation: "GetListItems",
      async: false,
      listName: "SBH Templates",
      CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='InnerHTML' /><FieldRef Name='Layouts' /><FieldRef Name='ID' /></ViewFields>",
      CAMLQuery: "<Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"
        + currentPage +
        "</Value></Eq></Where></Query>",
      completefunc: function (xData, Status) {
        if ($(xData.responseXML).SPFilterNode("z:row").length == 0) {
          that.setState({
            currentMode: "edit",
            currentPage: "",
            currentStateJSON: "[]",
            allAdded: 0,
            browser: get_browser()['name'],
            id: 0

          })
        } else {
          $(xData.responseXML).SPFilterNode("z:row").each(function () {
            let id = $(this).attr('ows_ID');
            response = $(this).attr('ows_InnerHTML');
            let layouts = $(this).attr('ows_Layouts');
            layouts = JSON.parse(layouts);
            let currentWidth = window.screen.availWidth;

            let currentLayoutKey = Object.keys(screenSizes).filter(function (e) {
              return parseInt(e) <= currentWidth
            })[0]
            // let currentLayout = layouts[screenSizes[currentLayoutKey]];
            // response = (JSON.parse(response) || []).map(function (e, i) {
            //   e["containerProps"] = currentLayout[i];
            //   return e
            // })
            // response = JSON.stringify(response);
            //console.log($(this).attr('ows_InnerHTML'))
            // console.log(typeof($(this).attr('ows_InnerHTML')))
            if (getParameterByName("type") == "edit" || window.location.href.indexOf("?") < 0) {


              let allAdded = 0;
              allAdded = JSON.parse($(this).attr('ows_InnerHTML')).sort(function (a, b) {
                return b["containerKey"] - a["containerKey"]
              })[0]['containerKey'];

              that.setState({
                currentMode: "edit",
                currentPage: currentPage || "",
                currentStateJSON: (response || "[]"),
                allAdded: allAdded,
                layouts: layouts,
                browser: get_browser()['name'],
                id: id

              })

            } else {
              that.setState({
                currentMode: "view",
                currentPage: currentPage,
                currentStateJSON: response,
                layouts: layouts,
                browser: get_browser()['name'],
                id: id
              })

            }
          })
        }


      }

    })
  }

  handleImageModal(src) {
    this.setState({
      imageModalSrc: src
    })
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
    let currentElement = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0];
    let elementSize = currentElement.defaultSize;
    currentStateJSONArr.push({
      containerKey: allAdded,
      containerProps: {
        w: elementSize.w, h: elementSize.h, x: xPosition, y: yPosition, draggableHandle: ".dragHandle", static: false
      },
      innerElement: {
        type: this.state.draggedComponent.split('-')[0],
        innerElementProps: currentElement.innerElementProps || {}
      }
    });
    currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON, allAdded
    });
  }
  savePage() {
    let _this = this;
    if (this.state.currentPage.length < 1 || this.state.currentPage == "basic-template-site" ) {
      let prompt = window.prompt("Provide a name for this page");
      if ((prompt.match(/[\!\@\#\$\%\^\&\*\(\) ]/g) || []).length > 0) {
        alert("The name cannot contain special symbols or spaces");
      } else {
        localStorage.setItem(prompt, this.state.currentStateJSON);
        $().SPServices({
          operation: "UpdateListItems",
          async: false,
          batchCmd: "New",
          listName: "SBH Templates",
          valuepairs: [["Title", prompt], ["InnerHTML", _this.state.currentStateJSON], ["Layouts", JSON.stringify(_this.state.layouts)]],
          completefunc: function (xData, Status) {
            alert("Page Saved!");
          }
        });
      }
    } else {
      $().SPServices({
        operation: "UpdateListItems",
        async: false,
        batchCmd: "Update",
        ID: this.state.id,
        listName: "SBH Templates",
        valuepairs: [["Title", _this.state.currentPage], ["InnerHTML", _this.state.currentStateJSON], ["Layouts", JSON.stringify(_this.state.layouts)]],
        completefunc: function (xData, Status) {
          alert("Page Saved");
        }
      });
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

  updateCurrentStateJSON(currentLayout, layouts) {
    let currentStateJSON = [];

    let currentStateJSONArr = JSON.parse(this.state.currentStateJSON);
    currentStateJSONArr = currentStateJSONArr.map(function (e, i) {
      e["containerProps"] = currentLayout[i];
      return e
    });
    currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON, layouts, currentLayout
    });
  }

  onLockItem(componentKey) {
    let currentStateJSONArr = JSON.parse(this.state.currentStateJSON);
    let componentIndex = 0;
    currentStateJSONArr.map(function (e, i) {
      if (e["containerKey"] == componentKey) {
        e['containerProps']['static'] = !e['containerProps']['static'];
        componentIndex = e['containerProps']['i'];
      }
    });
    let currentStateLayout = this.state.layouts;
    for(let key in currentStateLayout){
      currentStateLayout[key].map(function (e, i) {
        if(e['i'] == componentIndex){
          e['static'] = !e['static']
        }
      })
    }
    let layouts = currentStateLayout;
    let currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.onLayoutChange(this.state.currentLayout, layouts);    
   
  }

  onRemoveItem(componentKey) {
    let currentStateJSONArr = JSON.parse(this.state.currentStateJSON);
    let componentIndex = 0;
    currentStateJSONArr.map(function (e, i) {
      if (e["containerKey"] == componentKey) {
        componentIndex = i;
      }
    })
    currentStateJSONArr.splice(componentIndex , 1);
    let currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON
    })
  }

  onLayoutChange(layout, layouts) {
  
    this.updateCurrentStateJSON(layout, layouts);
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


  mouseDown(event) {
    event.preventDefault();
    let draggedComponent = this.state.browser == 'IE' ? event.target.className : event.target.parentElement.className
    this.setState({
      draggedComponent
    })

  }

  mouseMove(e) {
    if (this.state.draggedComponent.indexOf('Component') > -1) {
      let size = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0].defaultSize
      let width = `${windowW / 24 * size.w}px`;
      let height = `${windowH / 30 * size.h}px`;
      this.setState({
        shadowComponent: {
          style: {
            width: width,
            position: 'absolute',
            top: e.clientY - 60,
            left: e.clientX - 40,
            lineHeight: height,
            display: 'block',
            border: '2px dashed rgb(102,102,102)',
            background: 'rgb(217,217,217)',
            height: height,
          }
        }
      })
    }
  }

  mouseUp(e) {
    if (this.state.draggedComponent.indexOf('Component') > -1 && (e.target.className.indexOf('fullGrid') > -1 || e.target.parentElement.className.indexOf('fullGrid') > -1)) {
      let xPosition = Math.floor(e.clientX / windowW * 24);//calculation needed
      let yPosition = Math.floor(e.clientY / windowH * 8);//calculation needed    
      this.setState({
        draggedComponent: '',
        shadowComponent: {
          style: {
            width: '200px',
            position: 'absolute',
            top: e.clientY,
            left: e.clientX,
            display: 'none',
            border: '2px dashed rgb(102,102,102)',
            background: 'rgb(217,217,217)',
            height: '200px',
          }
        }
      })
      this.addNewContainer(e, xPosition, yPosition)
    }
  }
  toggleAddMenu() {
    let componentMenuVisible = !this.state.componentMenuVisible || false;
    this.setState({
      componentMenuVisible
    })
  }

  previewMode(status) {
    this.setState({
      previewMode: status
    })
  }

  flipToolbar() {
    this.setState({
      vertical: !this.state.vertical
    })
  }

  calculateGridDivs(){
    let colsToScreen = {
      "1600": "28",
      "1200": "24",
      "768": "20",
      "400": "16"
    };
    
    let currentWidth = window.screen.availWidth;
    let gridDivs = [];
    let currentRowsCount = window.screen.availHeight/30;    
    let currentColCount = parseInt(colsToScreen[Object.keys(colsToScreen).sort((a,b)=> parseInt(b)-parseInt(a)).filter(function (e) {
      return parseInt(e) <= currentWidth
    })[0]])
    console.log(currentWidth, currentColCount)
    let currentColWidth = (currentWidth/currentColCount).toFixed(2) + 'px';
    let style = {
      width: currentColWidth,
      height: '30px'
    }
    console.log(style)
    
    for(let i = 0; i < currentRowsCount; i++){
      for(let j = 0; j < currentColCount; j++){
        gridDivs.push(
          <div className="gridItemDiv" style={style}></div>
        )
      }
    }
    this.setState({
      gridDivs
    })
  }

  render() {
    let _this = this;
    let currentStateComponents = JSON.parse(this.state.currentStateJSON);
    if (this.state.currentMode == "edit") {
      return (
        <div className="page"
          onMouseUp={(e) => this.mouseUp(e)} onMouseMove={(e) => this.mouseMove(e)}>
          <div className="shadowComponent shadowComponentText" style={this.state.shadowComponent.style}>
            {this.state.draggedComponent}
          </div>
          <div className={`${this.state.vertical ? 'page-edit-banner-wrapper-vertical' : 'page-edit-banner-wrapper'} ${this.state.previewMode ? 'hidden' : ''}`}>
            <div className="page-edit-banner-main">
              <button onClick={() => this.toggleAddMenu()} className={`${this.state.vertical ? 'page-edit-banner-addButton-vertical' : 'page-edit-banner-addButton'}
                ${this.state.componentMenuVisible ? "disabled" : ""}`} >
                {this.state.componentMenuVisible ? "Hide" : "Show"} Components
            </button>
              <button onClick={() => this.flipToolbar()} className={this.state.vertical ? 'page-edit-banner-addButton-vertical' : 'page-edit-banner-addButton'}>
                Flip Toolbar
            </button>
              <button onClick={() => this.savePage()} className={this.state.vertical ? 'page-edit-banner-addButton-vertical' : 'page-edit-banner-addButton'}>Save the page</button>
              <button onClick={() => this.previewMode(true)} className={this.state.vertical ? 'page-edit-banner-addButton-vertical' : 'page-edit-banner-addButton'}>Preview Mode</button>
            </div>
            <div className={`${this.state.vertical ? 'page-edit-banner-vertical' : 'page-edit-banner'} ${this.state.componentMenuVisible ? "" : "hidden"}`} onMouseDown={(e) => this.mouseDown(e)} >
              <button className="Slider-Component"><i className="material-icons">&#xE8EB;</i><p className="component-text">Slider</p></button>

              <button className="ImageContainer-Component"><i className="material-icons">&#xE439;</i><p className="component-text">Image</p></button>
              <button className="ImageGallery-Component"><i className="material-icons">&#xE413;</i><p className="component-text">Gallery</p></button>
              <button className="VideoComponent-Component"><i className="material-icons">&#xE63A;</i><p className="component-text">Video</p></button>
              <button className="Survey-Component"><i className="material-icons">&#xE801;</i><p className="component-text">Survey</p></button>
              <button className="Calendar-Component"><i className="material-icons">&#xE916;</i><p className="component-text">Calendar</p></button>
              <button className="TextArea-Component"><i className="material-icons">&#xE23C;</i><p className="component-text">Rich Text</p></button>
              <button className="TabMenu-Component"><i className="material-icons">&#xE8D8;</i><p className="component-text">Tab Menu</p></button>
              <button className="VerticalNav-Component"><i className="material-icons">&#xE5D4;</i><p className="component-text">Vertical Navigation</p></button>
              <button className="HorizontalNav-Component"><i className="material-icons">&#xE5D3;</i><p className="component-text">Horizontal Navigation</p></button>
            </div>
          </div>

          <div className="dxcLogo"><a href="https://my.dxc.com/content/intranet.html" target="_blank"><img src="../dxc.png" /></a></div>
          <div className="gridHolder">
              {
                this.state.gridDivs.map(e => e)
              }
          </div>
          <div className={this.state.vertical ? 'fullGrid vertical' : 'fullGrid'} >
            <ResponsiveReactGridLayout className="layout"
              onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
              preventCollision={false}
              layouts={this.state.layouts}
              cols={{ lg: 28, md: 24, sm: 20, xs: 16 }}
              breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
              width={1600}
              verticalCompact={false}
              compactType={"horizontal"}
              rowHeight={30} >
              {currentStateComponents.map(function (e, i) {
                let modalKey = e["containerKey"];
                let modalType = e["innerElement"] ? (e["innerElement"]["type"] || "") : "";
                return (
                  <div
                    className={_this.state.previewMode ? 'gridLayout-cell' : 'gridLayout-cell editMode'}
                    key={e["containerKey"]}
                    data-grid={e["containerProps"]}
                  >

                    <ContentContainer
                      innerElementType={e["innerElement"]["type"]}
                      innerElementProps={e["innerElement"]["innerElementProps"]}
                      passLock={(evt) => _this.onLockItem(modalKey)}
                      json={_this.state.currentStateJSON}
                      modalKey={modalKey}
                      preview={_this.state.previewMode}
                      passOpen={(evt) => _this.openModal(evt, modalKey, modalType)}
                      passClose={(evt) => _this.onRemoveItem(modalKey)}
                      handleImageModal={(src) => _this.handleImageModal(src)}
                    />
                    <span><i title='Drag me' className={_this.state.previewMode ? 'hidden' : 'material-icons dragHandle'}>&#xE25D;</i></span>

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
         
          <ImageModal
            handleImageClick={() => _this.handleImageModal()}
            src={this.state.imageModalSrc}
          />
          <button onClick={() => this.previewMode(false)}
            className={this.state.previewMode ? 'exit-previewMode' : 'exit-previewMode hidden'}><i title="Exit preview mode" className="material-icons">&#xE5D1;</i></button>
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
            cols={{ lg: 28, md: 24, sm: 20, xs: 16 }}
            breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
            width={1600}
            rowHeight={30} >
            {currentStateComponents.map(function (e, i) {
              let modalKey = e["containerKey"];
              return (
                <div
                  className=""
                  key={e["containerKey"]}
                  data-grid={e["containerProps"]}
                >
                  <ContentContainer handleImageModal={(src) => _this.handleImageModal(src)} innerElementType={e["innerElement"]["type"]} innerElementProps={e["innerElement"]["innerElementProps"]} />
                </div>
              );

            })}
          </ResponsiveReactGridLayout>
          <ImageModal
            handleImageClick={() => _this.handleImageModal()}
            src={this.state.imageModalSrc}
          />
        </div>
      )
    }

  }
}

ReactDOM.render(
  <App />
  , document.getElementById('app'))

export default App;