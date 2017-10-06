import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'https://hpe.sharepoint.com/teams/CABO-Sofia/MainSite/src/client/index.aspx/';
class ContactsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Contacts",
            CAMLViewFields: `<ViewFields><FieldRef Name='Title' /><FieldRef Name='Name' />
            <FieldRef Name='Email' /><FieldRef Name='Image' />
            <FieldRef Name='Parent_Site' /></ViewFields>`,
            CAMLQuery: "<Query><Where><Eq><FieldRef Name='Parent_Site' /><Value Type='Text'>"
            +_this.props.pageTitle+
            "</Value></Eq></Where></Query>",
            completefunc: function (xData, Status) {
                let contacts = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    let current = $(this);
                    contacts.push({
                        "imageSrc" : current.attr("ows_Image"),
                        "title": current.attr("ows_Title"),
                        "name": current.attr("ows_Name"),
                        "email": current.attr("ows_Email"),
                        "order": current.attr("ows_Order"),
                    });
                });
                contacts = contacts.sort(function (a, b) {
                    return a["order"] - b["order"];
                })
                _this.setState({
                    contacts
                });
            }
        });

    }

    render() {
        let that = this;
        if(this.state.contacts.length < 1){ //escape null
            return (
                <div>
                </div>
            )
        }
        return (
            <div>
                <ul>
                    {
                        that.state.contacts.map(function (e, i) {
                            let imgUrl = { backgroundImage : `url('${e["imageSrc"]}')`}
                            return (
                                <li key={`contacts-${i}`}>
                                    <div className="contactsList-container">
                                        <div className="contactsList-image" style={imgUrl}>
                                        </div>
                                        <div className="contactsList-details">
                                            <p className="contactsList-name">{e["name"]}</p>
                                            <p className="contactsList-title">{e["title"]}</p>
                                            <p className="contactsList-mailto"><a href={`mailto:${e["email"]}`}>Contact e-mail</a></p>
                                        </div>
                                    </div>
                                </li>
                            );
                        }).filter(function (e) {
                            return e != null;
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default ContactsList;