import './App.css';
import Login from './Login'
import React, { Component, useEffect } from 'react';
import { StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Routes from "./Routes";
import Amplify from "aws-amplify";
import config from "./configCognito";
import Authentication from "./Authentication";
import WelcomeScreen from "./WelcomeScreen";
console.log(process.env.REACT_APP_API_GATEWAY)

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      userSession: null,
      isAuth: false,
      signedOut: false,
      storedIPs: Array(10).fill(null)
    }
  }

  handleLogin = (e) => {
    this.setState({userSession: e, isAuth: true})
  
  }
  handleLogout = () => { this.setState({isAuth: false})}

  // storeIp = () => {
  //    // first three lines of this pulled from the ipifiy.org list of examples.
  //    var http = require('http');
  //    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  //      resp.on('data', function(ip) {
  //        // get previously-saved ip addresses
  //        var savedIPdata = document.cookie.replace(/(?:(?:^|.*;\s*)seenip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  //        // split into iterable thing
  //        var seenIPs = savedIPdata.split(',');
  //        console.log("seenIps: " + seenIPs);
  //        // create stickynote for future reference
  //        var newIP = true;
  //        // iterate over the previously-saved ip addresses
  //        for (var i = 0; i < seenIPs.length; i++) {
  //          // if we've seen our current ip, jot that down on the sticky
  //          if (ip == seenIPs[i]) {
  //             newIP = false;
  //             break;
  //          }
  //        }
  //        if (newIP) {
  //          document.cookie = ip;
  //        }
  //      });
  //    });
  // }
  render() {
    // {this.state.isAuth ? <WelcomeScreen/> : <Authentication handleLogin = {this.handleLogin}/>}
    return (
      <div className="App">
        {this.state.isAuth ? <WelcomeScreen/> : <Authentication handleLogin = {this.handleLogin}/>}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
