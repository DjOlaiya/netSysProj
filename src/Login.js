import React, {Component}from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import UploadScreen from './WelcomeScreen';


class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {username: "",
                      password: ""}
    }


  

     handleClick = async (event) => {
      
        try {
          console.log(this.state)
          const res = 
          await Auth.signIn(this.state.username, this.state.password);
          this.props.handleLogin(res) ;
          console.log(res)

          // first three lines of this pulled from the ipifiy.org list of examples.
          // var http = require('http');
          // http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
          //   resp.on('data', function(ip) {
          //     console.log("this is IP: " + ip);
          //     // get previously-saved ip addresses
          //     var savedIPdata = document.cookie.replace(/(?:(?:^|.*;\s*)seenip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          //     // split into iterable thing
          //     console.log("savedIPdata: " + savedIPdata);
          //     var seenIPs = savedIPdata.split(',');
          //     console.log("seenIps: " + seenIPs);
          //     // create stickynote for future reference
          //     var newIP = true;
          //     // iterate over the previously-saved ip addresses
          //     for (var i = 0; i < seenIPs.length; i++) {
          //       // if we've seen our current ip, jot that down on the sticky
          //       if (ip == seenIPs[i]) {
          //          newIP = false;
          //          break;
          //       }
          //     }
          //     if (newIP) {
          //       document.cookie = "seenip="+ip+","+savedIPdata;
          //       var myip = ip
          //       return myip
          //     }
          //   });
          // }); 
          console.log(document.cookie);
        }catch (err) {
            console.log(err)
            return err.code
          }
        };
      
    render(){
        return(
            <div>
                <h1> LOGIN</h1>
                <MuiThemeProvider>
                    <div>
                        <AppBar title = 'Login'/>
                        <TextField 
                         variant = "outlined"
                         hintText = "Enter Username" 
                         label = "Username"
                         onChange = {(event) => this.setState({username:event.target.value})}
                        />
                         <br/>
                        <TextField 
                           variant="outlined"
                           type = "Password"
                           hintText = "Enter your Password"
                           label = "Password"
                           onChange = {(event)=> this.setState({password:event.target.value})}
                        />
                            <br/>
                            <Button 
                            variant="contained"
                             style={style}
                             onClick = {this.handleClick}>
                            Sign In     
                            </Button> 
                            <Button 
                            variant="contained"
                             style={style}
                             onClick = {() => this.props.handleView("signup")}>
                           Register   
                            </Button> 
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
const style = {margin: 15}

const useStyles = makeStyles({
    root: {
      height: "100%"
    },
    header: {
      marginBottom: "2rem"
    },
    action: {
      marginTop: "1rem"
    }
  });

export default Login;