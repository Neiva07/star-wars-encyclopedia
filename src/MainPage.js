import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Route, Switch, Link} from 'react-router-dom';
import CharProfile from './CharProfile'
import * as apiCalls from './fetchAPI'
import Search from './Search';
import {withRouter} from 'react-router-dom';
import * as auxFunctions from './auxFunctions';

class MainPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            charData : {}
           }
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        const {personalInfo} = this.state.charData;
        if(personalInfo !== prevState.charData.personalInfo)
            this.props.history.push(`/${personalInfo.name}`)
    }

    async fetchData (character) {
        const rawProfileData = await apiCalls.getCharInfo(character);
        const charData = auxFunctions.filteredData(rawProfileData)
        this.setState({charData})
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
