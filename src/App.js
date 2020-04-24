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
require('dotenv').config()
console.log(process.env)

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
      initIp: null
    }
  }

  handleLogin = (e) => {
    this.setState({userSession: e, isAuth: true})
  }
  handleLogout = () => { this.setState({isAuth: false})}

  render() {
    return (
      <div className="App">
        {this.state.isAuth ? <WelcomeScreen/> : <Authentication handleLogin = {this.handleLogin} init_ip={this.state.initIp}/>}
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;
