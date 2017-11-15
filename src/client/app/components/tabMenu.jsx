import React from 'react';
import ReactDOM from 'react-dom';
import { Tabs, Tab } from 'react-materialize';

class TabMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            activeTab: 0
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: nextProps.componentProperties.tabs
        })
    }
    // componentWillMount() {
    //     let _this = this;
    //     $().SPServices({
    //         operation: "GetListItems",
    //         async: false,
    //         listName: "News",
    //         CAMLViewFields: "<ViewFields><FieldRef Name='Title' /><FieldRef Name='Content' /></ViewFields>",
    //         completefunc: function (xData, Status) {
    //             let tabs = [];
    //             $(xData.responseXML).SPFilterNode("z:row").each(function () {
    //                 tabs.push({
    //                     title: $(this).attr('ows_Title'),
    //                     content:  $(this).attr('ows_Content')
    //                 })

    //             });
    //             _this.setState({
    //                 tabs
    //             })
    //         }
    //     });

    // }

    render() {
        let tabs = this.state.tabs;
        if (this.props.editable) {
            return (
                <div>

                </div>
            )
        } else {
            return (
                <div>
                    <Tabs>
                        {
                            this.state.tabs.map(function (e, i) {
                                return (
                                    <Tab>
                                        <div className={`page-content-tabsMenu-tab`} key={`page-content-tabMenu-${i}`}>
                                            <ContentContainer innerElementType={e.innerElementType} innerElementProps={e.innerElementProps} editable={false} />
                                        </div>
                                    </Tab>
                                )
                            })
                        }

                    </Tabs>
                </div>
            )
        }

    }

}

export default TabMenu;