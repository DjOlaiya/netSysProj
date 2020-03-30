import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Button from 'material-ui/core/Button';
import Login from './Login';
import Register from './Register';

class LoginScreen extends Component 
{
    constructor(props){
        super(props);
        this.setState = {
            username:'',
            password:'',
            loginscreen:[],
            loginmessage:'',
            buttonLabel:'Register',
            isLogin:true
        }
    }
    componentWillMount(){
        //dont understand this part. So we are passing loginscreen as parent context prop and app.js as appcontext prop
        var loginscreen=[];
        loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>)
        var loginmessage = "Not registered yet, Please Register"
        this.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage,
        })
    }

    //this is how we switch from login to register screen. could be done using route
    handleClick(event){
        // console.log("event",event);
        var loginmessage;
        if(this.state.isLogin){
          var loginscreen=[];
          loginscreen.push(<Register parentContext={this}/>);
          loginmessage = "Already registered. Go to Login";
          this.setState({
                         loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Login",
                         isLogin:false
                       })
        }
        else{
          var loginscreen=[];
          loginscreen.push(<Login parentContext={this}/>);
          loginmessage = "Not Registered yet.Go to registration";
          this.setState({
                         loginscreen:loginscreen,
                         loginmessage:loginmessage,
                         buttonLabel:"Register",
                         isLogin:true
                       })
        }
    }


    render() {
        return (
          <div className="loginscreen">
            {this.state.loginscreen}
            <div>
              {this.state.loginmessage}
              <MuiThemeProvider>
                <div>
                {/* <Button 
                    label={this.state.buttonLabel} 
                    primary={true} 
                    style={style} 
                    onClick={(event) => this.handleClick(event)}/> */}
               </div>
              </MuiThemeProvider>
            </div>
          </div>
        );
    }
}

const style = {margin:15}
export default LoginScreen


