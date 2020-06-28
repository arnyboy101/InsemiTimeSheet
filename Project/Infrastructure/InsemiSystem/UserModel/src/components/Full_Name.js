import React, { Component } from "react";
import { render } from "react-dom";

class Full_Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  
   render() {
    return (
        <div>
            <div>
                <h1>Name Change Page</h1>
            </div>
            <div className = "Change_Name">
                
                <input type="text" label="Original Full Name"></input><br/>
                
                <input type="text"label ="Changed Full Name"></input>
                <a><button className = "Submit">Submit</button></a> 
            </div>

        </div>
    );
  }
}

export default Full_Name;

