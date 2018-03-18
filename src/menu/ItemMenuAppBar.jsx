import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    width: '100%',
  },
  nomeMenu: {
    margin: '0 auto',
    color: '#3F51B5'
  }
};

const ItemMenuAppBar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default" className={classes.header}>
        <Link to={props.route}>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.nomeMenu}>
              {props.nomeMenu}
            </Typography>
          </Toolbar>
        </Link>
      </AppBar>
    </div>
  );
};

ItemMenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemMenuAppBar);