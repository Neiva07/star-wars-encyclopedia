import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Route, Switch, Link} from 'react-router-dom';
import CharProfile from './CharProfile'
import * as apiCalls from './fetchAPI'
import Search from './Search';
import {withRouter} from 'react-router-dom';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            charData : {}
           }
        this.fetchData = this.fetchData.bind(this);
        this.filteredData = this.filteredData.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        const {personalInfo} = this.state.charData;
        if(personalInfo !== prevState.charData.personalInfo)
            this.props.history.push(`/${personalInfo.name}`)
    }

    async fetchData (character) {
        const rawProfileData = await apiCalls.getCharInfo(character);
        const charData = this.filteredData(rawProfileData)
        this.setState({charData})
    }

    filteredData(rawProfileData) {
        let category = "";
        const charData = Object.keys(rawProfileData)
            .filter(key => key!== "created" && key !== "edited" && key!== "url" && rawProfileData[key] !== "n/a" && rawProfileData[key].length > 0)
            .reduce((acc, key) => {
                if(rawProfileData[key].slice(0,4) !== "http" && !Array.isArray(rawProfileData[key])){
                    category = "personalInfo";
                }else {
                    category = "httpRequests";
                }
                Object.assign(acc[category], {[key] : rawProfileData[key]});
                return acc;
            }, {
                personalInfo : {},
                httpRequests: {}
            })
        return charData;
    }

    render() {
        const {charData} = this.state;
        return (
            <Switch>
                <Route exact path="/" render={props => <Search {...props} fetchData={this.fetchData} /> } />
                { charData.personalInfo  ? <Route path={`/:${charData.personalInfo.name}`} render={props => <CharProfile {...props} charData={charData}/>} /> : null} 
            </Switch>
        )
    }
}

export default withRouter(MainPage);
