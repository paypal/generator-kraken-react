import React, { PropTypes } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './Header';

const requestURI = require('../../config/config.json').requestURI;

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941

if (typeof window !== 'undefined') {
    injectTapEventPlugin();
}


const Layout = props => {  
  const muiTheme = getMuiTheme(lightBaseTheme, {
    userAgent: navigator.userAgent
  });
  
  return (
    <html lang="en">
      <head>
        <title>Todo App</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet" />
      </head>
      <body style={styles.container}>
          <MuiThemeProvider muiTheme={muiTheme}>
            <div>
              <Header
                title="Task Keeper"
              />
              {
                React.cloneElement(props.children, { ...props })
              }
            </div>
          </MuiThemeProvider>
        <script src="bundle.js" />
      </body>
    </html>
  )
}

const styles = {
  container: {
    fontFamily: 'Roboto, sans-serif',
    padding: 0,
    margin: 0
  }
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout;
