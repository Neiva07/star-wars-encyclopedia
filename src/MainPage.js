import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Route, Switch, Link} from 'react-router-dom';
import CharInfo from './CharInfo'
import * as apiCalls from './fetchAPI'
import Search from './Search';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  }
});

class MainPage extends Component {
        state = {
        }
    setSearch = (char) => {
        const character = char;
        this.setState({character})
    }
    componentDidUpdate(prevProps, prevState) {
        const {character} = this.state;
        if(character !== prevState.character){
            const data = apiCalls.getCharInfo(character);
            console.log(data);
            //change route(Link to)
        }
    }
    async fetchData (character) {
        const data = await apiCalls.getCharInfo(character);
        console.log(data);
    }
    render() {
        const {character} = this.state;
        return (
            <Switch>
                <Route exact path="/" render={props => <Search {...props} fetchData={this.fetchData} /> } />
                <Route path="/:character" component={CharInfo} /> 
            </Switch>
        )
    }
}

export default withStyles(styles)(MainPage);
