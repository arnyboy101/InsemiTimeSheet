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
      
    };
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
  const dateFormat = "dddd";
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

 onDateClick = day => {
  this.setState({
    selected_Date: day
  });
};

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
    </div>
  );
}

}

export default Calendar;
