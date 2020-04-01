import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/core/styles/MuiThemeProvider';
import Login from './Login';
import Register from './Register';

class WelcomeScreen extends Component 
{
    render() {
        return (
          <div className="welcomescreen">
              <h1> Congrats on logging in</h1>
          </div>
        );
    }
}

const style = {margin:15}
export default WelcomeScreen


