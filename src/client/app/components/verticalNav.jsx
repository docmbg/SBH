import React from 'react';
import ReactDOM from 'react-dom';

class VerticalNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: this.props.componentProperties.links || [],
            linkColor: this.props.componentProperties.linkColor || "",
            linkStyle: this.props.componentProperties.linkStyle || "",
            linkInvert: this.props.componentProperties.linkInvert || false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            links: nextProps.componentProperties.links || [],
            linkColor: nextProps.componentProperties.linkColor || "",
            linkStyle: nextProps.componentProperties.linkStyle || "",
            linkInvert: nextProps.componentProperties.linkInvert || false,
        })
    }

    saveEdit() {
        let links = this.state.links;
        let linkColor = this.state.linkColor;
        let linkStyle = this.state.linkStyle;
        let linkInvert = this.state.linkInvert;
        this.props.passProps({
            links, linkColor, linkStyle, linkInvert
        })
    }

    removeLink(index) {
        let links = [].concat(this.state.links);
        links.splice(index, 1);
        this.setState({
            links
        })
    }

    handleMove(dir, index) {
        let links = [].concat(this.state.links);
        if (index + dir >= links.length || index + dir < 0) {
            return false
        }
        let item1 = links[index];
        let item2 = links[index + dir];
        links[index] = item2;
        links[index + dir] = item1;
        this.setState({
            links
        })
    }

    handleVisibilityChange(index) {

        let links = this.state.links;
        console.log("visibility Change", index, links[index]["visibile"]);
        links[index]["visible"] = !links[index]["visible"];
        this.setState({
            links
        });
    }

    updateStyle(value, type) {
        console.log(value.target);
        if (type == "linkInvert") {
            this.setState({
                linkInvert: !this.state.linkInvert
            })
        } else {
            this.setState({
                [type]: value.target.value
            })
        }

        console.log(this.state.linkInvert)
    }

    updateLink(event, index, type) {
        let links = [].concat(this.state.links);
        links[index][type] = event.target.value;
        this.setState({
            links
        })
    }

    addLink() {
        let links = [].concat(this.state.links);
        links.push({
            title: "",
            address: "",
            target: "_blank",
            visible: false
        })
        this.setState({
            links
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

        if (this.props.editable) {
            return (
                <div className="modal-content-edit-navigation--side-wrapper">
                    <button className='dxc-close' onClick={() => this.passClose()}>
                        <i className="material-icons">&#xE5CD;</i>
                    </button>
                    <div className="modal-content-edit-button-wrapper">
                        <button
                            onClick={() => that.saveEdit()}
                            className="dxc-button"
                        >Save</button>
                    </div>
                    <div>Change the look</div>
                    <div className="modal-content-edit-wrapper-general">

                        <div className="w2">
                            <span className="modal-content-edit-header">Link Style</span>
                            <select
                                value={that.state.linkStyle}
                                onChange={(value) => that.updateStyle(value, "linkStyle")}
                                className="modal-content-edit-select"
                            >
                                <option value="">Default</option>
                                <option className="arrow-dxc-yellow point--arrow-circle" value="arrow-dxc-yellow point--arrow-circle">
                                    arrow-dxc-yellow
                                        </option>
                                <option className="arrow-dxc-yellow-inverse point--arrow-circle" value="arrow-dxc-yellow-inverse point--arrow-circle">
                                    arrow-dxc-yellow-inverse
                                        </option>
                                <option className="arrow-dxc-white point--arrow-circle" value="arrow-dxc-white point--arrow-circle">
                                    arrow-dxc-white
                                        </option>
                                <option className="arrow-dxc-white-inverse point--arrow-circle" value="arrow-dxc-white-inverse point--arrow-circle">
                                    arrow-dxc-white-inverse
                                        </option>
                            </select>
                        </div>
                        <div className="w2">
                            <span className="modal-content-edit-header">Links Color</span>
                            <select
                                value={that.state.linkColor}
                                onChange={(value) => that.updateStyle(value, "linkColor")}
                                className="modal-content-edit-select"
                            >
                                <option value="dxc-white">Default</option>
                                <option className="dxc-white" value="dxc-white">
                                    dxc-white
                                        </option>
                                <option className="dxc-yellow" value="dxc-yellow">
                                    dxc-yellow
                                        </option>
                                <option className="dxc-black-white" value="dxc-black-white">
                                    dxc-black-white
                                        </option>
                                <option className="dxc-black-yellow" value="dxc-black-yellow">
                                    dxc-black-yellow
                                        </option>
                            </select>
                        </div>
                        <div className="w1">
                            <p className="modal-content-edit-header">Invert color on hover?</p>
                            <label>
                                <input type="checkbox" 
                                name="" 
                                defaultChecked={this.state.linkInvert}
                                onChange={(value) => this.updateStyle(value, "linkInvert")}
                                className="modal-content-edit-input-checkbox" />
                                <i className="helper"></i>
                            </label>
                        </div>
                    </div>
                    <div className="w1 modal-content-edit-preview">
                        <p className={`
                        ${that.state.linkColor}${(that.state.linkInvert ? "-hover" : "")} 
                        ${that.state.linkStyle}`}
                        >Preview</p>
                    </div>
                    <div className="modal-content-edit-links-multiple">
                        <div className="w1">
                            {
                                this.state.links.map(function (e, i) {
                                    return (
                                        <div className='tabEdit'>
                                            <div>
                                                {e['visible'] == false ? <i onClick={() => that.handleVisibilityChange(i)}
                                                    className="material-icons mini left">&#xE254;</i> : <i onClick={() => that.handleVisibilityChange(i)} className="material-icons mini left">&#xE22B;</i>}
                                                <span className='tabTitle'>{e['title'] || 'Link Name'}</span>
                                                <i onClick={(e) => that.handleMove(1, i)} className="material-icons mini">&#xE5DB;</i>
                                                <i onClick={(e) => that.handleMove(-1, i)} className="material-icons mini">&#xE5D8;</i>
                                                <i onClick={(e) => that.removeLink(i)} className="material-icons mini">&#xE5CD;</i>

                                            </div>
                                            <div className="divider"></div>
                                            <div className={` ${e['visible'] == true ? 'show' : 'hide'}`}>
                                                <div className="tabEditBox">
                                                    <p>Title<input value={e.title} onChange={(event) => that.updateLink(event, i, 'title')} /></p>
                                                    <p>Address<input value={e.address} onChange={(event) => that.updateLink(event, i, 'address')} /></p>
                                                    <p>Target<input value={e.target} onChange={(event) => that.updateLink(event, i, 'target')} /></p>
                                                </div>
                                            </div>
                                        </div>)
                                })
                            }
                            {/* {
                            
                            that.state.links.map(function (e, i) {
                            return (
                                <div className="modal-content-edit-navigation--side-container">
                                    <div className="w2">
                                        <button
                                            onClick={(i) => that.removeLink(i)}
                                            className="modal-content-edit-button--remove"
                                        >X</button>
                                        <p className="modal-content-edit-header">Link Title</p>
                                        <input
                                            type="text"
                                            value={e["title"]}
                                            onChange={(event) => that.updateLink(event, i, "title")}
                                            className="modal-content-edit-input-text"
                                        ></input>
                                    </div>
                                    <div className="w2">
                                        <p className="modal-content-edit-header">Link Address</p>
                                        <input
                                            type="text"
                                            value={e["address"]}
                                            onChange={(value) => that.updateLink(value, i, "address")}
                                            className="modal-content-edit-input-text"
                                        ></input>
                                        <p className="modal-content-edit-header">Link Target</p>
                                        <input
                                            type="text"
                                            value={e["target"]}
                                            onChange={(value) => that.updateLink(value, i, "target")}
                                            className="modal-content-edit-input-text"
                                        ></input>
                                    </div>
                                </div>
                            )
                        })} */}
                        </div>
                        <button
                            className="modal-content-edit-button--plus"
                            onClick={() => this.addLink()}
                        >+</button>
                    </div>

                </div>
            )
        } else {
            return (
                <ul className='content-navigation--side-container'>
                    {
                        that.state.links.map(function (e, i) {
                            return (
                                <li
                                    className={`content-navigation--side-item 
                                    ${that.state.linkStyle} 
                                    ${that.state.linkColor}${(that.state.linkInvert ? "-hover" : "")}`}
                                    key={`side-nav-item-${i}`}>
                                    <a
                                        className={`content-navigation--side-link`}
                                        target={e["target"] || "_blank"}
                                        href={e["address"]}
                                    >
                                        <div>
                                            {e["title"]}
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

}

export default VerticalNav;