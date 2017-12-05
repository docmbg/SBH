import React from 'react';
import ReactDOM from 'react-dom';
import DropDown from './dropDown.jsx'

class HorizontalNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: this.props.componentProperties.tabs || [],
            look: this.props.componentProperties.look || 'dxc-white-nav',
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            tabs: nextProps.componentProperties.tabs,
            look: nextProps.componentProperties.look
        })
    }
    addChildTab(i) {
        let tabs = this.state.tabs;
        tabs[i]['children'].push({
            name: 'Link name',
            link: '',
            active: false,
        })
        this.setState({ tabs });
    }
    addTab() {
        let tabs = this.state.tabs;
        tabs.push({
            name: 'Link name',
            link: '',
            active: false,
            children: []
        })
        this.setState({
            tabs,
        })
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
        let look = this.state.look;
        this.props.passProps({ tabs, look });
    }

    changeLook(e) {
        this.setState({
            look: e.target.value
        })
    }

    changeTabsStatus(i) {
        let tabs = this.state.tabs;
        tabs[i]['active'] = !tabs[i]['active'];
        this.setState({
            tabs
        })
    }

    removeTab(index, childIndex) {
        let tabs = this.state.tabs;
        let confirmResult = confirm('This is will permanently delete the item. Are you sure you want to proceed?')
        if (confirmResult) {
            if (childIndex == undefined) {
                tabs.splice(index, 1);
            } else {
                tabs[index]['children'].splice(childIndex, 1);
            }
        }
        this.setState({
            tabs,
        })
    }

    handleMove(dir, parentIndex, childIndex) {
        let tabs = this.state.tabs;
        if(childIndex == undefined){
            if (parentIndex + dir >= tabs.length || parentIndex + dir < 0) {
                return false
            }
            let item1 = tabs[parentIndex];
            let item2 = tabs[parentIndex + dir];
            tabs[parentIndex] = item2;
            tabs[parentIndex + dir] = item1;
        }else {
            if (childIndex + dir >= tabs[parentIndex]['children'].length || childIndex + dir < 0) {
                return false
            }
            let item1 = tabs[parentIndex]['children'][childIndex];
            let item2 = tabs[parentIndex]['children'][childIndex + dir];
            tabs[parentIndex]['children'][childIndex] = item2;
            tabs[parentIndex]['children'][childIndex + dir] = item1;
        }
        this.setState({
            tabs
        })
    }

    render() {
        let that = this;
        if (!this.props.editable) {
            return (
                <div className={this.state.look}>
                    {
                        this.state.tabs.map(function (e, i) {
                            return (
                                <DropDown info={e} styleWidth={Math.floor(100 / (that.state.tabs.length || 1))} look={that.state.look} />
                            )
                        })
                    }
                </div>
            )
        }


        return (
            <div>
                <div className="preview">
                    <div>
                        <button
                            onClick={() => that.saveEdit()}
                            className="dxc-button"
                        >Save</button>
                    </div>
                    <div>
                        <p>Choose the look</p>
                        <select value={this.state.look} onChange={(e) => this.changeLook(e)}>
                            <option value="dxc-black-nav">DXC-Black</option>
                            <option value="dxc-white-nav">DXC-White</option>
                        </select>
                    </div>
                    <div className={this.state.look}>
                        {
                            this.state.tabs.map(function (e, i) {
                                return (
                                    <DropDown look={that.state.look} info={e} styleWidth={Math.floor(100 / (that.state.tabs.length || 1))} />
                                )
                            })
                        }
                    </div>
                </div>
                <div className='tabCreation'>
                    <p>Tabs</p>
                    {
                        this.state.tabs.map(function (e, i) {
                            return (
                                <div className='tabEdit'>
                                    <div>
                                        {e['active'] == false ? <i onClick={(e) => that.changeTabsStatus(i)}
                                            className="material-icons mini left">&#xE254;</i> : <i onClick={(e) => that.changeTabsStatus(i)} className="material-icons mini left">&#xE22B;</i>}
                                        <span className='tabTitle'>{e['name'] || 'Link Name'}</span>
                                        <i onClick={(e) => that.handleMove(1,i)} className="material-icons mini">&#xE5DB;</i>
                                        <i onClick={(e) => that.handleMove(-1,i)} className="material-icons mini">&#xE5D8;</i>
                                        <i onClick={(e) => that.removeTab(i)} className="material-icons mini">&#xE5CD;</i>

                                    </div>
                                    <div className="divider"></div>
                                    <div className={` ${e['active'] == true ? 'show' : 'hide'}`}>
                                        <div className="tabEditBox">
                                            <p>Title<input value={e.name} onChange={(event) => that.handlePropChange(i, 'name', event.target.value)} /></p>
                                            <p>Link<input value={e.link} onChange={(event) => that.handlePropChange(i, 'link', event.target.value)} /></p>
                                        </div>

                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Link</th>
                                                </tr>
                                                {
                                                    e['children'].map((e, j) =>
                                                        <tr>
                                                            <td><input value={e["name"]} onChange={(event) => that.handlePropChange(i, 'name', event.target.value, j)} /></td>
                                                            <td><input value={e["link"]} onChange={(event) => that.handlePropChange(i, 'link', event.target.value, j)} /></td>
                                                            <td><i onClick={(e) => that.handleMove(1,i,j)} className="material-icons mini">&#xE5DB;</i></td>
                                                            <td><i onClick={(e) => that.handleMove(-1,i,j)} className="material-icons mini">&#xE5D8;</i></td>
                                                            <td><i onClick={(e) => that.removeTab(i, j)} className="material-icons mini">&#xE5CD;</i></td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <div className="anchorDiv">
                                            <i onClick={() => that.addChildTab(i)} className="material-icons mini">&#xE146;</i>
                                        </div>
                                    </div>
                                </div>)
                        })
                    }
                    <div className="anchorDiv"><i onClick={() => that.addTab()} className="material-icons">&#xE146;</i></div>
                </div>

            </div>
        )
    }
}

export default HorizontalNav