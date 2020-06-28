import React, {Component} from 'react';
import './HomeScreen.css';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeId:0,
            data:[{place_holder:0}],
            placeholder:"",
            loaded:false
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
                    
                    let datenow = new Date()




                    if(f_name != null)
                    {   
                       
                            return(
                                <div className = "Greeting">
                                    {console.log(dateconv(userDetails.previous_login))}
                                    {console.log(datenow)}
                                    {((dateconv(userDetails.previous_login).getMonth()==datenow.getMonth()) && 
                                    (dateconv(userDetails.previous_login).getDate()==datenow.getDate()) && 
                                    (dateconv(userDetails.previous_login).getFullYear()==datenow.getFullYear()) && 
                                    (dateconv(userDetails.previous_login).getMinutes()==datenow.getMinutes()) && 
                                    (dateconv(userDetails.previous_login).getHours() == datenow.getHours()) && 
                                    ((dateconv(userDetails.previous_login).getSeconds() > datenow.getSeconds()-60) && 
                                    
                                    (dateconv(userDetails.previous_login).getSeconds() < datenow.getSeconds()+60)
                                    
                                    ))?
                                        <div>
                                            <h1> Hello {f_name}! </h1>
                                            <p> Designation - {userDetails.user_type} </p>
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