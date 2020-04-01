import React, { Component } from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:4000/api/";
        console.log("values",this.state.firstName,this.state.lastName,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload={
        "firstName": this.state.firstName,
        "lastName":this.state.lastName,
        "email":this.state.email,
        }
        axios.post(apiBaseUrl+'/register', payload)
       .then(function (response) {
         console.log(response);
         if(response.data.code === 200){
          //  console.log("registration successfull");
           var loginscreen=[];
           loginscreen.push(<Login parentContext={this}/>);
           var loginmessage = "Not Registered yet.Go to registration";
           self.props.parentContext.setState({loginscreen:loginscreen,
           loginmessage:loginmessage,
           buttonLabel:"Register",
           isLogin:true
            });
         }
       })
       .catch(function (error) {
         console.log(error);
       });
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
                         hintText = "Enter  first name" 
                         label = "First Name"
                         onChange = {(event,newValue) => this.setState({firstName:newValue})}
                        />
                         <br/>
                        <TextField 
                           variant = "outlined"
                           hintText = "Enter last name"
                           label = "Last Name"
                           onChange = {(event,newValue)=> this.setState({lastName:newValue})}
                        />
                        <br/>
                         <TextField 
                         variant = "outlined"
                         hintText = "Enter email address" 
                         label = "email"
                         onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                         <TextField 
                         variant = "outlined"
                         type = 'password'
                         hintText = "Enter password" 
                         label = "password"
                         onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}
const style = {margin:15}

export default Register