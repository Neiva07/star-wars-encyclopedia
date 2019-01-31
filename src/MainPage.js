import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Route, Switch, Link} from 'react-router-dom';
import Search from './Search'
import CharInfo from './CharInfo'

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
        if(this.state.character !== prevState.character){
            //fetch data
            //change route(Link to)
        }
    }
    render() {
        const {character} = this.state;
        return (
            <Switch>
                <Route exact path="/" component={Search}/>
                <Route path="/:character" component={CharInfo} /> 
            </Switch>
        )
    }
}

export default withStyles(styles)(MainPage);
