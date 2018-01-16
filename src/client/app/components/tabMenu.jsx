import React from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab } from "react-materialize";
import TextEditor from "./textEditor.jsx";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import ColorPicker from './colorPicker.jsx';

class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: this.props.componentProperties.tabs || [],
      currentActiveTab: this.props.componentProperties.currentActiveTab || 0,
      tabStyling: this.props.componentProperties.tabStyling || "",
      currentEditedColor: ""
    };
  }

  onEditorStateChange(editorState, index) {
    let tabs = [].concat(this.state.tabs);
    tabs[index]["editorState"] = editorState;
    tabs[index]["editorStateRaw"] = convertToRaw(editorState.getCurrentContent())
    this.setState({
      tabs
    })
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let tabs = nextProps.componentProperties.tabs || [];
    let tabStyling = nextProps.componentProperties.tabStyling || "";
    tabs = tabs.map(function (e) {
      e["editorState"] = e.editorStateRaw ? EditorState.createWithContent(convertFromRaw(e.editorStateRaw)) : EditorState.createEmpty()
      return e
    })
    this.setState({
      tabs, tabStyling
    });
  };

  saveEdit() {
    let tabs = this.state.tabs;
    let tabStyling = this.state.tabStyling;
    this.props.passProps({
      tabs, tabStyling
    });
  };

  updateTab(event, index, type) {
    let tabs = this.state.tabs;
    tabs[index][type] = event.target.value;
    this.setState({
      tabs
    });
  };

  addTab() {
    let tabs = [].concat(this.state.tabs);
    tabs.push({
      title: ""
    });
    this.setState({
      tabs
    });
  };

  handleStyleChange(value, occ) {
    let tabStyling = this.state.tabStyling || "";
    tabStyling[occ] = value;
    this.setState({
      tabStyling,
      currentEditedColor: ''
    })
  };

  toggleTabContents(i) {
    let tabs = this.state.tabs;
    if (tabs[i]["active"]) {
      tabs[i]["active"] = !tabs[i]["active"];
    } else {
      tabs[i]["active"] = true;
    }
    this.setState({
      tabs
    })
  };

  handleMove(dir, index) {
    let tabs = [].concat(this.state.tabs);
    if (index + dir >= tabs.length || index + dir < 0) {
      return false
    }
    let item1 = tabs[index];
    let item2 = tabs[index + dir];
    tabs[index] = item2;
    tabs[index + dir] = item1;
    this.setState({
      tabs
    });
  };

  setActiveTab(i) {
    console.log('asd')
    let currentActiveTab = i;
    this.setState({
      currentActiveTab
    });
  };

  removeTab(index) {
    let tabs = [].concat(this.state.tabs);
    tabs.splice(index, 1);
    this.setState({
      tabs
    });
  };
  currentEditedColor(currentEditedColor) {
    this.setState({
      currentEditedColor
    })
  }
  passClose() {
    let confirmResult = confirm("Would you like to save your changes before exiting?")
    if (!confirmResult) {
      this.props.passClose()
      return false
    }
    this.saveEdit()
  };

  render() {
    let that = this;
    let tabs = this.state.tabs;

    if (this.props.editable) {
      return (
        <div className="modal-content-edit">
          <div>
            <button
              onClick={() => that.saveEdit()}
              className="dxc-button"
            >
              Save
            </button>
          </div>
          <button className='dxc-close' onClick={() => this.passClose()}>
            <i className="material-icons">&#xE5CD;</i>
          </button>
          <div className="modal-content-edit-count">{`Number of tabs: ${this.state.tabs.length}`}</div>
          <div className="modal-content-edit-general">
            <select
              className="modal-content-edit-select"
              value={this.state.tabStyling.tabDirection}
              onChange={(e) => this.handleStyleChange(e.target.value, "tabDirection")}
            >
              <option value={`horizontal`}>Horizontal</option>
              <option value={`vertical`}>Vertical</option>
            </select>
            <div className="w2">
              <div>
                <p>Active Tab Color</p>
                {
                  this.state.currentEditedColor != 'tabActiveColor' ?
                    (<div>
                      <button className="colorPickerButton" onClick={() => this.currentEditedColor('tabActiveColor')}> Change </button>
                      <div className="colorDisplayBox" style={{ backgroundColor: (this.state.tabStyling.tabActiveColor || "#FFF") }}></div>
                    </div>) :
                    <ColorPicker chosenColor={that.state.tabStyling.tabActiveColor || "#FFF"} passProps={(e) => this.handleStyleChange(e, "tabActiveColor")} />
                }
              </div>
              <div>
                <p>Active Tab Text Color</p>
                {
                  this.state.currentEditedColor != 'tabActiveTextColor' ?
                    (<div>
                      <button className="colorPickerButton" onClick={() => this.currentEditedColor('tabActiveTextColor')}> Change </button>
                      <div className="colorDisplayBox" style={{ backgroundColor: (this.state.tabStyling.tabActiveTextColor || "#FFF") }}></div>
                    </div>) :
                    <ColorPicker chosenColor={this.state.tabStyling.tabActiveTextColor || "#FFF"} passProps={(e) => this.handleStyleChange(e, "tabActiveTextColor")} />
                }
              </div>
            </div>
            <div className="w2">
              <div>
                <p>Inactive Tab Color</p>
                {
                  this.state.currentEditedColor != 'tabInactiveColor' ?
                    (<div>
                      <button className="colorPickerButton" onClick={() => this.currentEditedColor('tabInactiveColor')}> Change </button>
                      <div className="colorDisplayBox" style={{ backgroundColor: (this.state.tabStyling.tabInactiveColor || "#FFF") }}></div>
                    </div>) :
                    <ColorPicker chosenColor={this.state.tabStyling.tabInactiveColor || "#FFF"} passProps={(e) => this.handleStyleChange(e, "tabInactiveColor")} />
                }
              </div>
              <div>
                <p>Inactive Tab Text Color</p>
                {
                  this.state.currentEditedColor != 'tabInactiveTextColor' ?
                    (<div>
                      <button className="colorPickerButton" onClick={() => this.currentEditedColor('tabInactiveTextColor')}> Change </button>
                      <div className="colorDisplayBox" style={{ backgroundColor: (this.state.tabStyling.tabInactiveTextColor || "#FFF") }}></div>
                    </div>) :
                    <ColorPicker chosenColor={this.state.tabStyling.tabInactiveTextColor || "#FFF"} passProps={(e) => this.handleStyleChange(e, "tabInactiveTextColor")} />
                }
              </div>
            </div>
            <div className="w1">
            <div>
                <p>Tab Border Color</p>
                {
                  this.state.currentEditedColor != 'tabBorder' ?
                    (<div>
                      <button className="colorPickerButton" onClick={() => this.currentEditedColor('tabBorder')}> Change </button>
                      <div className="colorDisplayBox" style={{ backgroundColor: (this.state.tabStyling.tabBorder || "#FFF") }}></div>
                    </div>) :
                    <ColorPicker chosenColor={this.state.tabStyling.tabBorder || "#FFF"} passProps={(e) => this.handleStyleChange(e, "tabBorder")} />
                }
              </div>
            </div>
          </div>
          <ul className="modal-content-edit-tabs-container">
            {this.state.tabs.map(function (e, i) {
              return (
                <li className="modal-content-edit-tabs" key={`tabs-${i}`}>
                  <button
                    onClick={() => that.toggleTabContents(i)}
                    className="modal-content-edit-button--toggle"
                  >
                    {e["active"] ? <i className="material-icons">&#xE22B;</i> : <i className="material-icons">&#xE254;</i>}
                  </button>
                  <input className="modal-content-edit-tabs-name"
                    type="text"
                    value={that.state.tabs[i]["title"]}
                    onChange={event => that.updateTab(event, i, "title")}
                  />
                  <button onClick={() => that.handleMove(-1, i)}>
                    <i className="material-icons">&#xE5D8;</i>
                  </button>
                  <button onClick={() => that.handleMove(1, i)}>
                    <i className="material-icons">&#xE5DB;</i>
                  </button>
                  <button onClick={() => that.removeTab(i)}
                  >
                    <i className="material-icons">&#xE5CD;</i>
                  </button>

                  <div className={`modal-content-edit-tabs-editor ${e["active"] ? "transition-down" : "transition-up"}`}>
                    <p className="modal-content-edit-header">Tab contents</p>
                    <div className="modal-content-edit-textArea">
                      <Editor
                        editorState={e["editorState"] ? e["editorState"] : EditorState.createEmpty()}
                        onEditorStateChange={(e) => that.onEditorStateChange(e, i)}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <button
            className="modal-content-edit-button--plus"
            onClick={() => this.addTab()}
          >
            +
          </button>
        </div>
      );
    } else {
      // console.log(this.state, "\n", this.props.componentProperties);
      let tabWidth = this.props.componentProperties.tabs.length || 1;
      tabWidth = (100 / tabWidth).toFixed(3) + "%";
      let activeStyle = this.state.tabStyling.tabBorder ? {borderColor: this.state.tabStyling.tabBorder} : {};
      let inactiveStyle = this.state.tabStyling.tabBorder ? {borderColor: this.state.tabStyling.tabBorder} : {};
      if(this.state.tabStyling.tabDirection == "horizontal"){
        activeStyle.width = tabWidth;
        inactiveStyle.width = tabWidth
      } else {
        activeStyle.height = tabWidth;
        inactiveStyle.height = tabWidth
      }
      activeStyle.color =  this.state.tabStyling.tabActiveTextColor;
      activeStyle.backgroundColor =  this.state.tabStyling.tabActiveColor;
      inactiveStyle.color =  this.state.tabStyling.tabInactiveTextColor;
      inactiveStyle.backgroundColor =  this.state.tabStyling.tabInactiveColor;
      let currentStyle;
      return (
        <div className={`page-content-tabs ${this.state.tabStyling.tabDirection}`}>
          <div className="page-content-tabs-indicators">
            {this.props.componentProperties.tabs.map(function (e, i) {
              currentStyle = (i != that.state.currentActiveTab ? inactiveStyle : activeStyle);
              console.log(i)
              return (
                <div
                  className={`page-content-tabs-indicators-indicator ${i != that.state.currentActiveTab ? "" : "active"}`}
                  style={currentStyle}
                  key={`tab-${i}`}
                  onClick={() => that.setActiveTab(i)}
                >
                  {e["title"]}
                </div>
              );
            })}
          </div>
          <div className="page-content-tabs-body">
            {this.props.componentProperties.tabs.map(function (e, i) {
              if (i != that.state.currentActiveTab) {
                return null;
              }
              return (
                <div>
                  <Editor
                    editorState={e["editorState"]}
                    toolbarStyle={{ display: "none", visibility: "hidden" }}
                    editorStyle={{ width: "100%", height: "100%" }}
                    readOnly={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

}

export default TabMenu;
