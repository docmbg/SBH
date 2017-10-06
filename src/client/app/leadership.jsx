import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, browserHistory   } from 'react-router';

class LeadershipCorner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leadership: {}
        }


    }

    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "Leadership_Corner",
            completefunc: function (xData, Status) {
                let leadership = {};
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    leadership.name = $(this).attr('ows_Name');
                    leadership.title = $(this).attr('ows_Title');
                    leadership.email = $(this).attr('ows_Email');
                    leadership.orgChart = $(this).attr('ows_Org_Chart');
                    leadership.image = $(this).attr('ows_Image');
                    
                });
                _this.setState({
                    leadership
                })
            }
        });
    }

    render() {
        let leadership = this.state.leadership;
        return (
            <div>
                <img src={leadership.image}/>
                <p className="leaderShipTitle">{leadership.name}</p>
                <p className="leaderShipText">{leadership.title}</p>
                <p className="leaderShipText">
                    <a href={`mailto:${leadership.email}`}>Email</a> | <a href={leadership.orgChart} target="_blank">Org Chart</a>
                </p>
            </div>
        )
    }

}

export default LeadershipCorner;