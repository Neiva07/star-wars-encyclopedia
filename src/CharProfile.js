import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as apiCalls from './fetchAPI';
import {Link, Route, Switch} from 'react-router-dom'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 5,
    flexDirection: 'column',
    alignItems: 'left',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});


class CharInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataRequested: {}
        }
        this.fetchComplementedData = this.fetchComplementedData.bind(this);
    }

    componentDidMount() {
        this.fetchComplementedData();
    }
     stringProcessed(string) {
             let stringProcessed = "";
            console.log(string)
             stringProcessed = string.charAt(0).toUpperCase() + string.slice(1);
             const mark = string.indexOf("_")
              if(mark !== -1){
                  return stringProcessed.slice(0, mark) +  " " + stringProcessed.replace("_", "").charAt(mark).toUpperCase() + stringProcessed.slice(mark +2 );
              }
             return stringProcessed;
         }
    async fetchComplementedData() {
        const {charData} = this.props; 
        const dataRequested = await apiCalls.getMoreInfo(charData.httpRequests)
        this.setState({dataRequested})
    }
    //detailsInfo = (category, name) => <Link to={`${this.props.match.url}/${category}/${name}`} {...props} />

        render(){
    const {charData, classes} = this.props;
    const {dataRequested} = this.state;
        const personalInfoData = (<List>
                {Object.keys(charData.personalInfo).map(detail =>{ 
                    const processedDetail = this.stringProcessed(detail) 
                    const newAttribute= this.stringProcessed(charData.personalInfo[detail]) 
                 return ( <ListItem key={processedDetail}>
                        <ListItemText primary={processedDetail} secondary={charData.personalInfo[processedDetail]} />
                        <Typography variant="body1">{newAttribute}</Typography>
                    </ListItem>
                    )
                })}
                </List> 
                ) 
        const moreInfoRequested = ( <div>
            {Object.keys(dataRequested).map((detail, i) => {
                 let processedDetail = this.stringProcessed(detail)
                        let name = "";
                        detail === "films" ? name = "title" : name = "name";
                    if(Array.isArray(dataRequested[detail])){
                        return (
                        <List>
                         <Typography variant="h6" gutterBottom>
                            {processedDetail} 
                        </Typography>
                        {dataRequested[detail].map(indDet => {
                        return ( 
                            <ListItem button component={Link} to={`${this.props.match.url}/${detail}/${indDet[name]}`}>
                                    <ListItemText primary={this.stringProcessed(indDet[name])} />
                                </ListItem>
                        )})}
                            </List>
                        )}
                else {
                    return (
                        <List>
                            <Typography variant="h6">
                                {processedDetail}
                            </Typography> 
                            <ListItem>
                                <ListItemText primary={this.stringProcessed(dataRequested[detail][name])} /> 
                            </ListItem>
                        </List>
                    )
                }
                })}
                </div> )
               return( 
            <main className={classes.main}>
                <Paper className={classes.paper}>
                     <Typography variant="h6" gutterBottom>
                        Peronsal Details 
                      </Typography>
                    {personalInfoData}
                    {moreInfoRequested}
                </Paper>
                <Switch>
                    <Route path={`${this.props.match.url}/:category/:name`}>

                   </Route> 
                </Switch>
            </main>
            
        );
    }
}
export default withStyles(styles)(CharInfo);
