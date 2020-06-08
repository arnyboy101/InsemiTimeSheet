import React, {Component} from 'react';
import ReactStopwatch from 'react-stopwatch';
import { render } from "react-dom";

class StopWatch extends Component{
    render() {
        return (
    <ReactStopwatch
    seconds={0}
    minutes={0}
    hours={0}
    limit="23:59:59"
    onChange={({ hours, minutes, seconds }) => {
      // do something
    }}
    onCallback={() => console.log('Finish')}
    render={({ formatted, hours, minutes, seconds }) => {
      return (
        <div>
          <p>
            Formatted: { formatted }
          </p>
          <p>
            Hours: { hours }
          </p>
          <p>
            Minutes: { minutes }
          </p>
          <p>
            Seconds: { seconds }
          </p>
        </div>
      );
    }}
   />
        );
    }
}

export default StopWatch;

const container = document.getElementById("timetracker");

render(<StopWatch />, container);