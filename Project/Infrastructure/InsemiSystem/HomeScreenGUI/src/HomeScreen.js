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
                    <button className="SettingsButton">Settings</button>
                </div>

                <div>
                    <h1>Hello!</h1>
                </div>

                <div className = "Menu">
                <a href="/calendar/" target="_parent"> <button className = "Calendar" type="button">View Calendar</button></a>
                    <button className = "TimeTracker">Enter TimeTracker</button>
                    <button className = "Export">Export Files</button>
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