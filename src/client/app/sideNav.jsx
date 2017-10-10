import React from 'react';
import ReactDOM from 'react-dom';

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Side_Navigation",
            completefunc: function (xData, Status) {
                let links = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    let current = $(this);
                    links.push({
                        "title": current.attr("ows_Title"),
                        "link": current.attr("ows_Item_Link"),
                        "order": current.attr("ows_Item_Order")
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
            
            <ul className='sideNavigation'>
                {
                    that.state.links.map(function (e,i) {
                        return (
                            <li className="sideNavigation-item" key={`sideNav-item-${i}`}>
                                <a className="sideNavigation-link" target="_blank" href={e["link"]}><div>{e["title"]}</div></a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default SideNav;