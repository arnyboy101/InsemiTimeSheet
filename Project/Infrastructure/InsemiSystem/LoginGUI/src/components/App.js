import React, {Component} from "react";
import { render } from "react-dom";

class App extends Component {
  constructor(props){
      super(props);
      this.state={
          data:[],
          loaded:false,
          placeholder:"Loading"
      };
  }

  componentDidMount(){
      fetch("/login/api/login_page")
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
      <ul>
        {this.state.data.map(contact => {
          return (
            <li key = {contact.id}>
                        Name : {contact.first_name} {contact.last_name} 
                        <br></br> Email : {contact.email} <br></br> 
                        Employee Id: {contact.employeeId} <br></br> 
                        Account Creation Date: {contact.created_at}
            </li>  
          );
        })}
      </ul>
    );
  }
}


export default App;

const container = document.getElementById("app");
render(<App />, container);