import React, { Component } from "react";
import { render } from "react-dom";
import Full_Name from "./Full_Name";
import Password from "./Password";
import Phone from "./Phone";
let full_name_clicked =  false;
let password_clicked = false;
let phone_cliked = false;

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      
    };
  }

 

  fullNameClicked = () => {
    full_name_clicked = true;
  }

 passwordClicked = () => {
    password_clicked = true;
  }

  phoneNumClicked = () => {
    phone_cliked = true;
  }

   render() {
    return (
        <div>
            <div>
                <h1>SETTINGS PAGE</h1>
            </div>
            <div className = "Menu">
                 <button className = "Password" onClick = {this.passwordClicked}>Change Password</button>
                <br/>
                {password_clicked? <div> <Password/> <br/> </div> : <div></div>}
                
                
                 <button className = "Full_Name"  onClick = {this.fullNameClicked} >Change Full Name</button>
                <br/>
                {full_name_clicked? <div> <Full_Name/> <br/>  {console.log("hello!")} </div>: <div></div>}
                
                <button className = "Phone_Number" onClick = {this.phoneNumClicked}>Change Phone Number</button>
                {phone_cliked? <div> <Phone/> <br/> </div> : <div></div>}
            </div>

            <div className = "Exit">
                <a href="/home/" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
            </div>
        </div>
    );
  }
}

export default Settings;

