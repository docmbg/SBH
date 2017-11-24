import React from 'react';
import ReactDOM from 'react-dom';
import ContentContainer from './contentContainer.jsx';
import { DateRange } from 'react-date-range';


const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dateRangeTheme = {
    DateRange: {
        background: 'white'
    },
    Calendar: {
        background: 'transparent',
        color: 'black',
    },
    MonthAndYear: {
        background: 'white',
        color: 'black'
    },

    Day: {
        transition: 'transform .1s ease, box-shadow .1s ease, background .1s ease'
    },
    DaySelected: {
        background: 'grey'
    },
    DayActive: {
        background: 'rgb(255,237,000)',
        boxShadow: 'none'
    },
    DayInRange: {
        background: 'rgb(255,237,000)',
        color: 'black'
    },
    DayHover: {
        background: '#ffffff',
        color: '#7f8c8d',
        transform: 'scale(1.1) translateY(-10%)',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.4)'
    }
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorValue: 'default',
            rangeStart: '',
            rangeEnd: '',
            existingCalendars: [],
            locations: [],
            categories: [],
            events: [],
            filteredEvents: [],
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectorValue: nextProps.componentProperties.selectorValue,
            existingCalendars: nextProps.componentProperties.existingCalendars
        })

    }

    componentWillMount() {
        let that = this;
        if (window.location.href != 'http://localhost:3000/') {
            let mainURL = window.location.href.split('teams')[0] + 'teams/';
            let siteName = window.location.href.split(mainURL)[1].split('/')[0];
            let fullCalendarAddUrl = `${mainURL}${siteName}/Calendars/_layouts/15/new.aspx?FeatureId=%7B00bfea71-ec85-4903-972d-ebe475780106%7D&ListTemplate=106&`;
            let existingCalendars = [];
            let calendars = this.state.calendars;
            $().SPServices({
                operation: "GetListCollection",
                async: false,
                webURL: `${mainURL}${siteName}/Calendars/`,
                completefunc: function (xData, Status) {
                    $(xData.responseXML).SPFilterNode("List").each(function () {
                        console.log($(this).attr('ServerTemplate'))
                        if ($(this).attr('ServerTemplate') == 106) {
                            existingCalendars.push($(this).attr('Title'))
                        }
                    })
                    that.setState({
                        existingCalendars,
                        fullCalendarAddUrl,
                        siteName,
                        mainURL
                    })
                }
            })
            
        }
    }

    onCalendarChange(e) {
        let that = this;
        let events = [];
        let locations = [];
        let categories = [];
        $().SPServices({
            operation: "GetListItems",
            async: false,
            webURL: `${that.state.mainURL}${that.state.siteName}/Calendars/`,
            CAMLViewFields: "<ViewFields><FieldRef Name='Title'/><FieldRef Name='Location'/><FieldRef Name='EventDate'/><FieldRef Name='EndDate'/><FieldRef Name='Category'/></ViewFields>",
            listName: e.target.value,
            completefunc: function (xData, Status) {
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    console.log($(this).attr('ows_Title'))
                    let event = {};
                    event['Title'] = $(this).attr('ows_Title');
                    event['Location'] = $(this).attr('ows_Location');
                    event['EventDate'] = $(this).attr('ows_EventDate');
                    event['EndDate'] = $(this).attr('ows_EndDate');
                    event['Category'] = $(this).attr('ows_Category')
                    if(locations.indexOf(event['Location']) < 0){
                        locations.push(event['Location'])
                    }
                    if(categories.indexOf(event['Category']) < 0){
                        categories.push(event['Category'])
                    }
                    events.push(event)
                    
                });
                console.log(locations,categories)
                that.setState({
                    selectorValue: e.target.value,
                    events,
                    filteredEvents: events,
                    locations,
                    categories
                })
            }
        });
       
    }

    filterEvents(filterBy, event){
        let filteredEvents = this.state.filteredEvents.filter(e => e[filterBy] == event.target.value);
        this.setState({
            filteredEvents
        })
        
    }

    saveEdit() {
        this.props.passProps({
            iframe: this.state.iframe,
            selectorValue: this.state.selectorValue,
            calendarFilled: this.state.calendarFilled,
            existingCalendars: this.state.existingCalendars
        })
    }

    refreshList() {
        let existingCalendars = [];
        let that = this;
        let calendars = this.state.calendars;
        if (window.location.href != 'http://localhost:3000/') {
            $().SPServices({
                operation: "GetListCollection",
                async: false,
                webURL: `${mainURL}${siteName}/Calendars/`,
                completefunc: function (xData, Status) {
                    $(xData.responseXML).SPFilterNode("List").each(function () {
                        if ($(this).attr('ServerTemplate') == 106) {
                            existingCalendars.push($(this).attr('Title'))
                        }
                    })
                }
            })
        }
        this.setState({
            existingCalendars
        })
    }

    handleSelect(range) {
        let startDate = new Date(range.startDate._d);
        let endDate = new Date(range.endDate._d);
        let events = this.state.events;
        for(var i = 0; i < events.length; i++){
            console.log(new Date(events[i]['EventDate']).getTime());
            console.log(startDate.getTime())
            console.log( endDate.getTime())
        }
        let filteredEvents = this.state.events.filter(
            e => new Date(e['EventDate']).getTime() >= startDate.getTime() &&
            new Date(e['EventDate']).getTime() <= endDate.getTime())
        this.setState({
            rangeStart: `${startDate.getFullYear()}/${startDate.getMonth()}/${startDate.getDate()}`,
            rangeEnd: `${endDate.getFullYear()}/${endDate.getMonth()}/${endDate.getDate()}`,
            filteredEvents
        })

    }

    render() {
        console.log(this.state.rangeStart, this.state.rangeEnd)
        let that = this;
        if (this.props.editable) {
            return (
                <div>
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="modal-content-edit--save"
                        >Save</button>
                    </div>
                    <a href={this.state.fullCalendarAddUrl} target="_blank" > Add a new Calendar </a>
                    <p>or add from existing </p>
                    <select onChange={(e) => this.onCalendarChange(e)} defaultValue={this.state.selectorValue}>
                        <option disabled value="default"> -- Choose a Calendar -- </option>
                        {this.state.existingCalendars.map((e) => <option value={e}>{e}</option>)}
                    </select>
                    <button
                        onClick={() => this.refreshList()}
                    >
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </button>
                    <div>
                        <div>
                            <DateRange 
                                theme={dateRangeTheme}
                                onInit={this.handleSelect.bind(this)}
                                onChange={this.handleSelect.bind(this)}
                            />
                        </div>
                        <select onChange={(e) => this.filterEvents('Location',e)} defaultValue={this.state.selectorValue}>
                            <option disabled value="default"> -- Location -- </option>
                            {this.state.locations.map((e) => <option value={e}>{e}</option>)}
                        </select>
                        <select onChange={(e) => this.filterEvents('Category',e)} defaultValue={this.state.selectorValue}>
                            <option disabled value="default"> -- Category -- </option>
                            {this.state.categories.map((e) => <option value={e}>{e}</option>)}
                        </select>
                    </div>
                    <div>
                        {
                            this.state.filteredEvents.map(e => <p>{e['Title']}</p>)
                        }
                    </div>

                </div>
            )
        } else {
            if (this.state.calendarFilled) {
                return (
                    <div></div>
                )
            } else {
                return (
                    <div>{this.state.selectorValue}</div>
                )
            }
        }

    }

}

{/* <span className="eventCollection-calendarIcon">
<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" focusable="false" role="presentation">
    <path d="M32 32H0V4h6.667V0h2.667v4h13.333V0h2.667v4h6.667v28zM2.667 29.333h26.667V14.666H2.667v14.667zm0-17.333h26.667V6.667H2.667V12z"></path>
</svg>
<span className="calendarDate">
    {new Date(e["startDate"]).toString().split(" ")[1]}
</span>
</span> */}


export default Calendar;