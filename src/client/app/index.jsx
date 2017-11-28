import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import Modal from './components/modal.jsx';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ContentContainer from './components/contentContainer.jsx';


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
const draggableComponents = [
  {
    type: 'Slider-Component',
    defaultSize: {
      w: 7,
      h: 12
    },
    innerElementProps: {
      slides: [
        {
          src: "https://7windsva.com/wp-content/uploads/2012/12/one.png",
          title: "First Slide",
          link: "1"
        },
        {
          src: "https://7windsva.com/wp-content/uploads/2012/12/two.png",
          title: "Second Slide",
          link: "2"
        }
      ],
      sliderStyles: {
        sliderBackgroundStyle: "slider-shape-square",
        sliderBackgroundColor: "dxc-background-gray--dark",
        sliderButtonColor: "dxc-background-yellow",
        sliderTextColor: "dxc-font-white",
        sliderButtonTextColor: "dxc-font-black",
        sliderBackgroundOpacity: 60,
        sliderIndicatorsStyle: "content-slider-indicators",
        sliderIndicatorsShape: "content-slider-indicators-shape--square_number",
        readMoreText: "Read more"
      }
    }
  },
  {
    type: 'ImageContainer-Component',
    defaultSize: {
      w: 2,
      h: 9
    },
    innerElementProps: {

    }
  },
  {
    type: 'TextArea-Component',
    defaultSize: {
      w: 7,
      h: 12
    },
    defaultProps: {

    }
  },
  {
    type: 'Survey-Component',
    defaultSize: {
      w: 2,
      h: 9
    },
    innerElementProps: {
      iframe: '',
      selectorValue: '',
      surveyFilled: '',
    }
  },
  {
    type: 'Calendar-Component',
    defaultSize: {
      w: 2,
      h: 9
    },
    innerElementProps: {
      selectorValue: '',
      categoryFilter: 'No Filter',
      locationFilter: 'No Filter',
      events: [],
      filteredEvents: [],
      range: '',
    }
  },
  {
    type: 'TabMenu-Component',
    defaultSize: {
      w: 2,
      h: 9
    },
    innerElementProps: {
      tabs: [{
        "title" : "Tab 1"
      },{
        "title" : "Tab 2"
      },{
        "title" : "Tab 3"
      }],
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
    const browser = '';
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
      browser,
      layouts, defaultProps, currentItems,
      items, modalOpened, currentModalElement, currentComponentProps,
      currentStateJSON, allAdded
    };
  }
  componentWillMount() {
    if(window.location.href == 'localhost:3000'){
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
      CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='InnerHTML' /><FieldRef Name='ID' /></ViewFields>",
      CAMLQuery: "<Query><Where><Eq><FieldRef Name='Title' /><Value Type='Text'>"
        + currentPage +
        "</Value></Eq></Where></Query>",
      completefunc: function (xData, Status) {
        if($(xData.responseXML).SPFilterNode("z:row").length == 0){
          that.setState({
            currentMode: "edit",
            currentPage: "",
            currentStateJSON: "[]",
            allAdded: 0,
            browser: get_browser()['name'],
            id: 0

          })
        }else {
          $(xData.responseXML).SPFilterNode("z:row").each(function () {
            let id = $(this).attr('ows_ID');
            response = $(this).attr('ows_InnerHTML');
            //console.log($(this).attr('ows_InnerHTML'))
           // console.log(typeof($(this).attr('ows_InnerHTML')))
            if (getParameterByName("type") == "edit" || window.location.href.indexOf("?") < 0) {
              
              
              let allAdded = 0;

              allAdded = JSON.parse($(this).attr('ows_InnerHTML')).sort(function (a, b) {
                return b["containerKey"] - a["containerKey"]
              })[0]['containerKey']

              that.setState({
                currentMode: "edit",
                currentPage: currentPage || "",
                currentStateJSON: (response || "[]"),
                allAdded: allAdded,
                browser: get_browser()['name'],
                id: id

              })
              
            } else {
              that.setState({
                currentMode: "view",
                currentPage: currentPage,
                currentStateJSON: response,
                browser: get_browser()['name'],
                id: id
              })
              
            }
          })
        }


      }

    })
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
    let currentElement = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0];
    let elementSize = currentElement.defaultSize;
    currentStateJSONArr.push({
      containerKey: allAdded,
      containerProps: {
        w: elementSize.w, h: elementSize.h, x: xPosition, y: yPosition, minW: 1, minH: 1
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
    if (this.state.currentPage.length < 1) {
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
          valuepairs: [["Title", prompt], ["InnerHTML", this.state.currentStateJSON]],
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
        valuepairs: [["Title", this.state.currentPage], ["InnerHTML", this.state.currentStateJSON]],
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


  mouseDown(event) {
    console.log(event.screenX, event.screenY, "windowSize: ", windowH, ", ", windowW)
    event.preventDefault();
    let draggedComponent = this.state.browser == 'IE' ? event.target.className : event.target.parentElement.className
    this.setState({
      draggedComponent
    })

  }

  mouseMove(e) {
    // console.log(this.state.draggedComponent)
    if (this.state.draggedComponent.indexOf('Component') > -1) {
      let size = draggableComponents.filter(e => e.type == this.state.draggedComponent)[0].defaultSize
      let width = `${windowW / 12 * size.w}px`;
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
            border: '2px dotted grey',
            height: height,
          }
        }
      })
    }
  }

  mouseUp(e) {
    if (this.state.draggedComponent.indexOf('Component') > -1 && (e.target.className == 'fullGrid' || e.target.parentElement.className == 'fullGrid')) {
      let xPosition = Math.floor(e.clientX / windowW * 12);//calculation needed
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
            border: '2px dotted grey',
            height: '200px',
          }
        }
      })
      this.addNewContainer(e, xPosition, yPosition)
    }
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
          <div className="page-edit-banner" onMouseDown={(e) => this.mouseDown(e)} >
            <button onClick={() => console.log(this.state.currentStateJSON)} className="page-edit-banner-addButton" >Add a new container</button>
            <button onClick={() => this.savePage()} className="page-edit-banner-addButton">Save the page</button>
            <button className="Slider-Component"><i className="material-icons">&#xE8EB;</i></button>
            <button className="TextArea-Component"><i className="material-icons">&#xE23C;</i></button>
            <button className="ImageContainer-Component"><i className="material-icons">&#xE439;</i></button>
            <button className="Survey-Component"><i className="material-icons">&#xE801;</i></button>
            <button className="Calendar-Component"><i className="material-icons">&#xE916;</i></button>
            <button className="TabMenu-Component"><i className="material-icons">&#xE8D8;</i></button>
          </div>
          <div className="fullGrid" >
            <ResponsiveReactGridLayout className="layout"
              onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
              preventCollision={false}
              layouts={this.state.layouts}
              cols={{ lg: 12, md: 12, sm: 12, xs: 12 }}
              breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
              width={1600}
              verticalCompact={false}
              rowHeight={30} >
              {currentStateComponents.map(function (e, i) {
                let modalKey = e["containerKey"];
                let modalType = e["innerElement"] ? (e["innerElement"]["type"] || "") : "";
                return (
                  <div
                    className="gridLayout-cell"
                    key={e["containerKey"]}
                    data-grid={e["containerProps"]}
                  >
                    <ContentContainer
                      innerElementType={e["innerElement"]["type"]}
                      innerElementProps={e["innerElement"]["innerElementProps"]}
                      passOpen={(evt) => _this.openModal(evt, modalKey, modalType)}
                      passClose={(evt) => _this.onRemoveItem(modalKey)}
                    />



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
            rowHeight={30} >
            {currentStateComponents.map(function (e, i) {
              let modalKey = e["containerKey"];
              return (
                <div
                  className=""
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