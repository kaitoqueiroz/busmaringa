import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  container: {

  },
  iframe: {
    width: '100%',
    height: '100em',
    border: 'none'
  }
});

class Rotas extends Component {
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.container} elevation={4}>
          <iframe title="Rota" className={classes.iframe} src="http://www.mobilibus.com/web/detalhes-linha/2i0vm?a=777"></iframe>
        </Paper>
    );
  }
}
Rotas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Rotas);