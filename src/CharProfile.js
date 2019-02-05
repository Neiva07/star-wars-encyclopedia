import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import * as apiCalls from './fetchAPI';
import {Route, Switch} from 'react-router-dom'
import PersonalInfoList from './PersonalInfoList';
import RequestedDataList from './RequestedDataList';
import SpecDetails from './SpecDetails'


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', 
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    flexGrow: 1,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
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
     
    async fetchComplementedData() {
        const {charData} = this.props; 
        const dataRequested = await apiCalls.getMoreInfo(charData.httpRequests)
        this.setState({dataRequested})
    }

        render(){
    const {charData, classes} = this.props;
    const {dataRequested} = this.state;
       return( 
            <main className={classes.main}>
                <Grid container spacing={24}>
                    <Grid item xs={4}> 
                        <Paper className={classes.paper}>
                             <Typography variant="h6" gutterBottom>
                                Peronsal Details 
                              </Typography>
                            <PersonalInfoList personalInfo={charData.personalInfo} />
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <RequestedDataList status={false} dataRequested={dataRequested} url={this.props.match.url}/> 
                </Paper>
                    </Grid>
                <Switch>
                    <Route 
                    path={`${this.props.match.url}/:category/:id`} 
                    children={({match})=> (
                        <SpecDetails 
                            detailData={dataRequested[match.params.category][match.params.id]} 
                            classes={classes}/>)
                    }/>
                    <Route 
                    path={`${this.props.match.url}/:category`} 
                    children={({match})=> (
                        <SpecDetails 
                            detailData={dataRequested[match.params.category]} 
                            classes={classes}/>)
                    }/>

                </Switch>
               </Grid>
            </main>
                
        );
    }
}
export default withStyles(styles)(CharInfo);
