import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import CharProfile from './CharacterProfile'
import * as apiCalls from '../lib/utils/fetchData'
import Search from '../components/Search';
import {withRouter} from 'react-router-dom';
import * as auxFunctions from '../lib/utils/auxFunctions';

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
