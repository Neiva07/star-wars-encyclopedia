import React from 'react';
import * as auxFunctions from './auxFunctions'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText'

const PersonalInfoList = ({personalInfo}) => {
    return (
        <List>
         {Object.keys(personalInfo).map(detail =>{
             const processedDetail = auxFunctions.stringProcessed(detail)
             const newAttribute= auxFunctions.stringProcessed(personalInfo[detail])                  
             if(processedDetail === "Opening Crawl") {
                 return (<ListItem>
                     <ListItemText primary={processedDetail} />
                            
                     <ListItemText  primary={`${newAttribute.slice(0,100)}...`}/>
                 </ListItem>
                 )
             }

          return ( <ListItem key={processedDetail}>
                 <ListItemText primary={processedDetail} secondary={personalInfo[processedDetail]} />
                 <Typography variant="body1">{newAttribute}</Typography>
             </ListItem>
             )   
         })} 
         </List>
     ) 
}

export default PersonalInfoList;
