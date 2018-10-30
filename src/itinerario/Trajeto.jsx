/* global L */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import stopBusImg from '../img/bus-stop.png';

import 'leaflet/dist/leaflet.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.js';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';


const styles = theme => ({
  container: {

  },
  legend: {
    paddingTop: '10px',
    fontWeight: 'bold',
  },
  map: {
    height: '100vh'
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
var waypoints = [];

class Trajeto extends Component {
  constructor(props) {
    super(props);
    this.props.changeTitle('Mapa do Trajeto');

    var params = props.match.params;
    horarios = require('../json/'+params.ciaID+'/horarios/'+params.linha+'.json');
    dadosItinerario = require('../json/'+params.ciaID+'/itinerario/'+params.linha+'.json');
    var trip = horarios.trips[params.trajeto];
    dadosItinerario = dadosItinerario.filter(obj => obj[0] === trip.tripDesc);
    itinerario = dadosItinerario[0][3];
  }
  componentDidMount() {
    var map = L.map('map').setView([itinerario[0][1], itinerario[0][2]], 15);

    var stopbusicon = L.icon({
        className: 'stop-bus-marker',
        iconUrl: stopBusImg,
        iconSize: [35, 35]
    });
    console.log(itinerario);

    // var latlngs = [];

    itinerario.forEach(function(item){
      waypoints.push(L.latLng(item[1], item[2]));
      // latlngs.push([item[1], item[2]]);

      L.marker(
        [
          item[1],
          item[2]
        ], {icon: stopbusicon}
      ).addTo(map).bindPopup(item[3]);
    });

    L.tileLayer('https://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
        attribution: '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    }).addTo(map);
    
    // var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
    // zoom the map to the polyline
    // map.fitBounds(polyline.getBounds());

    var control = L.Routing.control({
      routeWhileDragging: false,
      draggableWaypoints: false,
      waypointMode: 'snap',
      show: true,
      addWaypoints: false,
      waypoints: waypoints,
      lineOptions: {
        styles: [{color: 'red', opacity: 0.6, weight: 6}]
      }
    }).addTo(map);

    control.hide();

    waypoints = [];


  }
  render() {
    const { classes } = this.props;
    return (
        <Paper className={classes.container} elevation={4}>
          <div className={classes.legend}>{horarios.routeName}: {horarios.trips[this.props.match.params.trajeto].tripDesc}</div>
          <div id="map" className={classes.map}></div>
        </Paper>
    );
  }
}
Trajeto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Trajeto);