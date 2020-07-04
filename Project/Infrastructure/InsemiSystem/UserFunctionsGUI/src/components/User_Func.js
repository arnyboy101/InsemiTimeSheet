import React, { Component } from "react";
import { render } from "react-dom";

class User_Func extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      
    };
  }


    render() {
        return (
            <div>
                <div>
                    <h1>User Functions Page</h1>
                </div>
                <div className = "User_Buttons">
                <a href="/users/register/" target="_parent"> <button className = "User_Create">Create User</button></a>
                <br/>
                <a href="/users/edit/" target="_parent"> <button className = "User_Edit">Edit User</button></a>
                <br/>
                <a href="/users/delete/" target="_parent"><button className = "User_Delete">Delete User</button></a> 
                </div>

                <div className = "Exit">
                    <a href="/home/" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
                </div>
            </div>
        );
    }
    }

    export default User_Func;

