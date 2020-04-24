import React, { Component } from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Login from './Login';
import Button  from '@material-ui/core/Button';
// import ButtonGroup  from '@material-ui/core/Button';
import { Auth } from "aws-amplify";
var http = require('http');
const axios = require('axios');
class Register extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            init_ip : null,
            email: "",
            password: "",
            isRegistered: false
        }
    }

  signUp = async(e) =>  {
    try 
    {
      console.log("will state set"+this.state.init_ip)
      if(this.state.init_ip != null)
      {
        await Auth.signUp({
          username : this.state.username,
          password : this.state.password,
          attributes: 
          {
            email: this.state.email,
            'custom:init_ip': this.state.init_ip
          }
        });
        alert("Congrats on Registration")
        this.setState({isRegistered: true})
      }
      else {alert("this is not working")}
    }
    catch(err){return err.code}
  };

//get client ip and store in document.cookie
  getIP = async () => 
  {
    await http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) 
    {
      resp.on('data', function(ip) 
      {
        document.cookie = ip
        console.log("my public ip is: " + ip)
      })
    })
  }
//store ip in state var.
  storeIP = () => 
  {
    this.setState({init_ip: document.cookie})
  }
//onChange get Ip addr though async call and set username
  getIpName_handler = (e) => {
    this.getIP()
    this.setState({username: e.target.value})
    console.log("doccooke"+ document.cookie)
  }
  //onChange set init_ip state and set user email.
  setIpEmail_handler = (e) => {
    this.storeIP()
    this.setState({email: e.target.value})
    console.log("my initip"+ this.state.init_ip)
  }

  render(){
    return (
      <div>
        <h1> REGISTER</h1>
        <MuiThemeProvider>
          <div>
            <AppBar title='Register'/>
            <TextField 
              variant = "outlined"
              hintText = "Enter User Name" 
              label = "Username"
              onChange = {(e)=>this.getIpName_handler(e)}
              //  onChange = {(e) => this.setState({username:e.target.value})}
            />
            <br/>
            <TextField 
              variant = "outlined"
              hintText = "Enter email address" 
              label = "email"
              //  onChange = {(e) => this.setState({email:e.target.value})}
              onChange = {(e) => this.setIpEmail_handler(e)}
            />
            <br/>
            <TextField 
              variant = "outlined"
              type = 'password'
              hintText = "Enter password" 
              label = "password"
              onChange = {(e) => this.setState({password:e.target.value})}
            />
            <br>
            </br>  
            <Button 
              variant="contained"
              style={style}
              onClick = {this.signUp}>
              Register
            </Button> 
            <br/>
            <Button 
              variant="contained"
              style={style}
              onClick = {() => this.props.handleView("login")}>
              Log in 
            </Button> 
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
const style = {margin:15}

export default Register