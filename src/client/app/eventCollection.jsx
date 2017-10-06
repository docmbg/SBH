import React from 'react';
import ReactDOM from 'react-dom';

class EventCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    componentWillMount() {
        let _this = this;
        let eventCollectionTitle = this.props.eventCollectionTitle;
        let eventCollectionList = this.props.eventCollectionList;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: eventCollectionList,
            CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='ID' /><FieldRef Name='LinkTitle' /><FieldRef Name='EncodedAbsUrl' /><FieldRef Name='Start Date' /><FieldRef Name='End Date' /><FieldRef Name='Location' /></ViewFields>",
            // CAMLQuery: "<Query><Where><And><Eq><FieldRef Name='eventCollection_Title' /><Value Type='Text'>"
            // +eventCollectionTitle+
            // "</Value></Eq><Eq><FieldRef Name='eventCollection_Site' /><Value Type='Text'>"
            // +eventCollectionList+
            // "</Value></Eq></And></Where></Query>",
            completefunc: function (xData, Status) {
                let events = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    let current = $(this);
                    events.push({
                        "title": current.attr("ows_Title"),
                        "location": current.attr("ows_Location"),
                        "startDate": (current.attr("ows_EventDate") || " ").split(" ").join("T"),
                        "endDate": (current.attr("ows_EndDate") || " ").split(" ").join("T"),
                        "viewLink" : (current.attr("ows_EncodedAbsUrl") || "").toString().split("/").splice(0,current.attr("ows_EncodedAbsUrl").split("/").length-1).join("/")
                         + "/DispForm.aspx?ID="+current.attr("ows_ID")
                    })
                })
                events = events.sort(function (a, b) {
                    return new Date(a["startDate"]).getTime() - new Date(b["startDate"]).getTime()
                })
                _this.setState({
                    events
                })
                
            }
        });

    }

    render() {
        console.log(this.state.events)
        let that = this;
        return (
            <div>
                <div className='eventCollection-title sideNavLink'>
                    {that.props.eventCollectionTitle}
                </div>
            <ul className='eventCollection'>
                {
                    that.state.events.map(function (e,i) {
                        return (
                            <li key={`eventCollection-${that.props.eventCollectionTitle}-${i}`} className="eventCollection-item">
                                <div>
                                    <span className="eventCollection-calendarIcon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" focusable="false" role="presentation">
                                            <path d="M32 32H0V4h6.667V0h2.667v4h13.333V0h2.667v4h6.667v28zM2.667 29.333h26.667V14.666H2.667v14.667zm0-17.333h26.667V6.667H2.667V12z"></path>
                                        </svg>
                                        <span className="calendarDate">
                                            {new Date(e["startDate"]).toString().split(" ")[1]}
                                        </span>
                                    </span>
                                    <a className="nounderline eventTitle" target="_blank" href={e["viewLink"]}><div className="">{e["title"]}</div></a>
                                </div>
                                <div className="eventCollection-location">{e["location"]}</div>
                                <div className="eventCollection-timeFrame">
                                    {`${new Date(e["startDate"]).toDateString()}, 
                                    ${new Date(e["startDate"]).toLocaleTimeString()} - 

                                    ${new Date(e["endDate"]).toDateString()},
                                    ${new Date(e["endDate"]).toLocaleTimeString()}`} 
                                </div>
                            </li>
                        )
                    })
                }
            </ul> 
            </div> 
        )
    }
}

export default EventCollection;