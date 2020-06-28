import React, { Component } from "react";
import { render } from "react-dom";
import Full_Name from "Full_Name";
import Password from "Password";
import Phone from "Phone";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      Full_Name: false,
      Phone: false,
      Password: false,

    };
  }

  componentDidMount() {
    fetch("/users/settings/")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

   render() {
    return (
        <div>
            <div>
                <h1>SETTINGS PAGE</h1>
            </div>
            <div className = "Menu">
                <a> <button className = "Password" onClick >Change Password</button></a>
                <br/>
                <a> <button className = "First_Name">Change Full Name</button></a>
                <br/>
                <a><button className = "Last_Name">Change Phone Number</button></a> 
            </div>
            <div className = "Exit">
                <a href="/home" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
            </div>
        </div>
    );
  }
}

export default Settings;

