import React from 'react';
import ReactDOM from 'react-dom';
import ContentContainer from './contentContainer.jsx';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fullSurveyAddUrl: '',
            existingSurveys: [],
            surveys: <div></div>,
            iframe: '',
            loaded: 1,
            selectorValue: 'default'
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            iframe: nextProps.componentProperties.iframe,
            selectorValue: nextProps.componentProperties.selectorValue
        })

    }

    componentWillMount() {
        let mainURL = window.location.href.split('teams')[0] + 'teams/';
        let siteName = window.location.href.split(mainURL)[1].split('/')[0];
        let fullSurveyAddUrl = `${mainURL}${siteName}/Surveys/_layouts/15/new.aspx?FeatureId=%7B00bfea71-eb8a-40b1-80c7-506be7590102%7D&ListTemplate=102&`;
        let existingSurveys = [];
        let surveys = this.state.surveys;
        if (window.location.href != 'http://localhost:3000/') {
            $().SPServices({
                operation: "GetListCollection",
                async: false,
                webURL: 'https://hpe.sharepoint.com/teams/DOCMNewCo/Surveys',
                completefunc: function (xData, Status) {
                    $(xData.responseXML).SPFilterNode("List").each(function () {
                        console.log($(this).attr('ServerTemplate'))
                        if ($(this).attr('ServerTemplate') == 102) {
                            existingSurveys.push($(this).attr('Title'))
                        }
                    })
                }
            })
        }
        if (existingSurveys.length > 0) {
            surveys = (
                <select onChange={(e) => this.onSurveyChange(e)} defaultValue={this.state.selectorValue}>
                    <option disabled value="default"> -- Choose a Survey -- </option>
                    {existingSurveys.map((e) => <option value={e}>{e}</option>)}
                </select>
            )
        }
        this.setState({
            fullSurveyAddUrl,
            existingSurveys,
            surveys
        })
    }

    onSurveyChange(e) {
        let iframe = `${this.state.fullSurveyAddUrl.split('_layouts')[0]}/Lists/${e.target.value}/NewForm.aspx?IsDlg=1`;
        let loaded = this.state.loaded - 1;
        this.setState({
            iframe,
            selectorValue: e.target.value,
            loaded
        })
    }

    saveEdit() {
        this.props.passProps({
            iframe: this.state.iframe,
            selectorValue: this.state.selectorValue
        })
    }

    testOnload() {
        let loaded = this.state.loaded;
        loaded++;
        if (loaded == 2) {
            let iframe = `${this.state.fullSurveyAddUrl.split('_layouts')[0]}Lists/${this.state.selectorValue}/summary.aspx?IsDlg=1`;
            this.setState({
                iframe
            })
        } else {
            this.setState({
                loaded
            })
        }
    }

    render() {
        console.log(this.state.selectorValue)
        let that = this;
        if (this.props.editable) {
            return (<div>
                <div>
                    <button
                        onClick={() => that.saveEdit()}
                        className="modal-content-edit--save"
                    >Save</button>
                </div>
                <a href={this.state.fullSurveyAddUrl} target="_blank" > Add a new Survey </a>
                <p>or add from existing </p>
                {this.state.surveys}

                <iframe onLoad={(e) => this.testOnload()} src={this.state.iframe} width="100%" height="100%"></iframe>

            </div>)
        } else {
            return (

                <iframe onLoad={(e) => this.testOnload()} src={this.state.iframe} width="100%" height="100%"></iframe>

            )
        }

    }

}

export default Survey;