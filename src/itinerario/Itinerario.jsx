import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const styles = theme => ({
  container: {

  },
  tableColumnClock: {
    padding: '0',
    textAlign: 'center'
  },
  tableStriped: {
    "&:nth-child(odd)": {
      background: '#eee'
    }
  },
});

var horarios = [];
var dadosItinerario = [];
var itinerario = [];

class Itinerario extends Component {
  constructor(props) {
    super(props);
    this.props.changeTitle('Itinerário');

    var params = props.match.params;
    horarios = require('../json/'+params.ciaID+'/horarios/'+params.linha+'.json');
    dadosItinerario = require('../json/'+params.ciaID+'/itinerario/'+params.linha+'.json');
    var trip = horarios.trips[params.trajeto];
    dadosItinerario = dadosItinerario.filter(obj => obj[0] === trip.tripDesc);
    itinerario = dadosItinerario[0][3];
  }
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.container} elevation={4}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell colSpan="2">Ruas atendidas:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itinerario.map(n => {
                return (
                  <TableRow key={n[0]} className={classes.tableStriped}>
                    <TableCell className={  classes.tableColumnClock}>
                    	<svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888" d="M18.1,4.8C18,4.3 17.6,4 17.1,4H13L13.2,7H10.8L11,4H6.8C6.3,4 5.9,4.4 5.8,4.8L3.1,18.8C3,19.4 3.5,20 4.1,20H10L10.3,15H13.7L14,20H19.8C20.4,20 20.9,19.4 20.8,18.8L18.1,4.8M10.4,13L10.6,9H13.2L13.4,13H10.4Z" /></svg>
                    </TableCell>
                    <TableCell>{n[3]}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
    );
  }
}
Itinerario.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Itinerario);