import React, {Component} from "react";
import Login from "./Login";
import WelcomeScreen from "./WelcomeScreen";
import Register from "./Register";

class Authentication extends Component {
    state = { view: "login"}

  handleView = (e) => {
    this.setState({view:e})
  }
    
render(){
    return(
        <div>
            {this.state.view === "login" ? <Login 
            handleLogin = {this.props.handleLogin} handleView = {this.handleView}/> : 
            <Register handleLogin = {this.props.handleLogin} handleView = {this.handleView}/> }
        </div>
    )
}
}
export default Authentication ;