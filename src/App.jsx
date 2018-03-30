import React, { Component } from 'react';
import MainBody from './content/MainBody.jsx'
import MainMenu from './menu/MainMenu.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import 'typeface-roboto';

const styles = {
  alignCenter: {
    textAlign: 'center',
  },
};

class App extends Component {
  render() {
    const {classes} = this.props;
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className={classes.alignCenter}>
          <Route exact path="/" component={MainMenu}/>
          <Route path="/app" component={MainBody}/>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);