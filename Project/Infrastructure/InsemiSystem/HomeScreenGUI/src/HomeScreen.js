import React, {Component} from 'react';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId:0
        };
    }
    
    render(){
        return(
            <div>

                <div className = "Settings">
                    <a href="/users/settings/" target="_parent"><button className="SettingsButton">Settings</button></a>
                </div>

                <div>
                    <h1>Hello!</h1>
                </div>

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