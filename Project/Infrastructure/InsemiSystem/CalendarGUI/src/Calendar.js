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
import {Panel} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

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


class Calendar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current_Month : new Date(),
      selected_Date : new Date(),
      data : [{place_holder:0}],
      loaded : false,
      employee_id: -1,
      temp_search:0,
      logged_in: localStorage.getItem('token')? true:false
    };
 }

 componentDidMount(){
  this.getAPI();
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
        

        {this.state.data.map(activity => {
          
          let date1 = (dateapi) => (new Date(dateapi))
          
          
          return(
                 <div className='Activites' key={activity.id}>
                    {
                      //((date1(activity.Opening_time).getMonth() == this.state.selected_Date.getMonth()) && 
                      //(date1(activity.Opening_time).getDate() == this.state.selected_Date.getDate()) &&
                      //(date1(activity.Opening_time).getFullYear() == this.state.selected_Date.getFullYear()) &&
                      //(date1(activity.Closing_time).getMonth() == this.state.selected_Date.getMonth()) && 
                      //(date1(activity.Closing_time).getDate() == this.state.selected_Date.getDate()) &&
                      //(date1(activity.Closing_time).getFullYear() == this.state.selected_Date.getFullYear()) &&
                      //(this.state.employee_id==activity.employeeId)) ?
                      //<div><p>{activity.Project_code}</p><p>{activity.Status}</p><p>{activity.Remarks}</p></div>
                      //: <p>bruh</p>
                      <p>hello let this work plz</p>
                     }
                  </div>
                  
            
             ); 
        })}
        </Panel>
      </div>
    </div>
  );
}

 onDateClick = day => {
  this.setState({
    selected_Date: day
  });
  
  
  
};

getAPI = () => {
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
