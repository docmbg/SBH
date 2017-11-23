import React from "react";
import ReactDOM from "react-dom";
import { Tabs, Tab } from "react-materialize";
import ContentContainer from "./contentContainer.jsx";

class TabMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: this.props.tabs || [],
      currentActiveTab: 0
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("NextProps: ", nextProps);
    this.setState({
      tabs: nextProps.tabs
    });
  }
  // componentWillMount() {
  //     let _this = this;
  //     $().SPServices({
  //         operation: "GetListItems",
  //         async: false,
  //         listName: "News",
  //         CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Content' /></ViewFields>",
  //         completefunc: function (xData, Status) {
  //             let tabs = [];
  //             $(xData.responseXML).SPFilterNode("z:row").each(function () {
  //                 tabs.push({
  //                     title: $(this).attr('ows_Title'),
  //                     content:  $(this).attr('ows_Content')
  //                 })

  //             });
  //             _this.setState({
  //                 tabs
  //             })
  //         }
  //     });

  // }
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
          <div className="modal-content-edit-count">{`Number of tabs: ${this
            .state.tabs.length}`}</div>

          {this.state.tabs.map(function(e, i) {
            return (
              <div className="modal-content-edit-tabs" key={`tabs-${i}`}>
                <button
                  onClick={i => that.removeTab(i)}
                  className="modal-content-edit-button--remove"
                >
                  X
                </button>
                <p className="modal-content-edit-header">Tab Name</p>
                <input
                  type="text"
                  value={that.state.tabs[i]["title"]}
                  onChange={event => that.updateTab(event, i, "title")}
                  className="modal-content-edit-input-text"
                />
              </div>
            );
          })}
          <button
            className="modal-content-edit-button--plus"
            onClick={() => this.addTab()}
          >
            +
          </button>
          <div>
            <button
              onClick={() => that.saveEdit()}
              className="modal-content-edit--save"
            >
              Save
            </button>
          </div>
        </div>
      );
    } else {
      console.log(this.state.tabs, this.props.componentProperties.tabs);
      let tabWidth = this.props.componentProperties.tabs.length || 1;
      tabWidth = Math.floor(100 / tabWidth).toString() + "%";
      return (
        <div className="page-content-tabs">
          <div className="page-content-tabs-indicators">
            {this.props.componentProperties.tabs.map(function(e, i) {
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
            {this.props.componentProperties.tabs.map(function(e, i) {
              if (i != that.state.currentActiveTab) {
                return null;
              }
              return (
                <ContentContainer innerElementProps={{editable : true}} innerElementType={`TextArea`}/>
              );
            })}
          </div>
        </div>
      );
    }
  }
}

export default TabMenu;
