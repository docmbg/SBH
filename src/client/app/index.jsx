import React from 'react';
import ReactDOM from 'react-dom';
import ReactGridLayout from 'react-grid-layout';
import Modal from './components/modal.jsx';
import { WidthProvider, Responsive } from 'react-grid-layout';
import ContentContainer from './components/contentContainer.jsx';
import TextEditor from './components/textEditor.jsx';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
const breakpoints = { lg: 1600, md: 1200, sm: 768, xs: 480 };

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
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
    const childNodes = [];
    const currentComponentProps = {}
    const currentPage = "";
    const currentMode = "";
    const defaultProps = {
      className: "layout",
      items: 20,
      rowHeight: 30
    };
    const modalOpened = false;
    this.state = {
      currentPage,
      layouts, defaultProps, currentItems,
      items, modalOpened, currentModalElement, currentComponentProps,
      currentStateJSON, childNodes
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

  openModal(e, i) {
    if (i == this.state.currentActiveModal) {
      this.setState({
        modalOpened: true,
        currentActiveModal: i
      });
    } else {
      this.setState({
        modalOpened: true,
        currentActiveModal: i,
        currentComponentProps: {}
      });
    }

  }

  addNewContainer() {
    let childNodes = this.state.childNodes;
    let currentStateJSON = JSON.parse(this.state.currentStateJSON);
    let currentItemKey = currentStateJSON.length + 1;
    let currentStateJSONArr = currentStateJSON;
    currentStateJSONArr.push({
      containerKey: currentItemKey,
      containerProps: {
        w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3
      },
      innerElement: {
        type: "",
        innerElementProps: {}
      }
    });
    childNodes.push({
      key: currentStateJSONArr.length,
      type: ""
    })
    currentStateJSON = JSON.stringify(currentStateJSONArr);
    this.setState({
      currentStateJSON, childNodes
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
  render() {
    let _this = this;
    let currentStateComponents = JSON.parse(this.state.currentStateJSON);
    if (this.state.currentMode == "edit") {
      return (
        <div className="page">
          <div className="page-edit-banner">
            <button onClick={() => this.addNewContainer()} className="page-edit-banner-addButton">Add a new container</button>
            <button onClick={() => this.savePage()} className="page-edit-banner-addButton">Save the page</button>
          </div>
          <ResponsiveReactGridLayout className="layout"
            onLayoutChange={(layout, layouts) => this.onLayoutChange(layout, layouts)}
            preventCollision={false}
            layouts={this.state.layouts}
            cols={{ lg: 60, md: 50, sm: 30, xs: 20 }}
            breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
            width={1600}
            rowHeight={15} >
            {currentStateComponents.map(function (e, i) {
              let modalKey = e["containerKey"];
              return (
                <div
                  className="gridLayout-cell"
                  key={(i + 1).toString()}
                  data-grid={e["containerProps"]}
                >
                  <ContentContainer innerElementType={e["innerElement"]["type"]} innerElementProps={e["innerElement"]["innerElementProps"]} />
                  <button onClick={(e) => _this.openModal(e, modalKey)}>+</button>
                </div>
              );

            })}
          </ResponsiveReactGridLayout>
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
            cols={{ lg: 60, md: 50, sm: 30, xs: 20 }}
            breakpoints={{ lg: 1600, md: 1200, sm: 768, xs: 480 }}
            width={1600}
            rowHeight={10} >
            {currentStateComponents.map(function (e, i) {
              let modalKey = e["containerKey"];
              return (
                <div
                  className="gridLayout-cell"
                  key={(i + 1).toString()}
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