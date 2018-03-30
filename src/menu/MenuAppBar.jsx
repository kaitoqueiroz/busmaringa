import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ItemMenuAppBar from './ItemMenuAppBar.jsx';
import Slider from './../animations/Slider.jsx';
import itensMenu from './ItensMenu.json';

const styles = {
  flex: {
    flex: 1,
  },
  menuButton: {
    marginRight: -20,
    display: 'none'
  },
  backButton: {
    marginLeft: -20,
    position: 'absolute'
  },
};

class MenuAppBar extends Component {
  state = {
    open: false
  }

  getMenus() {
    return itensMenu.map(this.getMenu);
  }

  getMenu(item) {
    return (
      <ItemMenuAppBar key={item.nomeMenu} nomeMenu={item.nomeMenu} route={item.route}/>
    );
  }

  handleMenuToggle = () => {
    this.setMenuOpen(!this.state.open);
  }

  closeMenu = () => {
    this.setMenuOpen(false);
  }

  setMenuOpen = (isOpen) => {
    this.setState({open: isOpen});
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.backButton} color="inherit" aria-label="Back" onClick={this.props.history.goBack}>
              <ChevronLeftIcon/>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {this.props.data.title}
            </Typography>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleMenuToggle}>
              <MenuIcon/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Slider isOpen={this.state.open}>
          {this.getMenus()}
        </Slider>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);