import React from 'react';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom';
import './MainMenu.css';

function MainMenu(props) {
  const { classes } = props;
  const buttonClasses = classes.button + ' main-menu-button';
  const greenButtonClasses = classes.button + ' main-menu-button green-button';
  return (
    <div className="main-menu-container">
      <img className={classes.img} src="/img/Screen.png" alt="Logo" />
      <Link to="/app/principal/777">
        <Button variant="raised" color="primary" className={buttonClasses}>Cidade Canção</Button>
      </Link>
      <Link to="/app/principal/778">
        <Button variant="raised" color="primary" className={greenButtonClasses}>Cidade Verde</Button>
      </Link>
    </div>
  );
}

const styles = theme => ({
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