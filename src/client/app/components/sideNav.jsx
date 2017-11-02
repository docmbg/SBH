import React from 'react';
import ReactDOM from 'react-dom';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: this.props.componentProperties.links || []
        }
    }
    // "title": current.attr("ows_Title"),
    // "link": current.attr("ows_Item_Link"),
    // "order": current.attr("ows_Item_Order")
    saveEdit() {
        let links = this.state.links
        this.props.passProps({
            links
        })
    }
    removeLink(index) {
        let links = this.state.links;
        links.splice(index, 1);
        this.setState({
            links
        })
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
            style: ""
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
                    <div>
                        {that.state.links.map(function (e, i) {
                            return (
                                <div className="modal-content-edit-navigation--side-container">
                                    <button
                                        onClick={(i) => that.removeLink(i)}
                                        className="modal-content-edit-button--remove"
                                    >Remove Slide</button>
                                    <p className="modal-content-edit-header">Link Title</p>
                                    <input
                                        type="text"
                                        value={that.state.links[i]["title"]}
                                        onChange={(event) => that.updateLink(event, i, "title")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                    <p className="modal-content-edit-header">Link Address</p>
                                    <input
                                        type="text"
                                        value={that.state.links[i]["address"]}
                                        onChange={(value) => that.updateLink(value, i, "address")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                    <p className="modal-content-edit-header">Link Target</p>
                                    <input
                                        type="text"
                                        value={that.state.links[i]["target"]}
                                        onChange={(value) => that.updateLink(value, i, "target")}
                                        className="modal-content-edit-input-text"
                                    ></input>
                                    <p className="modal-content-edit-header">Link Style</p>
                                    <select
                                        value={that.state.links[i]["style"]}
                                        onChange={(value) => that.updateLink(value, i, "style")}
                                        className="modal-content-edit-select"
                                    >
                                        <option value="">Default</option>
                                        <option className="arrow-dxc-yellow" value="arrow-dxc-yellow">
                                            arrow-dxc-yellow
                                        </option>
                                        <option className="arrow-dxc-yellow-inverse" value="arrow-dxc-yellow-inverse">
                                            arrow-dxc-yellow-inverse
                                        </option>
                                        <option className="arrow-dxc-white" value="arrow-dxc-white">
                                            arrow-dxc-white
                                        </option>
                                        <option className="arrow-dxc-white-inverse" value="arrow-dxc-white-inverse">
                                            arrow-dxc-white-inverse
                                        </option>
                                    </select>
                                </div>
                            )
                        })}
                        <button
                            className="modal-content-edit-button--plus"
                            onClick={() => this.addLink()}
                        >+</button>
                    </div>
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="modal-content-edit-save"
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
                                <li className={`content-navigation--side-item point--arrow-circle ${e["style"]}`} key={`side-nav-item-${i}`}>
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

export default SideNav;