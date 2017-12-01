import React from 'react';
import ReactDOM from 'react-dom';

class DropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            info: this.props.info,
            tabsStyle: {
                display: 'none'
            }
        }
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
        let topLink = <a></a>;
        let info = this.state.info;
        console.log(info)
        if(info.children.length > 0){
            topLink = <a> {info['name']}</a>
        }
        else {
            topLink = <a href={info['link']}>{info['name']}</a>
        }
        let that = this;
        return (
            <div onMouseEnter={() => this.showTabs()} onMouseLeave={() => this.hideTabs()} className='horizontalNav'>
                {topLink}
                <div style={this.state.tabsStyle} className="dropDown"> 
                    {
                        info['children'].map(e => <p><a href={e['url']} target="_blank"> {e['name']} </a></p>)
                    }
                </div>
            </div>
        )
    }
}

export default DropDown