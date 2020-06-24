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
                <div>
                    <button>Settings</button>
                </div>
                <div>
                    <h1>Hello!</h1>
                </div>

                <div>
                    <button>View Calendar</button>
                    <button>Enter TimeTracker</button>
                    <button>Export Files</button>
                </div>
            </div>
        );
    }
}

export default HomeScreen;