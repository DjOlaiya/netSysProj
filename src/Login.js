import React, {Component}from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import updatedb from './db/updateDB'
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
import * as uuid from "uuid";

const AWS = require('aws-sdk');
var http = require('http');
var https = require('https');
var userDetails = 'a';

class Login extends Component {
  constructor(props)
  {
    super(props);
    this.state = {username: "",
                  password: "",
                  ip: "",
                  region:"",
                  country: "",
                  ipid: null,
                  timestamp: null,
                ipvalue: null}
  }


  handleState = () => {
    this.setState({ipid:uuid.v1()});
    this.setState({timestamp:Date.now()})
    var url = 'http://blnl1fwqz1.execute-api.us-east-1.amazonaws.com/dev';
    // var urls = 'https://blnl1fwqz1.execute-api.us-east-1.amazonaws.com/dev';
    var that = this;
    const data= JSON.stringify({
      ipid: uuid.v1(),
      name: "blah",
      ip : document.cookie,
      region: 'region',
      country: 'country',
      timestamp: 'timestamp'
    })
    console.log(data)

    const options = {
      hostname: url,
      path: '/ipupdate',
      method: 'PUT',
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
      }
    }
    
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    req.on('error', error => {
      console.error(error)
    })
    req.write(data)
    req.end()
  }

  handleClick = async (event) => { 
    try {
      console.log(this.state.timestamp)
      console.log(this.state.ip)
      console.log(this.state.region)
      console.log(this.state.country)
      console.log(this.state.ipid)
      const res = 
      await Auth.signIn(this.state.username, this.state.password);
      this.props.handleLogin(res) ;
      console.log(res)
      console.log(document.cookie);
    }catch (err) {
        console.log(err)
        return err.code
      }
    };
  
//get the client ip location data
  IPgeo_handler = () => {
    var ip = document.cookie;
    var api_key = 'at_qIUZKL7SFb1owEqipEoN5zIHeULon';
    var api_url = 'https://geo.ipify.org/api/v1?';
    var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + ip;
    var that = this;

    const res =  http.get(url, function(response) {
        var str = '';
        response.on('data', function(chunk) { str += chunk; });
        response.on('end', function() {
          try{
            const parsedData = JSON.parse(str)
            that.setState({region:parsedData['region']})
            that.setState({country:parsedData['country']})
            that.setState({ipid:uuid.v1()})
            that.setState({timestamp:Date.now()})       
          } catch(e){
            console.error(e.message)
          }
            // console.log(str);  
           });
    }).end();
  }
wrapperFunc = (e) => {
  this.IPgeo_handler()
  setTimeout(()=>{this.handleClick()},3000)
}
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
                        //  onChange = {(e)=>this.getIpName_handler(e)}
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
                            {/* onClick = {this.handleState}> */}
                            {/* onClick = {this.ipid_handler}> */}
                              {/* onClick = {this.handleClick}> */}
                            Sign In     
                            </Button> 
                            <Button 
                            variant="contained"
                             style={style}
                             onClick = {() => this.props.handleView("signup")}>
                            {/* onClick = {()=>{this.handleupdate()}}> */}
                             {/* onClick = {this.IPgeo_handler}> */}
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
