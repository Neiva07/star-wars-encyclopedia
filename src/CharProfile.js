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
        this.fetchComplementedData = this.fetchComplementedData.bind(this);
    }

    componentDidMount() {
        this.fetchComplementedData();
      //new apicalls to urls from the character 
    }
     stringProcessed(string) {
             let stringProcessed = "";
             stringProcessed = string.charAt(0).toUpperCase() + string.slice(1);
             const mark = string.indexOf("_")
              if(mark !== -1){
                  return stringProcessed.slice(0, mark) +  " " + stringProcessed.replace("_", "").charAt(mark).toUpperCase() + stringProcessed.slice(mark +2 );
              }
             return stringProcessed;
         }
    async fetchComplementedData() {
        const {charData} = this.props; 
        const data = await apiCalls.getMoreInfo(charData.httpRequests)
        console.log(data)
        this.setState({data})
    }

        render(){
    const {charData, classes} = this.props;
        const personalInfoData = (<List>
                {Object.keys(charData.personalInfo).map(detail =>{ 
                    const newKey = this.stringProcessed(detail) 
                    const newAttribute= this.stringProcessed(charData.personalInfo[detail]) 
                 return ( <ListItem key={newKey}>
                        <ListItemText primary={newKey} secondary={charData.personalInfo[newKey]} />
                        <Typography variant="body1">{newAttribute}</Typography>
                    </ListItem>
                    )
                })}
                </List> 
                ) 
        return( 
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    {personalInfoData}
                </Paper>
            </main>
            
        );
    }
}
export default withStyles(styles)(CharInfo);
