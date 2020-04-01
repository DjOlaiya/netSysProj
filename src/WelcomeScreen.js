import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Login from './Login';
import Register from './Register';
import { Auth } from "aws-amplify";
class WelcomeScreen extends Component 
{

    signout = async() => {
        try {
            Auth.signOut();
            console.log("Success Signout")
          } catch (err) {
            console.log(err);
          }
    }
    render() {
        return (
          <div className="welcomescreen">
              <h1> Congrats on logging in</h1>
              <Button 
                            variant="contained"
                             style={style}
                             onClick = {this.signout}>
                           Sign Out  
                            </Button> 
          </div>
        );
    }
}

const style = {margin:15}
export default WelcomeScreen


