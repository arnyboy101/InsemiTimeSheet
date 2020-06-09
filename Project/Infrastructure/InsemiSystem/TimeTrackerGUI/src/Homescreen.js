import React, {Component} from "react";
import { render } from "react-dom";
import {InputPicker} from 'rsuite';
import Stopwatch from './Stopwatch';


class HomeScreen extends Component {
  constructor(props){
      super(props);
      this.state={
          data:[],
          loaded:false,
          placeholder:"Loading"
      };
  }

  componentDidMount(){
      fetch("/timetracker/api/TimeTracker/allObjects")
      .then(response => {
          if (response.status > 400){
            return this.setState(()=>
                {return {placeholder:"Something went wrong!"};
        });
      }
      return response.json();
    })
    .then(data=>{
        this.setState(()=> {
            return{
                data,
                loaded: true
            };
        });
    });
  }
  render() {
    return (
        <div>
        {this.state.data.map(activitylist => {
        <div key={activitylist.id}>
        <InputPicker data={activitylist.CHOICES} style={{ width: 224 }} /> 
        </div>
        })}
        </div>
    );
  }
}


export default HomeScreen;

const container = document.getElementById("app");
render(<App />, container);