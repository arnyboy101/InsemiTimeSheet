import React, { Component } from "react";
import { render } from "react-dom";

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("/users/passwordChange/")
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
                <h1>Password Change Page</h1>
            </div>
            <div className = "Change_Password">
                <label for="Original">Original Password:</label><br>
                <input type="text" id="Original" name="Original"><br>
                <label for="Changed">Changed Password:</label><br>
                <input type="text" id="Changed" name="Changed">
                <a><button className = "Submit">Submit</button></a> 
            </div>
            <div className = "Exit">
                <a href="/home/settings" target="_parent"> <button className = "Exit">Go back to Settings</button></a>
            </div>
        </div>
    );
  }
}

export default Settings;

