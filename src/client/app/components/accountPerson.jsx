import React from "react";
import ReactDOM from "react-dom";

export default class AccountPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.componentProperties.picture || "",
            title: this.props.componentProperties.title || "",
            name: this.props.componentProperties.name || "",
            email: this.props.componentProperties.email || "",
            structure: this.props.componentProperties.structure || "",
            bio: this.props.componentProperties.bio || ""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            picture: nextProps.componentProperties.picture,
            title: nextProps.componentProperties.title,
            name: nextProps.componentProperties.name,
            email: nextProps.componentProperties.email,
            structure: nextProps.componentProperties.structure,
            bio: nextProps.componentProperties.bio
        })
    }

    handlePropChange(value, occ) {
        this.setState({
            [occ]: value
        })
    }

    saveEdit() {
        this.props.passProps({
            picture: this.state.picture,
            title: this.state.title,
            name: this.state.name,
            email: this.state.email,
            structure: this.state.structure,
            bio: this.state.bio
        });
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
        if (this.props.editable) {
            return (
                <div>
                    <button className='dxc-close' onClick={() => this.passClose()}>
                        <i className="material-icons">&#xE5CD;</i>
                    </button>
                    <div>
                        <button
                            onClick={() => this.saveEdit()}
                            className="dxc-button"
                        >
                            Save
                        </button>
                    </div>
                    <div className="modal-content-accountPerson">
                        <p className="modal-content-edit-header">Title</p>
                        <input
                            type="text"
                            value={this.state.title}
                            onChange={e => this.handlePropChange(e.target.value, "title")}
                        />
                        <p className="modal-content-edit-header">Picture</p>
                        <input
                            type="text"
                            value={this.state.picture}
                            onChange={e => this.handlePropChange(e.target.value, "picture")}
                        />
                        <p className="modal-content-edit-header">Preview</p>
                        <img src={this.state.picture} />
                        <p className="modal-content-edit-header">Name</p>
                        <input
                            type="text"
                            value={this.state.name}
                            onChange={e => this.handlePropChange(e.target.value, "name")}
                        />
                        <p className="modal-content-edit-header">E-mail</p>
                        <input
                            type="text"
                            value={this.state.email}
                            onChange={e => this.handlePropChange(e.target.value, "email")}
                        />
                        <p className="modal-content-edit-header">Bio link</p>
                        <input
                            type="text"
                            value={this.state.bio}
                            onChange={e => this.handlePropChange(e.target.value, "bio")}
                        />
                        <p className="modal-content-edit-header">Structure link</p>
                        <input
                            type="text"
                            value={this.state.structure}
                            onChange={e => this.handlePropChange(e.target.value, "structure")}
                        />
                    </div>
                </div>

            )
        } else {
            return (
                <div className="content-accountPerson">
                    <div className="content-accountPerson-title">
                        {this.state.title}
                    </div>
                    <div className="content-accountPerson-picture">
                        <img src={this.state.picture} />
                    </div>
                    <div className="content-accountPerson-name">
                        {this.state.name}
                    </div>
                    <div className="content-accountPerson-contact">
                        <div className={`content-accountPerson-contact-item ${this.state.email ? "" : "hidden"}`}>
                            <a title={`E-mail`} href={`mailto:${this.state.email}`}><i className="material-icons">&#xE0E1;</i></a>
                        </div>
                        <div className={`content-accountPerson-contact-item ${this.state.structure ? "" : "hidden"}`}>
                            <a title={`Structure`} href={`mailto:${this.state.structure}`}><i className="material-icons">&#xE0AF;</i></a>
                        </div>
                        <div className={`content-accountPerson-contact-item ${this.state.bio ? "" : "hidden"}`}>
                            <a title={`Biography`} href={`mailto:${this.state.bio}`}><i className="material-icons">&#xE0E0;</i></a>
                        </div>
                    </div>
                </div>
            )
        }
    }
}