import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
  container: {
    height: 'calc(100vh - 50px)',
    overflow: 'auto',
  },
  hidden: {
    display: 'none'
  },
  centered: {
    textAlign: 'center'
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

class Horarios extends Component {
  constructor(props) {
    super(props);
    this.props.changeTitle('Horários');

    var params = props.match.params;
    horarios = require('../json/'+params.ciaID+'/horarios/'+params.linha+'.json');
    var trip = horarios.trips[params.trajeto];
    var dias = horarios.directions[trip.directionId].calendars;

    var diaUtil = [];
    var sabado = [];
    var domingo = [];
    dias.forEach((obj) => {
      switch(obj.serviceDesc){
        case 'Sábados':
          sabado = obj.departures.filter(o => o.tripSeq === parseInt(trip.tripSeq, 10));
          break;
        case 'Domingos/Feriados':
          domingo = obj.departures.filter(o => o.tripSeq === parseInt(trip.tripSeq, 10));
          break;
        default:
          diaUtil = obj.departures.filter(o => o.tripSeq === parseInt(trip.tripSeq, 10));
      }
    });
    
    this.state = {
      ciaID: params.ciaID,
      linha: params.linha,
      value: 0,
      trajeto: params.trajeto,
      diaUtil: diaUtil,
      sabado: sabado,
      domingo: domingo,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.container} elevation={4}>
          <AppBar position="static" color="default">
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              fullWidth
              centered
            >
              {
                this.state.diaUtil.length !== 0 ? <Tab label="Dia Útil" /> : null
              }
              {
                this.state.sabado.length !== 0 ? <Tab label="Sábado" /> : null
              }
              {
                this.state.domingo.length !== 0 ? <Tab label="Dom/Feriado" /> : null
              }
            </Tabs>
          </AppBar>
          <SwipeableViews
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2">{horarios.routeName}: {horarios.trips[this.state.trajeto].tripDesc}</TableCell>
                  </TableRow>
                  {
                    (this.state.ciaID !== 'metropolitano') ?
                    <TableRow>
                      <TableCell colSpan="2" className={classes.centered}>
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto}>
                          <Button disabled={!this.state.linha} variant="raised" color="secondary">
                            Itinerário
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    : null
                  }
                </TableHead>
                <TableBody>
                  {this.state.diaUtil.map((n,i) => {
                    return (
                      <TableRow key={i} className={classes.tableStriped}>
                        <TableCell className={classes.tableColumnClock}>
                          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
                        </TableCell>
                        <TableCell>{n.departure}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabContainer>
            <TabContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2">{horarios.routeName}: {horarios.trips[this.state.trajeto].tripDesc}</TableCell>
                  </TableRow>
                  {
                    (this.state.ciaID !== 'metropolitano') ?
                    <TableRow>
                      <TableCell colSpan="2" className={classes.centered}>
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto}>
                          <Button disabled={!this.state.linha} variant="raised" color="secondary">
                            Itinerário
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  : null
                }
                </TableHead>
                <TableBody>
                  {this.state.sabado.map((n,i) => {
                    return (
                      <TableRow key={i} className={classes.tableStriped}>
                        <TableCell className={classes.tableColumnClock}>
                          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
                        </TableCell>
                        <TableCell>{n.departure}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabContainer>
            <TabContainer>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan="2">{horarios.routeName}: {horarios.trips[this.state.trajeto].tripDesc}</TableCell>
                  </TableRow>
                  {
                    (this.state.ciaID !== 'metropolitano') ?
                    <TableRow>
                      <TableCell colSpan="2" className={classes.centered}>
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto}>
                          <Button disabled={!this.state.linha} variant="raised" color="secondary">
                            Itinerário
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    : null
                  }
                </TableHead>
                <TableBody>
                  {this.state.domingo.map((n,i) => {
                    return (
                      <TableRow key={i} className={classes.tableStriped}>
                        <TableCell className={classes.tableColumnClock}>
                          <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#888" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
                        </TableCell>
                        <TableCell>{n.departure}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TabContainer>
          </SwipeableViews>
        </Paper>
    );
  }
}
Horarios.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Horarios);