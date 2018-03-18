import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Principal from './../principal/Principal.jsx';
import MenuAppBar from './../menu/MenuAppBar.jsx';
import Horarios from './../horarios/Horarios.jsx';
import Itinerario from './../itinerario/Itinerario.jsx';

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }
  handleChangeTitle = (title) => {
    this.setState({title: title});
  }
  render() {
    return(
      <div>
        <Router>
          <div>
            <Route render={(props) => (
              <MenuAppBar {...props} data={this.state}/>
            )}/>
            <Route path="/app/principal/:id" render={(props) => (
              <Principal {...props} changeTitle={this.handleChangeTitle}/>
            )}/>
            <Route path="/app/horarios/:ciaID/:linha/:trajeto" render={(props) => (
              <Horarios {...props} changeTitle={this.handleChangeTitle}/>
            )}/>
            <Route path="/app/itinerario/:ciaID/:linha/:trajeto" render={(props) => (
              <Itinerario {...props} changeTitle={this.handleChangeTitle}/>
            )}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default MainBody;