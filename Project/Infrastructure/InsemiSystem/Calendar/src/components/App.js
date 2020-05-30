import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
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
            <p>Enter Your React Code here</p>
        </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);