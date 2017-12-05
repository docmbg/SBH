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
      currentActiveTab: this.props.componentProperties.currentActiveTab || 0
    };
  }
  onEditorStateChange(editorState, index) {
    let tabs = this.state.tabs;
    tabs[index]["editorState"] = editorState;
    tabs[index]["editorStateRaw"] = convertToRaw(editorState.getCurrentContent())
    this.setState({
      tabs,
    })
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    let tabs = nextProps.componentProperties.tabs || [];
    tabs = tabs.map(function (e) {
      e["editorState"] = e.editorStateRaw ? EditorState.createWithContent(convertFromRaw(e.editorStateRaw)) : EditorState.createEmpty()
      return e
    })
    this.setState({
      tabs
    });
  }
  saveEdit() {
    let tabs = this.state.tabs;
    this.props.passProps({
      tabs
    });
  }
  updateTab(event, index, type) {
    let tabs = this.state.tabs;
    tabs[index][type] = event.target.value;
    this.setState({
      tabs
    });
  }
  addTab() {
    let tabs = this.state.tabs;
    tabs.push({
      title: ""
    });
    this.setState({
      tabs
    });
  }
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
  }
  handleMove(dir, index){
    let tabs = this.state.tabs;
    if(index+dir >= tabs.length || index+dir < 0){
      return false
    }
    let item1 = tabs[index];
    let item2 = tabs[index+dir];
    tabs[index] = item2;
    tabs[index+dir] = item1;
    this.setState({
      tabs
    })
  }
  setActiveTab(i) {
    let currentActiveTab = i;
    this.setState({
      currentActiveTab
    });
  }
  removeTab(index) {
    let tabs = this.state.tabs;
    tabs.splice(index, 1);
    this.setState({
      tabs
    });
  }
  render() {
    let that = this;
    let tabs = this.state.tabs;
    if (this.props.editable) {
      return (
        <div className="modal-content-edit">
          <div className="modal-content-edit-count">{`Number of tabs: ${this.state.tabs.length}`}</div>
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
                  <button onClick={() => that.handleMove(-1,i)}>
                  <i className="material-icons">&#xE5D8;</i>
                  </button>
                  <button onClick={() => that.handleMove(1,i)}>
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
          <div>
            <button
              onClick={() => that.saveEdit()}
              className="dxc-button"
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
      let tabWidth = this.props.componentProperties.tabs.length || 1;
      tabWidth = Math.floor(100 / tabWidth).toString() + "%";
      return (
        <div className="page-content-tabs">
          <div className="page-content-tabs-indicators">
            {this.props.componentProperties.tabs.map(function (e, i) {
              return (
                <div
                  className={`page-content-tabs-indicators-indicator ${i != that.state.currentActiveTab ? "" : "active"}`}
                  style={{ width: tabWidth }}
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
                    editorStyle={{ width: "100%", height: "90%" }}
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
