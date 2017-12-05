import React from 'react';
import ReactDOM from 'react-dom';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info,
            tabsStyle: {
                display: 'none'
            },
            style: {
                width: '0%'
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let width = 100/nextProps.info;
        this.setState({
            info: nextProps.info,
            style: {
                width: `${nextProps.styleWidth}%`
            }
        })
    }

    showTabs() {
        this.setState({
            tabsStyle: {
                display: 'block'
            }
        })
    }

    hideTabs(){
        this.setState({
            tabsStyle: {
                display: 'none'
            }
        })
    }

    render() {
        console.log(this.props.look);
        let topLink = <a></a>;
        let info = this.state.info;
        if(info.children.length > 0){
            topLink = <a> {info['name']}</a>
        }
        else {
            topLink = <a href={info['link']}>{info['name']}</a>
        }
        let that = this;
        return (
           
                <div className="nav-dropDown-header" style={{width: this.props.styleWidth+'%'}} onMouseEnter={() => this.showTabs()} onMouseLeave={() => this.hideTabs()}>
                    {topLink}
                    <div style={this.state.tabsStyle} className="dropDown" > 
                        {
                            info['children'].map(e => <p><a  href={e['url']} target="_blank"> {e['name']} </a></p>)
                        }
                    </div>
                </div>
            
        )
    }
}

export default DropDown