import React, {Component} from 'react';
import * as auxFunctions from './auxFunctions'
import PersonalInfoList from './PersonalInfoList';
import Paper from '@material-ui/core/Paper';
import RequestedDataList from './RequestedDataList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import * as apiCalls from './fetchAPI';


export default class SpecDetails extends Component {
    constructor(props) {
        super(props);
        this.state ={
            personalInfo:{},
            httpRequests:{}

        }
        this.updatedSpecCard = this.updatedSpecCard.bind(this);
    }
    componentDidMount() {
        this.updatedSpecCard();
        }
    async componentDidUpdate(prevProps, prevState) {
        const {personalInfo, httpRequests} = this.state;
        if(prevProps.detailData !== this.props.detailData){
            this.updatedSpecCard();
        }
        if(personalInfo !== prevState.personalInfo){
            const dataRequested = await apiCalls.getMoreInfo(httpRequests)
            this.setState({dataRequested})
        }
    }
    updatedSpecCard() {
        const {detailData, classes} = this.props;
        const treatedDetails = auxFunctions.filteredData(detailData);
        this.setState({...treatedDetails})
    }

    render(){
        const {classes} = this.props;
        const detailData = this.state.personalInfo;
        const {dataRequested} = this.state;
        return(
            <Grid item xs={4}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        Detailed Information 
                    </Typography>
                    <PersonalInfoList personalInfo={detailData} />    
                {dataRequested ? <RequestedDataList  status={true} dataRequested={dataRequested} />
                    :null }
                </Paper>
            </Grid>
        )
    }
}
