import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/core/AppBar';
import TextField from 'material-ui/core/TextField';
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
        "password":this.state.password
        }
        axios.post(apiBaseUrl+'/register', payload)
       .then(function (response) {
         console.log(response);
         if(response.data.code == 200){
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
                <MuiThemeProvider>
                    <div>
                        {/* <AppBar title='Register'/> */}
                        <TextField 
                         hintText = "Enter  first name" 
                         floatingLabelText = "First Name"
                         onChange = {(event,newValue) => this.setState({firstName:newValue})}
                        />
                         <br/>
                        <TextField 
                           hintText = "Enter last name"
                           floatingLabelText = "Last Name"
                           onChange = {(event,newValue)=> this.setState({lastName:newValue})}
                        />
                        <br/>
                         <TextField 
                         hintText = "Enter email address" 
                         floatingLabelText = "email"
                         onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                         <TextField 
                         type = 'password'
                         hintText = "Enter password" 
                         floatingLabelText = "password"
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