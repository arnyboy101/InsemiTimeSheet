import React, { Component } from "react";
import { render } from "react-dom";

class Full_Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("/users/fullnameChange/")
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
                <h1>Name Change Page</h1>
            </div>
            <div className = "Change_Name">
                <label for="Original">Original Full Name:</label><br>
                <input type="text" id="Original" name="Original"><br>
                <label for="Changed">Changed Full Name:</label><br>
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

