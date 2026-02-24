import React from 'react';
import Cookies from 'js-cookie'
const Button = (props) =>
  <button type="button" {...props} className={ props.className } />;

class User_Func extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            change: false,
            delete: false
        };
        this.incrementer = null;
    }
    
    UserChangeButton() {
        this.setState({change: true}); 
        this.setState({delete: false}); 
        
    }
    UserDeleteButton() {
        this.setState({delete: true}); 
        this.setState({change: false});
        
    }
    UserDelete() {
        this.setState({delete: false}); 
        this.setState({change: false}); 
        
    }
    UserChange() {
        this.setState({change: false}); 
        this.setState({delete: false}); 
        
    }



     render(){
         return(
    <div className = 'UserFuncButtons'>
        <div>
            <h1>User Functions Page</h1>
        </div>
        <div className = "User_Buttons">
        <a href="/users/register/" target="_parent"> <button className = "User_Create">Create User</button></a>
        <br/>
        <Button className="User_Change" onClick={this.UserChangeButton.bind(this)}>Change User Details</Button>
        <br/>
        <Button className="User_Delete" onClick={this.UserDeleteButton.bind(this)}>Delete User</Button> 

          <div className = "Exit">
              <a href="/home/" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
          </div>
                    {(this.state.change?
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
                  <Button className="Make_Changes" onClick={this.UserChange.bind(this)}>Make Changes</Button>
                </div>
                    :
                    <div></div>
                    )}
                    {(this.state.delete?
                    <div>
                        <p>Search for Employee by ID</p>
                        <input type="number"></input>
                        <button onClick="">Search</button>
                        <br/>
                        <Button className="Delete" onClick={this.UserDelete.bind(this)}>Delete from Database</Button>
                    </div>
                    :
                    <div></div>
                    )}
            </div>
    </div>
         );
     }
}
export default User_Func;