import React, {Component} from 'react';
import './HomeScreen.css';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId: -1,
            data:[{place_holder:0}],
            placeholder:"",
            loaded:false,
            logged_in: localStorage.getItem('token')? true:false
            
        };
    }
    componentDidMount()
    {
        if (this.state.logged_in) {
            fetch('/users/current/', {
              headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
              }
            })
              .then(res => res.json())
              .then(json => {
                this.setState({ data:json });
              });
          }
    }

        
    
    
    render(){
        return(
            <div>
                <div className = "Settings">
                    <a href="/users/settings/" target="_parent"><button className="SettingsButton">Settings</button></a>
                </div>
                { (this.state.data.first_name!=null)?
                    <h1>Hello {this.state.data.first_name}!</h1>:<div></div>
                }


                <div className = "Menu">
                <a href="/calendar/" target="_parent"> <button className = "Calendar" type="button">View Calendar</button></a>
                <br/>
                <a href="/ttgui/op/" target="_parent"> <button className = "TimeTracker">Enter TimeTracker</button></a>
                <br/>
                <a href="/export/" target="_parent"><button className = "Export">Export Files</button></a> 
                </div>
                <div className = "Notice">
                    {//Notice Board Goes Here
                    }
                </div>
            </div>
        );
    }
}
export default HomeScreen;