import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom'


const styles = theme => ({
  search: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
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
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Search extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.fetchData(e.target.searchChar.value);
    }
    render(){
        const {classes} = this.props;
        return (
            <main className={classes.search}>
                 <Paper className={classes.paper}>
                    <form
                      className={classes.form}
                      onSubmit={this.handleSubmit}
                     >
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="searchChar">Star Wars' Char!</InputLabel> 
                            <Input name="searchChar" id="searchChar" autoFocus/>
                        </FormControl>
                        <Button 
                          variant="contained"
                          color="primary" 
                          type="submit"
                          fullWidth
                          className={classes.submit}
                          >
                        Search! 
                        </Button>
                    </form>
                </Paper>
            </main>
       );
    }
}

export default withStyles(styles)(Search);
