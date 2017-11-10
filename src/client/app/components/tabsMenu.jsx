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
        let tabs = this.state.tabs;
        if(this.props.editable){
            return(
                <div>
                    
                </div>
            )
        } else {
            return (
                <div>
                    <Tabs>
                        {
                            this.props.tabs.map(function (e,i) {
                                    return(
                                        <ContentContainer innerElementType={e.innerElementType} innerElementProps={e.innerElementProps}/>
                                    )
                            })
                        }
                             
                    </Tabs>
                </div>
            )
        }
        
    }
    
}

export default Tabular;