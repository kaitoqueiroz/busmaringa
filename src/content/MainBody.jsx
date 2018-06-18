import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Headroom from 'react-headroom';
import Principal from './../principal/Principal.jsx';
import MenuAppBar from './../menu/MenuAppBar.jsx';
import Horarios from './../horarios/Horarios.jsx';
import Itinerario from './../itinerario/Itinerario.jsx';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-58340218-1');
ReactGA.pageview(window.location.pathname + window.location.search);

function renderSpiderAd(){

  var element = document.getElementById('root');
  var script = document.createElement('script');
  script.setAttribute('src','https://carnage1301.spider.ad?id=57452');

  element.appendChild(script);
}
renderSpiderAd();

class MainBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }
  handleChangeTitle = (title) => {
    this.setState({title: title});

    renderSpiderAd();

    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  render() {
    return(
      <div>
        <Router basename={process.env.PUBLIC_URL}>
          <div>
            <Route render={(props) => (
              <Headroom>
                <MenuAppBar {...props} data={this.state}/>
              </Headroom>
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