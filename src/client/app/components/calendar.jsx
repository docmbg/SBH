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
            existingCalendars: [],
            locations: [],
            categories: [],
            events: [],
            locationFilter: 'Location',
            categoryFilter: 'Category',
            startDate: new Date().toLocaleDateString(),
            endDate: new Date().toLocaleDateString(),
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            selectorValue: nextProps.componentProperties.selectorValue,
            existingCalendars: nextProps.componentProperties.existingCalendars || [],
            events: nextProps.componentProperties.events || [],
            filteredEvents: nextProps.componentProperties.filteredEvents || [],
            locationFilter: nextProps.componentProperties.locationFilter,
            categoryFilter: nextProps.componentProperties.categoryFilter,
            locations: nextProps.componentProperties.locations || [],
            categories: nextProps.componentProperties.categories || [],
            startDate: nextProps.componentProperties.startDate,
            endDate: nextProps.componentProperties.endDate,
            displayedEvents: nextProps.componentProperties.displayedEvents || [],
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
                        if ($(this).attr('ServerTemplate') == 106) {
                            existingCalendars.push($(this).attr('Title'))
                        }
                    })
                    that.setState({
                        existingCalendars,
                        fullCalendarAddUrl,
                        siteName,
                        mainURL,
                        selectorValue: that.props.componentProperties.selectorValue,
                        events: that.props.componentProperties.events || [],
                        filteredEvents: that.props.componentProperties.filteredEvents || [],
                        locationFilter: that.props.componentProperties.locationFilter,
                        categoryFilter: that.props.componentProperties.categoryFilter,
                        locations: that.props.componentProperties.locations || [],
                        categories: that.props.componentProperties.categories || [],
                        startDate: that.props.componentProperties.startDate,
                        endDate: that.props.componentProperties.endDate,
                        displayedEvents: that.props.componentProperties.displayedEvents || []
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
                    let event = {};
                    event['Title'] = $(this).attr('ows_Title');
                    event['ID'] = $(this).attr('ows_ID');
                    event['Location'] = $(this).attr('ows_Location');
                    event['EventDate'] = $(this).attr('ows_EventDate');
                    event['EndDate'] = $(this).attr('ows_EndDate');
                    event['Category'] = $(this).attr('ows_Category')
                    event['Month'] = parseInt($(this).attr('ows_EventDate').split('-')[1]) - 1;
                    event['visible'] = true;
                    if (locations.indexOf(event['Location']) < 0) {
                        locations.push(event['Location'])
                    }
                    if (categories.indexOf(event['Category']) < 0) {
                        categories.push(event['Category'])
                    }
                    events.push(event)

                });
                that.setState({
                    selectorValue: e.target.value,
                    events,
                    filteredEvents: events,
                    locations,
                    categories,
                    displayedEvents: [],
                })
            }
        });

    }

    filterEvents(filterBy, event, filteredByDates) {

        let events;
        if (filteredByDates == undefined) {
            events = this.state.filteredEvents;
        } else {
            events = filteredByDates
        }
        let locationFilter = this.state.locationFilter;
        let categoryFilter = this.state.categoryFilter;
        if (filterBy == 'Location') {
            locationFilter = event;
        } else {
            categoryFilter = event;
        }
        let filters = [locationFilter, categoryFilter];
        let filterNames = ['Location', 'Category']
        for (let i = 0; i < filters.length; i++) {
            if (filters[i] != 'No Filter' && filterNames.indexOf(filters[i]) == -1) {
                events = events.filter(e => e[filterNames[i]] == filters[i]);
            }
        }
        this.setState({
            displayedEvents: events,
            locationFilter,
            categoryFilter
        })

    }

    saveEdit() {
        this.props.passProps({
            selectorValue: this.state.selectorValue,
            existingCalendars: this.state.existingCalendars,
            events: this.state.events,
            filteredEvents: this.state.filteredEvents,
            locationFilter: this.state.locationFilter,
            categoryFilter: this.state.categoryFilter,
            locations: this.state.locations,
            categories: this.state.categories,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            displayedEvents: this.state.displayedEvents
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
                webURL: `${that.state.mainURL}${that.state.siteName}/Calendars/`,
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
        let sDate = new Date(range.startDate._d);
        let eDate = new Date(range.endDate._d);
        let events = this.state.events;
        let filteredEvents = events.filter(
            e => new Date(e['EventDate']).getTime() >= sDate.getTime() &&
                new Date(e['EventDate']).getTime() <= eDate.getTime())

        this.setState({
            displayedEvents: filteredEvents,
            filteredEvents,
            startDate: new Date(range.startDate._d).toLocaleDateString(),
            endDate: new Date(range.endDate._d).toLocaleDateString()
        })
        this.filterEvents('Location', this.state.locationFilter, filteredEvents)
    }

    setVisibility(i) {
        let displayedEvents = this.state.displayedEvents;
        displayedEvents[i]['visible'] = !displayedEvents[i]['visible'];
        this.setState({
            displayedEvents
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
        let currentCalendarURL = this.state.selectorValue.replace(/ /g, '%20');
        let that = this;
        console.log(this.state.displayedEvents)
        let displayedEvents = this.state.displayedEvents.filter(e => e['visible'] == true);
        if (this.props.editable) {
            return (
                <div>
                    <div>
                        <button className='dxc-close' onClick={() => this.passClose()}>
                            <i className="material-icons">&#xE5CD;</i>
                        </button>
                        <button
                            onClick={() => that.saveEdit()}
                            className="dxc-button"
                        >Save</button>
                    </div>
                    {

                        this.state.displayedEvents.map((e, i) =>
                            <div className="event preview">
                                {e['visible'] == true ? <i onClick={() => this.setVisibility(i)} className='material-icons mini calendarIcons'> &#xE8F4;</i> :
                                    <i onClick={() => this.setVisibility(i)} className='material-icons mini calendarIcons'> &#xE8F5;</i>}

                                <span className="eventCollection-calendarIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" focusable="false" role="presentation">
                                        <path d="M32 32H0V4h6.667V0h2.667v4h13.333V0h2.667v4h6.667v28zM2.667 29.333h26.667V14.666H2.667v14.667zm0-17.333h26.667V6.667H2.667V12z"></path>
                                    </svg>
                                    <span className="calendarDate preview">
                                        {months[e['Month']]}
                                    </span>
                                </span>
                                <p className="eventTitle"><a
                                    href={`${that.state.mainURL}${that.state.siteName}/Calendars/Lists/${currentCalendarURL}/DispForm.aspx?ID=${e['ID']}&IsDlg=1`}
                                    target="_blank">{e['Title']}</a></p>
                            </div>)
                    }
                    <div className="divider"></div>
                    <div className="calendarEdit">
                        <div className="calendarFunctions">
                            <a className="dxc-link" href={this.state.fullCalendarAddUrl} target="_blank" > Add Calendar </a>
                            <a className="dxc-link" href={`${that.state.mainURL}${that.state.siteName}/Calendars/Lists/${currentCalendarURL}/NewForm.aspx?IsDlg=1`} target="_blank" >Add Event</a>
                            <select onChange={(e) => this.onCalendarChange(e)} defaultValue={this.state.selectorValue}>
                                <option disabled value="default"> -- Choose a Calendar -- </option>
                                {this.state.existingCalendars.map((e) => <option value={e}>{e}</option>)}
                            </select>
                            <button onClick={() => this.refreshList()}>
                                <i className="fa fa-refresh" aria-hidden="true"></i>
                            </button>
                            <select onChange={(e) => this.filterEvents('Location', e.target.value)} defaultValue={this.state.locationFilter}>
                                <option disabled value="Location">-- Location --</option>
                                <option value="No Filter">No Filter</option>
                                {this.state.locations.map((e) => <option value={e}>{e}</option>)}
                            </select>

                            <select onChange={(e) => this.filterEvents('Category', e.target.value)} defaultValue={this.state.categoryFilter}>
                                <option disabled value="Category">-- Category --</option>
                                <option value="No Filter">No Filter</option>
                                {this.state.categories.map((e) => <option value={e}>{e}</option>)}
                            </select>
                        </div>

                        <div>
                            <p>Event Date Range</p>
                            <DateRange
                                theme={dateRangeTheme}
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onInit={this.handleSelect.bind(this)}
                                onChange={this.handleSelect.bind(this)}
                                format='MM/DD/YYYY'
                            />

                        </div>


                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    {

                        displayedEvents.map(e =>
                            <div className="event">
                                <span className="eventCollection-calendarIcon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" focusable="false" role="presentation">
                                        <path d="M32 32H0V4h6.667V0h2.667v4h13.333V0h2.667v4h6.667v28zM2.667 29.333h26.667V14.666H2.667v14.667zm0-17.333h26.667V6.667H2.667V12z"></path>
                                    </svg>
                                    <span className="calendarDate">
                                        {months[e['Month']]}
                                    </span>
                                </span>
                                <p className="eventTitle"><a
                                    href={`${that.state.mainURL}${that.state.siteName}/Calendars/Lists/${currentCalendarURL}/DispForm.aspx?ID=${e['ID']}&IsDlg=1`}
                                    target="_blank">{e['Title']}</a></p>
                            </div>)
                    }
                </div>
            )
        }

    }

}




export default Calendar;