import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-materialize'

class Tabular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            activeTab: 0
        }
    }
    componentWillMount() {
        let _this = this;
        $().SPServices({
            operation: "GetListItems",
            async: false,
            listName: "News",
            CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Content' /></ViewFields>",
            completefunc: function (xData, Status) {
                let tabs = [];
                $(xData.responseXML).SPFilterNode("z:row").each(function () {
                    tabs.push({
                        title: $(this).attr('ows_Title'),
                        content:  $(this).attr('ows_Content')
                    })
                    
                });
                _this.setState({
                    tabs
                })
            }
        });

    }

    render() {
        console.log(this.state.tabs);
        let tabs = this.state.tabs;
        return (
            <div>
                <Tabs>
                    {
                        tabs.map(function (e,i) {
                                let phOb = {};
                                phOb['__html'] = e.content;
                                return (
                                    <Tab key={`tab-${i}`} active={i==0} title={e.title}>
                                       <div dangerouslySetInnerHTML={phOb} />
                                    </Tab>
                                )
                        })
                    }
                         
                </Tabs>
            </div>
        )
    }
    
}

export default Tabular;