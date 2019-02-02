import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as apiCalls from './fetchAPI';

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
    marginTop: theme.spacing.unit * 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
       // function to separe personal detais, https and arrays
       //new apicalls to urls from the character 
    }
    stringProcessing(string) {
    }
        render(){
    const {charData, classes} = this.props;
    console.log(charData);
        return( 
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <List>
                    {Object.keys(charData.personalInfo).map(detail => (
                        <ListItem key={detail}>
                            <ListItemText primary={detail} secondary={charData.personalInfo[detail]} />
                        </ListItem>
                    ))}
                    
                    </List> 
                </Paper>
            </main>
            
        );
    }
}

export default withStyles(styles)(CharInfo);
