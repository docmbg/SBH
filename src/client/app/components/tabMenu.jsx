import React from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab } from "react-materialize";
import TextEditor from "./textEditor.jsx";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: this.props.componentProperties.tabs || [],
      currentActiveTab: this.props.componentProperties.currentActiveTab || 0,
      tabStyle: this.props.componentProperties.tabStyle || ""
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
    let tabStyle = nextProps.componentProperties.tabStyle || "";
    tabs = tabs.map(function (e) {
      e["editorState"] = e.editorStateRaw ? EditorState.createWithContent(convertFromRaw(e.editorStateRaw)) : EditorState.createEmpty()
      return e
    })
    this.setState({
      tabs, tabStyle
    });
  };

  saveEdit() {
    let tabs = this.state.tabs;
    let tabStyle = this.state.tabStyle;
    this.props.passProps({
      tabs, tabStyle
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

  handleStyleChange(e) {
    let tabStyle = this.state.tabStyle || "";
    tabStyle = e.target.value;
    this.setState({
      tabStyle
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

  passClose() {
    let confirmResult = confirm("Would you like to save your changes before exiting?")
    if (!confirmResult) {
      this.props.passClose()
      return false
    }
    this.saveEdit()
  };

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
              value={this.state.tabStyle}
              onChange={(e) => this.handleStyleChange(e)}
            >
              <option value={`horizontal`}>Horizontal</option>
              <option value={`vertical`}>Vertical</option>
            </select>
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
      console.log(this.state, "\n", this.props.componentProperties);
      let tabWidth = this.props.componentProperties.tabs.length || 1;
      tabWidth = Math.floor(100 / tabWidth).toString() + "%";
      let styleObj = this.state.tabStyle == "horizontal" ? { width: tabWidth } : { height: tabWidth };
      return (
        <div className={`page-content-tabs ${this.state.tabStyle}`}>
          <div className="page-content-tabs-indicators">
            {this.props.componentProperties.tabs.map(function (e, i) {
              return (
                <div
                  className={`page-content-tabs-indicators-indicator ${i != that.state.currentActiveTab ? "" : "active"}`}
                  style={styleObj}
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
