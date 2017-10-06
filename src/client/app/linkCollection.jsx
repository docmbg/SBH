import React from 'react';
import ReactDOM from 'react-dom';

class LinkCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }
    componentWillMount() {
        let _this = this;
        let linkCollectionTitle = this.props.linkCollectionTitle;
        let linkCollectionSite = this.props.linkCollectionSite;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "LinkCollections",
            CAMLQuery: "<Query><Where><And><Eq><FieldRef Name='LinkCollection_Title' /><Value Type='Text'>"
            +linkCollectionTitle+
            "</Value></Eq><Eq><FieldRef Name='LinkCollection_Site' /><Value Type='Text'>"
            +linkCollectionSite+
            "</Value></Eq></And></Where></Query>",
            completefunc: function (xData, Status) {
                let links = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    let current = $(this);
                    links.push({
                        "title": current.attr("ows_Title"),
                        "link": current.attr("ows_Link"),
                        "hover": current.attr("ows_Link_Hover"),
                        "order": current.attr("ows_Link_Order")
                    })
                })
                links = links.sort(function (a, b) {
                    return a["order"] - b["order"]
                })
                _this.setState({
                    links
                })
            }
        });

    }

    render() {
        let that = this;
        return (
            <div>
                <div className='linkCollection-title sideNavLink nounderline'>
                    {that.props.linkCollectionTitle}
                </div>
            <ul className='linkCollection'>
                {
                    that.state.links.map(function (e,i) {
                        return (
                            <li key={`linkCollection-${that.props.linkCollectionTitle}-${i}`} className="linkCollection-item">
                                <a className="" title={e["hover"] || ""} target="_blank" href={e["link"]}><div>{e["title"]}</div></a>
                            </li>
                        )
                    })
                }
            </ul>
            </div>
        )
    }
}

export default LinkCollection;