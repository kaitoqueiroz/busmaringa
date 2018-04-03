import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  container: {
    padding: '20px',
    height: 'calc(100vh - 110px)',
    overflow: 'auto',
  },
  formControl: {
    width: '100%',
    margin: '15px 0px'
  },
  buttonContainer: {
    padding: '20px'
  },
  link: {
    textDecoration: 'none',
  },
});
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

var horarios = [];
var trajetos = [];

class Principal extends Component {
  constructor(props, data) {
    super(props);
    this.props.changeTitle('Consultar Horário');

    this.state = {
      ciaID: props.match.params.id,
      linha: '',
      trajeto: '',
    };
    this.ciaID = props.match.params.id;
    this.linhas = require('../json/'+this.ciaID+'/linhas.json');
  }
  handleLinhaChange = event => {
    horarios = require('../json/'+this.ciaID+'/horarios/'+event.target.value+'.json');
    trajetos = horarios.trips;
    this.setState({
      linha: event.target.value,
      trajeto: 0
    });
  };
  handleTrajetoChange = event => {
    this.setState({
      trajeto: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const buttonClasses = classes.button + ' main-menu-button';
    return (
      <Paper className={classes.container} elevation={4}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-multiple">Linha: </InputLabel>
            <Select
              value={this.state.linha}
              onChange={this.handleLinhaChange}
              input={<Input id="name-multiple" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 200,
                  },
                },
              }}
            >
              {this.linhas.map(linha => (
                <MenuItem
                  key={linha.id}
                  value={linha.id}>
                  {linha.nome}
                </MenuItem>
              ))}
            </Select>

          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-multiple">Trajeto: </InputLabel>
            <Select
              value={this.state.trajeto}
              onChange={this.handleTrajetoChange}
              input={<Input id="name-multiple" />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                    width: 200,
                  },
                },
              }}
            >
              {trajetos.map((trajeto, index) => {
                return (
                  <MenuItem
                    key={index}
                    value={index}
                  >
                    {trajeto.tripDesc}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <div className={classes.buttonContainer}>
            <Link to={'/app/horarios/'+this.state.ciaID+'/'+this.state.linha+'/'+this.state.trajeto} className={classes.link}>
              <Button disabled={!this.state.linha} variant="raised" color="primary" className={buttonClasses}>
              Consultar Horários &nbsp;
              <svg width="24" height="24" viewBox="0 0 24 24"><path fill="#fff" d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" /></svg>
              </Button>
            </Link>
          </div>
      </Paper>
    );
  }
}
Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Principal);