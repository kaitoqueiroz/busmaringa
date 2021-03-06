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
import GreenTheme from './../themes/GreenTheme.jsx';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

const styles = theme => ({
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
  link: {
    textDecoration: 'none',
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
        <Paper elevation={4}>
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
                      <TableCell className={classes.centered}>
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto} className={classes.link}>
                          <Button disabled={!this.state.linha} variant="raised" color="secondary">
                            Itinerário
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell className={classes.centered}>
                        <Link to={'/app/trajeto/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto} className={classes.link}>
                          <GreenTheme>
                            <Button disabled={!this.state.linha} variant="raised" color="primary">
                            Trajeto &nbsp;
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path fill="#fff" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                <path d="M0 0h24v24H0z" fill="none"/>
                            </svg>
                            </Button>
                          </GreenTheme>
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
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto} className={classes.link}>
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
                        <Link to={'/app/itinerario/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto} className={classes.link}>
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