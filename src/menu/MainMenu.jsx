import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles'
import logo from '../img/Screen.png';
import GreenTheme from './../themes/GreenTheme.jsx';
import GoldenTheme from './../themes/GoldenTheme.jsx';

const styles = theme => ({
  root: {
    padding: (theme.spacing.unit * 3),
  },
  button: {
    marginTop: theme.spacing.unit,
  },
  img: {
    maxWidth: '150px',
    margin: '0 auto',
  },
  link: {
    textDecoration: 'none',
  },
});

function MainMenu(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <img className={classes.img} src={logo} alt="Logo" />
      <Link to="/app/principal/777" className={classes.link}>
        <Button variant="raised" color="primary" className={classes.button} fullWidth>Cidade Canção</Button>
      </Link>
      <Link to="/app/principal/778" className={classes.link}>
        <GreenTheme>
          <Button variant="raised" color="primary" className={classes.button} fullWidth>Cidade Verde</Button>
        </GreenTheme>
      </Link>
      <Link to="/app/principal/metropolitano" className={classes.link}>
        <GoldenTheme>
          <Button variant="raised" color="primary" className={classes.button} fullWidth>Metropolitano</Button>
        </GoldenTheme>
      </Link>
    </div>
  );
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainMenu);