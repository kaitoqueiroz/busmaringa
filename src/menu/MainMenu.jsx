import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import logo from '../img/Screen.png';
import './MainMenu.css';

function MainMenu(props) {
  const { classes } = props;
  const buttonClasses = classes.button + ' main-menu-button';
  const greenButtonClasses = classes.button + ' main-menu-button green-button';
  const yellowButtonClasses = classes.button + ' main-menu-button yellow-button';
  return (
    <Paper className={classes.container} elevation={4}>
      <div className="main-menu-container">
        <img className={classes.img} src={logo} alt="Logo" />
        <Link to="/app/principal/777">
          <Button variant="raised" color="primary" className={buttonClasses}>Cidade Canção</Button>
        </Link>
        <Link to="/app/principal/778">
          <Button variant="raised" color="primary" className={greenButtonClasses}>Cidade Verde</Button>
        </Link>
        <Link to="/app/principal/metropolitano">
          <Button variant="raised" color="primary" className={yellowButtonClasses}>Metropolitano</Button>
        </Link>
      </div>
    </Paper>
  );
}

const styles = theme => ({
  container: {
    padding: '20px',
    height: 'calc(100vh - 50px)',
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none',
  },
  img: {
    maxWidth: '150px',
    margin: '0 auto'
  },
});

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);