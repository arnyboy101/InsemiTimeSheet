import React from 'react';
import Cookies from 'js-cookie'
const Button = (props) =>
  <button type="button" {...props} className={ props.className } />;

const formattedSeconds = (sec) => 
  ('0'+Math.floor(sec/3600)).slice(-2) +
  ':' +
  ('0'+ Math.floor(sec/60)%60 ).slice(-2) +
  ':' +
  ('0' + sec % 60).slice(-2)
  
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
            data:[{bruh:0}],
            placeholder:"",            
            loaded:false,
            runCount:0
        };
        this.incrementer = null;
    }

    onStopConfirmed = ()=>{
            let stop = confirm('Are you sure you want to submit?');
            if(stop==true){
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
    
      
      handleStopClick() {
        let stop = confirm("You are about to stop this project");
        if (stop==true){
        clearInterval(this.incrementer);
        
        this.setState({
          loggedtime:this.state.secondsElapsed,
        
          lastClearedIncrementer: this.incrementer,
          secondsElapsed: 0
        });

        stopped = true;   

        }
      }

    logged_time_checker(){
      console.log(this.state.loggedtime)
    }
      

     HandleSubmit = (event) => {
      
        event.preventDefault();
        if(confirm("You are selecting " + this.state.drop_down_value + " Project")){
          console.log('are you evem workuvnjkvn');
        this.setState({user_Selection:this.state.drop_down_value, add_Comments:this.state.comments_value});
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          })
        , 1000);
        }
      }
    HandleDropDown = (event) => {
        this.setState({drop_down_value: event.target.value});
      }
     HandleComments = (event) => {
       this.setState({comments_value:event.target.value})
     }

     //I'm not changing any actual code, just adding comments to test workflow
     //Same thing again
     //Here we go again!

     render(){
         return(
    <div className = 'AppBoi'>
        <div className="stopwatch">
            <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
           
            <Button className="btn stop-btn" onClick={this.handleStopClick.bind(this)}><b>STOP</b></Button>
        
           
            
            
                       
        </div>
        <div className="TTForm">
                <div className='TTFORMDATA'>
                    <form onSubmit={this.HandleSubmit}>
                    
                        <span>Select Your Project:</span>
                        
                        {this.state.data.map(choiceList => {
                            let choices1 = choiceList.choices;
                            if (choices1!=null)
                            {
                                choices1 = choices1.slice(1,-1).split(",");
                                const items = []

                                for (const [index, value] of choices1.entries()) {
                                  items.push(<option key={index} value={value}>{value}</option>);
                                }
                                return (
                                    
                                        <div className="options">
                                            <select className="DropDownBox" onChange={this.HandleDropDown}>
                                            {items}
                                            </select>
                                        </div>
                                    )
                            }
                        })}
                                
                        
                            
                        
                        <br/>
                        <span>Additional Comments</span>
                        <br/>
                        <textarea className="AddCommentsBox" onChange={this.HandleComments}></textarea>
                        <br/>
                        <button type='submit' className="Database Tracking">Start Tracking</button>
                        
                    </form>
                    </div>
                    {(stopped?
                    <div className = 'SubConfirmation'>
                      <p>Submit - </p>
                      <p>Project - {this.state.user_Selection}</p>
                      <p>Additional Comments - {this.state.add_Comments}</p>
                    <p>Logged Time - {formattedSeconds(this.state.loggedtime)}</p>
                    <Button onClick={this.onStopConfirmed} className="Send">Send to Database</Button>
                    </div>
                    :
                    <div></div>
                    )}
            </div>
    </div>
         );
     }
      

}

export default HomeScreen;