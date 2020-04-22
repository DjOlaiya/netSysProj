import React, { Component } from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Login from './Login';
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify";
var http = require('http');
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

      // setIP = async(stateChange) => {
        setIP = async(e) => {
         this.setState({username:e.target.value});
          await http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
          resp.on('data', function(ip) {
            document.cookie = ip
          });
          console.log("setIP -> document.cookie: " + document.cookie)
        }); 
        this.setState({init_ip: document.cookie})
      }

      // getIpAddress = async () => {
      //   const res = await http.get({ 'host': 'api.ipify.org', 'port': 80, 'path': '/' })
      //   if (res.ok) {
      //     const ip = await res.json()
      //     console.log("this is just ip:  "+ ip)
      //     this.setState({ init_ip: ip })
      //     console.log("this is initip:" + this.state.init_ip)
      //   }else{console.log("DID NOT WORK")}
      // }


      signUp = async(e) =>  {
        try {
          // this.getIpAddress()
            console.log("will state set"+this.state.init_ip)

            // this.setState({init_ip: document.cookie})
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
      
        }else {alert("this is not working")}
          
        }catch(err){
            return err.code
        }
    };
    render(){
        return (
            <div>
                <h1> REGISTER</h1>
                <h1>{this.state.init_ip}</h1>
                <h2> hello</h2>
                <MuiThemeProvider>
                    <div>
                        <AppBar title='Register'/>
                        <TextField 
                        variant = "outlined"
                         hintText = "Enter User Name" 
                         label = "Username"
                         onChange = {this.setIP}
                        />
                        <br/>
                         <TextField 
                         variant = "outlined"
                         hintText = "Enter email address" 
                         label = "email"
                         onChange = {(e) => this.setState({email:e.target.value})}
                        />
                        <br/>
                         <TextField 
                         variant = "outlined"
                         type = 'password'
                         hintText = "Enter password" 
                         label = "password"
                         onChange = {(e) => this.setState({password:e.target.value})}
                        />
                        <br></br>
                  
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