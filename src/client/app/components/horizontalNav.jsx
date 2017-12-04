import React from 'react';
import ReactDOM from 'react-dom';
import DropDown from './dropDown.jsx'

class HorizontalNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.componentProperties.tabs || [],

        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: nextProps.componentProperties.tabs
        })
    }
    addChildTab(i) {
        let tabs = this.state.tabs;
        tabs[i]['children'].push({
            name: '',
            link: '',
        })
        this.setState({ tabs });
    }
    addTab() {
        let tabs = this.state.tabs;
        tabs.push({
            name: '',
            link: '',
            children: []
        })
        this.setState({ tabs })
    }
    removeTab(i) {
        let tabs = this.state.tabs;
        tabs.splice(i, 1);
        this.setState({ tabs });
    }
    handlePropChange(parentIndex, prop, value, childIndex) {
        let tabs = this.state.tabs;
        if (childIndex == undefined) {
            tabs[parentIndex][prop] = value;
        }
        else {
            tabs[parentIndex]['children'][childIndex][prop] = value;
        }
        this.setState({ tabs });
    }

    saveEdit() {
        let tabs = this.state.tabs;
        this.props.passProps({ tabs });
    }

    changeLook(e){
        this.setState({
            look: e.target.value
        })
    }
    render() {
        let that = this;
        if (!this.props.editable) {
            return (
                <div className='horizontalNav'>
                    {
                        this.state.tabs.map(function (e, i) {
                            return (
                                <DropDown info={e} />
                            )
                        })
                    }
                </div>
            )
        }
        return (
            <div>
                <div>
                    <button
                        onClick={() => that.saveEdit()}
                        className="dxc-button"
                    >Save</button>
                </div>
                <div>
                    <p>Choose the look</p>
                    <select value={this.state.look} onChange={()=>this.changeLook()}>
                        <option value="dxc-black">DXC-Black</option>
                        <option value="dxc-white">DXC-White</option>
                    </select>
                </div>
                <div className='horizontalNav'>
                    {
                        this.state.tabs.map(function (e, i) {
                            return (
                                <DropDown info={e} />
                            )
                        })
                    }
                </div>
                <div className='tabCreation'>
                    {
                        this.state.tabs.map(function (e, i) {
                            return (
                                <div className='tabEdit'>
                                    Name of Tab:<input value={e.name} onChange={(event) => that.handlePropChange(i, 'name', event.target.value)} />
                                    Link address:<input value={e.link} onChange={(event) => that.handlePropChange(i, 'link', event.target.value)} />
                                    <button onClick={() => that.addChildTab(i)}>+</button>
                                    <button onClick={() => that.removeTab(i)}>X</button>
                                    {
                                        e['children'].map((e, j) =>
                                            <div>
                                                Name of Tab:<input value={e["name"]} onChange={(event) => that.handlePropChange(i, 'name', event.target.value, j)} />
                                                Link address:<input value={e["link"]} onChange={(event) => that.handlePropChange(i, 'link', event.target.value, j)} />
                                            </div>
                                        )
                                    }
                                </div>)
                        })
                    }
                </div>
                <button onClick={() => this.addTab()}>Add Tab</button>
            </div>
        )
    }
}

export default HorizontalNav