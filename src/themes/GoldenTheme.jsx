import React, { PureComponent } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffd700',
      dark: '#daa520',
      contrastText: '#000000',
    },
  },
});

class GoldenTheme extends PureComponent {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}

export default GoldenTheme;