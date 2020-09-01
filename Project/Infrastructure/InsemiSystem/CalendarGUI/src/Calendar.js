import React, { useState, Component } from 'react';
import 'date-fns';
import  format  from "date-fns/format";
import "./App.css";
import startOfWeek from "date-fns/startOfWeek"
import addDays from 'date-fns/addDays';
import endOfWeek from 'date-fns/endOfWeek';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import isSameMonth from 'date-fns/isSameMonth';
import subMonths from 'date-fns/subMonths';
import addMonths from 'date-fns/addMonths';
import isSameDay from 'date-fns/isSameDay';
import toDate from 'date-fns/toDate';
import {Panel, Carousel} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import Cookies from 'js-cookie'

function MyApp() {
 
 
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );

}

let stopped = false;
class Calendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current_Month : new Date(),
      selected_Date : new Date(),
      data : [{place_holder:0}],
      choices : [{place_holder:0}],
      loaded : false,
      choices_loaded: false,
      employee_id: -1,
      temp_search:0,
      logged_in: localStorage.getItem('token')? true:false,
      temp_start_time:0,
      start_time:0,
      temp_end_time:0,
      end_time:0,
      temp_status:"",
      status:"",
      temp_remarks:"",
      remarks:""

    };
 }

 componentDidMount(){
  this.getAPIs();
  if(this.state.logged_in)
  {
    fetch('/users/current/', {
      headers: {
        Authorization: `JWT ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(json => {
        this.setState({ employee_id:json.employeeId });
      });
  }
 }



  
  
  


 renderHeader() {
  const dateFormat = "MMMM yyyy";

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={this.prevMonth}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{format(this.state.current_Month, dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={this.nextMonth}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
}

renderDays() {
  const dateFormat = "EEEE";
  const days = [];

  let startDate = startOfWeek(this.state.current_Month);

  for (let i = 0; i < 7; i++) {
    days.push(
      <div className="col col-center" key={i}>
        {format(addDays(startDate, i), dateFormat)}
      </div>
    );
  }

  return <div className="days row">{days}</div>;
}

renderCells() {
  const { current_Month, selected_Date } = this.state;
  const monthStart = startOfMonth(current_Month);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;
      days.push(
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selected_Date) ? "selected" : ""
          }`}
          key={day}
          onClick={() => this.onDateClick(toDate(cloneDay))}
          
        >
          <span className="number">{formattedDate}</span>
          <span className="bg">{formattedDate}</span>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="row" key={day}>
        {days}
      </div>
    );
    days = [];
  }
  return <div className="body">{rows}</div>;
}

idSearch = () => {
  this.setState({employee_id:this.state.temp_search})
}

idStore = (event) => {
  this.setState({temp_search:event.target.value})
}

handleStartTime = (event) => {
  this.setState({temp_start_time:event.target.value})
}

handleEndTime = (event) => {
  this.setState({temp_end_time:event.target.value})
}

handleStatus = (event) => {
  this.setState({temp_status:event.target.value})
}

handleRemarks = (event) => {
  this.setState({temp_remarks:event.target.value})
}

handleEntrySumbit = (event) => {
  event.preventDefault();
  
   this.setState(
      {
        start_time:this.state.temp_start_time + ':00.000000',
        end_time:this.state.temp_end_time+ ':00.000000',
        status:this.state.temp_status,
        remarks:this.state.temp_remarks
      }
    )
   stopped = true; 
}

handleData = () =>
{
let data2 = {
  employeeId:this.state.employee_id,
  Project_code:'0000',
  Date:  this.state.selected_Date,
  Opening_time:this.state.start_time,
  Closing_time:this.state.end_time,
  Total_hours:10,
  Status:this.state.status,
  Remarks:this.state.remarks
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

renderPane()
{
  const dateFormat = "dd/MM/yyyy";
  
  const formattedDate = format(this.state.selected_Date, dateFormat);
  



  return(
    <div>
      <div>
      <div>
          <span>Enter ID</span>
          <br/>
          <textarea className="IdSearch" onChange={this.idStore}></textarea>
          <button onClick={this.idSearch}>Submit!</button>
        </div>
      <Panel header="Activity Report" collapsible shaded>

        <div>
        <Carousel>
        {(this.state.data != null)?
        
        this.state.data.map(activity => {
          
          let date1 = (dateapi) => (new Date(dateapi))
          
          
          return(
                   <div className='Activites' key={activity.id}>
                      {((date1(activity.Date).getMonth() == this.state.selected_Date.getMonth()) && 
                      (date1(activity.Date).getDate() == this.state.selected_Date.getDate())&&
                      (date1(activity.Date).getFullYear() == this.state.selected_Date.getFullYear()) &&
                      (this.state.employee_id===activity.employeeId))? 
                      <p>{activity.Project} -  <br/> {activity.AddComments} </p>:<p></p>}  
                    
                  </div>
                  
            
             );
           
                      
        })
        :
        
          <div>
          </div>
      
      }
      </Carousel>
      </div>
        </Panel>
      </div>
      <div>
    <Panel header="Entry" collapsible shaded>
      <form onSubmit={this.handleEntrySumbit}>
      <table>
      <thead>
      <tr>
        <th>Project</th>
        <th>Starting Time</th>
        <th>Ending Time</th>

        <th>Status</th>
        <th>Remarks</th>
      </tr> 
      </thead>
      <tbody>
      <tr>
      <td>
      <input type="text"></input>
      </td>
      <td><input type="time" id="Start Time" onChange={this.handleStartTime}/></td>
      <td><input type="time" id="End Time" onChange={this.handleEndTime}/></td>
      
      <td><select className="Status" onChange={this.handleStatus}>
            <option key = "1" value="WFO">Work From Office</option>
            <option key = "2" value="WFH">Work From Home</option>
        </select></td>
      <td><textarea id = "Remarks" onChange={this.handleRemarks}></textarea></td>
      
      </tr>
      <tr>
      <td><input type="submit"></input></td>
      </tr>
      </tbody>
      </table>
      </form>
    </Panel>
  </div>
  {(stopped?
    <div className = 'SubConfirmation'>
    <p> 
      You are about to submit the following data - <br/> 
      {this.state.start_time} <br/> 
      to {this.state.end_time} <br/>
      Status - <br/> 
      {this.state.status} <br/> 
      Remarks - <br/>
      {this.state.remarks}
    </p> 
    <button onClick={this.handleData}>Send to Database!</button>
    </div>
    :
    <div></div>
    )}
    </div>
  );
}

 onDateClick = day => {
  this.setState({
    selected_Date: day
  });
  
  
  
};

getAPIs = () => {
  fetch('/timetracker/api/TimeTracker/allObjects/',{
    }).then(response => {
      if (response.status > 400) {
        return this.setState(() => {
          return { placeholder: "Something went wrong!" };
        });
      }
    return response.json();
    }).then(data => {
      this.setState(() => {
        return {
          data,
          loaded : true
        };
      });
    });

    fetch("/timetracker/api/Choices/")
        .then(response => {
          if (response.status > 400) {
            return this.setState(() => {
              return { placeholder: "Something went wrong!" };
            });
          }
          return response.json();
        })
        .then(choices => {
          this.setState(() => {
            return {
              choices,
              choices_loaded: true
            };
          });
        });
}

nextMonth = () => {
  this.setState({
    current_Month: addMonths(this.state.current_Month, 1)
  });
};

prevMonth = () => {
  this.setState({
    current_Month: subMonths(this.state.current_Month, 1)
  });
};


render() {
  return (
    <div className="calendar">
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderCells()}
      {this.renderPane()}
      
    </div>
  );
}

}

export default Calendar;
