import React from 'react';
import Cookies from 'js-cookie'
const Button = (props) =>
  <button type="button" {...props} className={ props.className } />;
const formattedSeconds = (sec) => 
  ('0'+Math.floor(sec/3600)).slice(-2) +
  ':' +
  ('0'+ Math.floor(sec/60)%60).slice(-2) +
  ':' +
  ('0' + sec%60).slice(-2)
let stopped = false;  
class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            secondsElapsed :0,
            lastClearedIncrementer: null,
            user_Selection:"",
            drop_down_value:"",
            add_Comments:"",
            comments_value:"",
            loggedtime:0,
            loggedtime2:0,
            data:[{place_holder:0}],
            placeholder:"",            
            loaded:false,
            runCount:0
        };
        this.incrementer = null;
    }
    //Send to Database Button 
    onStopConfirmed = ()=>{
            let stop = confirm('Are you sure you want to submit?');
            //If the user clicks OK
            if(stop==true){
              //Posts the data into the database in the below format
            let data2 = {
                employeeId:0,
                Project:this.state.user_Selection,
                AddComments:this.state.add_Comments,
                logged_time:this.state.loggedtime
            };
            let csrftoken = Cookies.get('csrftoken');
            fetch('/timetracker/api/TimeTracker/allObjects/',{
                method: 'POST',
                headers:{'Content-type':'application/json','X-CSRFToken':csrftoken},
                body:JSON.stringify(data2)
            }).then(response => {
                if (response.status > 400) {
                  return this.setState(() => {
                    return { placeholder: "Something went wrong!" };
                  });
                }
                return response.json();
              })
            }
        }
    //Fetches choices - Parsing by HLU needs to be implemented   
    componentDidMount() {
        fetch("/timetracker/api/Choices/")
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
        console.log("Data - "+this.state.data);
    }
      //Handles STOP button
      handleStopClick() {
        let stop = confirm("You are about to stop this project");
        if (stop==true){
        clearInterval(this.incrementer);
        this.setState({
          loggedtime:this.state.secondsElapsed,
          lastClearedIncrementer: this.incrementer,
          secondsElapsed: 0
        });
        //Activates Send Database Panel
        stopped = true;   
        }
      }
      //Handles the 'Start Tracking' button
     HandleSubmit = (event) => {
        event.preventDefault();
        if(confirm("You are selecting " + this.state.drop_down_value + " Project")){
        this.setState({user_Selection:this.state.drop_down_value, add_Comments:this.state.comments_value});
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          })
        , 1000);
        }
      }
    //Detects change in state of drop-down, temporary storage + editable
    HandleDropDown = (event) => {
        this.setState({drop_down_value: event.target.value});
      }
    ////Detects change in state of additional comments, temporary storage + editable
     HandleComments = (event) => {
       this.setState({comments_value:event.target.value})
     }
     UserChange() {
        let stop = confirm("You are about to stop this project");
        stopped = true;  
        console.log(stopped) 
        
  }
     render(){
         return(
    <div className = 'Random'>
        <div className = 'UserFuncButtons'>
        <div>
            <h1>User Functions Page</h1>
        </div>
        <div className = "User_Buttons">
        <a href="/users/register/" target="_parent"> <button className = "User_Create">Create User</button></a>
        <br/>
        <Button className="User_Change" onClick={this.UserChange.bind(this)}><b>Change User Details</b></Button>
        <br/>
        <a href="/users/delete/" target="_parent"><button className = "User_Delete">Delete User</button></a> 

          <div className = "Exit">
              <a href="/home/" target="_parent"> <button className = "Exit">Go back to homescreen</button></a>
          </div>
        
                    {
                      //Displays send to database only if 'stopped has been set to true'
                    }
                    {(stopped?
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
    </div>
    </div>
         );
     }
}
export default HomeScreen;