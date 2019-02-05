import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography';
import * as auxFunctions from './auxFunctions';
import {Link} from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
        disabled: {
            color:'black',
            opacity: '1.0'
        }
    }

const RequestedDataList = ({dataRequested, url, status, classes}) => {
        return (
    <div>
     {Object.keys(dataRequested).map((detail, i) => {
      let processedDetail = auxFunctions.stringProcessed(detail)
             let name = "";
             detail === "films" ? name = "title" : name = "name";
         if(Array.isArray(dataRequested[detail])){
             return (
             <List>
              <Typography variant="h6" gutterBottom>
                 {processedDetail}
             </Typography>
             {dataRequested[detail].map((indDet,j) => {
             return (
                 <ListItem button disabled={status} 
                 classes={{
                     root: classes.root,
                     disabled: classes.disabled
                 
                 }}
                 component={Link} to={`${url}/${detail}/${j}`}>
                         <ListItemText primary={auxFunctions.stringProcessed(indDet[name])} />
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
                 <ListItem button component={Link} to={`${url}/${detail}`}>
                     <ListItemText primary={auxFunctions.stringProcessed(dataRequested[detail]    [name])} /> 
                 </ListItem>
             </List>
         )
     }
     })}
     </div> )
}
export default withStyles(styles)(RequestedDataList);
