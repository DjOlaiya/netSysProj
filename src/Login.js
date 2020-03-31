import React, {Component}from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import UploadScreen from './UploadScreen';

class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state = {username: "",
                      password: ""}
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:4000/api/";
        var self = this;
        var payload={
        "email":this.state.username,
        "password":this.state.password
        }
        axios.post(apiBaseUrl+'login', payload)
        .then(function (response) {
        console.log(response);
        if(response.data.code == 200){
        console.log("Login successfull");
        var uploadScreen=[];
        uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
        self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        } //I dont understand what's happening in upload screen is it recursive?
        else if(response.data.code == 204){
        console.log("Username password do not match");
        alert("username password do not match")
        }
        else{
        console.log("Username does not exists");
        alert("Username does not exist");
        }
        })
        .catch(function (error) {
        console.log(error);
        });
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
                         onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                         <br/>
                        <TextField 
                           variant="outlined"
                           type = "Password"
                           hintText = "Enter your Password"
                           label = "Password"
                           onChange = {(event,newValue)=> this.setState({password:newValue})}
                        />
                            <br/>
                            <Button 
                            variant="contained"
                             style={style}
                             onClick = {(event)=> this.handleClick(event)}>
                            Sign In     
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