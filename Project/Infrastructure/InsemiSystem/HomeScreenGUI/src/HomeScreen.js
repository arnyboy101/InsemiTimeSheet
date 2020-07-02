import React, {Component} from 'react';
import './HomeScreen.css';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId:0,
            data:[{place_holder:0}],
            placeholder:"",
            loaded:false,
            date_now:new Date()
        };
    }

    componentDidMount()
    {
        fetch("/users/api/")
        .then(response => {
            if(response.status > 400) {
                return this.setState(() => {
                    return {placeholder:"Something went wrong!"};
                });
            }
            return response.json();

        })

        .then(data => {
            this.setState(()=> {
                return {
                    data,
                    loaded: true
                };
            });

        });
        

        
    }
    
    render(){
        return(
            <div>

                <div className = "Settings">
                    <a href="/users/settings/" target="_parent"><button className="SettingsButton">Settings</button></a>
                </div>
                {this.state.data.map(userDetails => {
                    let f_name = userDetails.first_name;
                    let dateconv = (dateapi) => (new Date(dateapi))
                    let usertype = userDetails.user_type;
                    let datenow = new Date()




                    if(f_name != null)
                    {   
                       
                            return(
                                
                                <div className = "Greeting">
                                    {console.log(dateconv(userDetails.previous_login))}
                                    {console.log(datenow)}
                                    
                                    {((dateconv(userDetails.previous_login).getMonth()==this.state.date_now.getMonth()) && 
                                    (dateconv(userDetails.previous_login).getDate()==this.state.date_now.getDate()) && 
                                    (dateconv(userDetails.previous_login).getFullYear()==this.state.date_now.getFullYear()) && 
                                    (dateconv(userDetails.previous_login).getMinutes()==this.state.date_now.getMinutes()) && 
                                    (dateconv(userDetails.previous_login).getHours() == this.state.date_now.getHours()) && 
                                    ((dateconv(userDetails.previous_login).getSeconds() > this.state.date_now.getSeconds()-60) &&
                                    (dateconv(userDetails.previous_login).getSeconds() < this.state.date_now.getSeconds()+60)) &&
                                    (usertype=='Admin')
                                    )?
                                    
                                        <div>
                                            <h1> hi {f_name}! </h1>
                                            <p> Designation - {userDetails.user_type} </p>
                                       
                                        <a href="/calendar/" target="_parent"> <button className = "User" type="button">User Function</button></a>
                                        </div>
                                        :
                                        <div>
                                        </div>
                                    }
                                </div> 
                                
                                
                            );
                    }
                })}
                 

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