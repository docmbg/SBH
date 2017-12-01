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

    componentWillReceiveProps(nextProps){
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
        let links = this.state.links;
        links.splice(index, 1);
        this.setState({
            links
        })
    }
    updateStyle(value, type) {
        this.setState({
            [type]: value.target.value
        })
        console.log(value);
    }
    updateLink(event, index, type) {
        let links = this.state.links;
        links[index][type] = event.target.value;
        this.setState({
            links
        })
    }
    addLink() {
        let links = this.state.links;
        links.push({
            title: "",
            address: "",
            target: "_blank",
        })
        this.setState({
            links
        })
    }
    render() {
        let that = this;
        if (this.props.editable) {
            return (
                <div className="modal-content-edit-navigation--side-wrapper">
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
                    <p className={`
                        ${that.state.linkColor}${(that.state.linkInvert ? "-hover" : "")} 
                        ${that.state.linkStyle} 
                        modal-content-edit-preview`}
                    >Preview</p>
                    </div>
                    <div className="w1">
                    <p className="modal-content-edit-header">Invert color on hover?</p>
                    <input type="checkbox"
                        defaultChecked={this.state.linkInvert}
                        onChange={(value) => this.updateStyle(value, "linkInvert")}
                        className="modal-content-edit-input-checkbox"
                    ></input>
                    </div>
                    <div className="w1">
                    {that.state.links.map(function (e, i) {
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
                    })}
                    </div>
                    <button
                        className="modal-content-edit-button--plus"
                        onClick={() => this.addLink()}
                    >+</button>
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
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