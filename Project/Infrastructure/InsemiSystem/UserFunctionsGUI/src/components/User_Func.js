import React, { Component } from "react";
import { render } from "react-dom";

const Button = (props) =>
  <button type="button" {...props} className={ props.className } />;

let change = false;
class User_Func extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
      
    };
  }



  UserChange() {

        change = true;   

        
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
                <Button className="User_Change" onClick={this.UserChange.bind(this)}><b>Change User Details</b></Button>
                <br/>
                <a href="/users/delete/" target="_parent"><button className = "User_Delete">Delete User</button></a> 
                </div>

                <div className = "Exit">
                    <a href="/home/" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
                </div>
                {(change?
                    <div>
                      <p>Edit fields required, leave others blank</p>
                      <div>
                          <p>First Name</p>
                          <textarea className="First_name"></textarea><br/>
                          <p>Last Name</p>
                          <textarea className="Last_name"></textarea><br/>
                          <p>Email ID</p>
                          <textarea className="Email"></textarea><br/>
                          <p>Rank</p>
                          <select className="User_type">
                              <option key="Admin">Admin</option>
                              <option key="MGR">Manager</option>
                              <option key="HR">HR</option>
                              <option key="Employee">Employee</option>
                          </select>
                      </div>
                        <button onclick="">Make Changes</button>
                      </div>
                    :
                    <div></div>
                    )}
            </div>
        );
    }
    }

    export default User_Func;

