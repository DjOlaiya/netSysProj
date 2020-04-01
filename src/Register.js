import React, { Component } from 'react';
import {ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Login from './Login';
import Button from '@material-ui/core/Button';
import { Auth } from "aws-amplify";

class Register extends Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isRegistered: false
        }
    }

      signUp = async(e) =>  {
        
        try {
            console.log(this.state)
            // console.log(e)
          const res = await Auth.signUp({
            username : this.state.username,
            password : this.state.password,
            attributes: 
            {
              email: this.state.email,
              family_name: this.state.lastName,
              name: this.state.firstName
            }
          });
          alert("Congrats on Registration")
          this.setState({isRegistered: true})
        }catch(err){
            return err.code
        }
    };
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
                         onChange = {(e) => this.setState({username:e.target.value})}
                        />
                        <br/>
                        <TextField 
                        variant = "outlined"
                         hintText = "Enter  first name" 
                         label = "First Name"
                         onChange = {(e) => this.setState({firstName:e.target.value})}
                        />
                         <br/>
                        <TextField 
                           variant = "outlined"
                           hintText = "Enter last name"
                           label = "Last Name"
                           onChange = {(e)=> this.setState({lastName:e.target.value})}
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