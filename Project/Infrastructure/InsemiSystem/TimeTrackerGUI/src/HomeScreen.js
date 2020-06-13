import React from 'react';
const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;

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
            confirm('Are you sure you want to submit?');
            let data2 = {
                employeeId:0,
                Project:this.state.user_Selection,
                AddComments:this.state.add_Comments,
                logged_time:this.state.loggedtime
            };
            fetch('/timetracker/api/TimeTracker/allObjects/',{
                method: 'POST',
                headers:{'Content-type':'application/json'},
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
        confirm("You are about to stop this project");
        clearInterval(this.incrementer);
        
        this.setState({
          loggedtime:this.state.secondsElapsed,
        
          lastClearedIncrementer: this.incrementer,
          secondsElapsed: 0
        });

        stopped = true;   

      }

    logged_time_checker(){
      console.log(this.state.loggedtime)
    }
      

     HandleSubmit = (event) => {
        event.preventDefault();
        confirm("You are selecting " + this.state.drop_down_value + " Project");
        this.setState({user_Selection:this.state.drop_down_value, add_Comments:this.state.comments_value});
        this.incrementer = setInterval( () =>
          this.setState({
            secondsElapsed: this.state.secondsElapsed + 1
          })
        , 1000);
      }
    HandleDropDown = (event) => {
        this.setState({drop_down_value: event.target.value});
      }
     HandleComments = (event) => {
       this.setState({comments_value:event.target.value})
     }

     render(){
         return(
    <div>
        <div className="stopwatch">
            <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
           
            <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}><b>STOP</b></Button>
        
           
            
            
                       
        </div>
        <div className="TTForm">
            <h1 className = "TTHeading">Hello!</h1>
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
                                        <div>
                                            <select className="DropDownBox" onChange={this.HandleDropDown}>
                                            {items}
                                            </select>
                                        </div>
                                    )
                            }
                        })}
                                
                        
                            
                        
                        <br/>
                        <span>Additional Comments</span>
                        <textarea className="AddCommentsBox" onChange={this.HandleComments}></textarea>
                        <input type='submit' />
                        
                    </form>
                    </div>
                    {(stopped?
                    <div className = 'SubConfirmation'>
                      <p>Submit - </p>
                      <p>Project - {this.state.user_Selection}</p>
                      <p>Additional Comments - {this.state.add_Comments}</p>
                    <p>Logged Time - {formattedSeconds(this.state.loggedtime)}</p>
                    <button onClick={this.onStopConfirmed}>Send to Database</button>
                    </div>
                    :
                    <div></div>
                    )}
                
                <span>Officially Logged Time : {this.state.loggedtime}</span>
                <br></br>
                
                <span>Officially Logged Time 2: {this.state.loggedtime2}</span>
                <br></br>
                <span>Current Project: {this.state.user_Selection} and AddComents: {this.state.add_Comments}</span>
                <br></br>
                <span>Current Project: {this.state.drop_down_value} and AddComents: {this.state.comments_value}</span>
            </div>
    </div>
         );
     }
      

}

export default HomeScreen;