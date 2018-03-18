import React, { Component } from 'react';
import MainBody from './content/MainBody.jsx'
import MainMenu from './menu/MainMenu.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import 'typeface-roboto';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={MainMenu}/>
          <Route path="/app" component={MainBody}/>
        </div>
      </Router>
    );
  }
}

export default App;