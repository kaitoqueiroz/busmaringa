import React, { PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#40B540',
      dark: '#30A14C',
      contrastText: '#FFFFFF',
    },
  },
});

class GreenTheme extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default GreenTheme;