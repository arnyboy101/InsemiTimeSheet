import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Calendar } from "react-calendar";
import "./app.css";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }
   MyApp() {
    const [value, setValue] = useState(new Date());
  
    function onChange(nextValue) {
      setValue(nextValue);
    }
}

   render() {
    return (
        <div>
            <Calendar 
            onChange={onChange}
            value={value}
            />
        </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);