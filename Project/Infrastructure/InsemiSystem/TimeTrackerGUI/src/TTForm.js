import React, {Component} from 'react';


class TTForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user_Selection:"",
            drop_down_value:"",
            add_Comments:"",
            comments_value:""
        };
    }

    HandleSubmit = (event) => {
        event.preventDefault();
        alert("You are selecting " + this.state.drop_down_value + " Project");
        this.setState({user_Selection:this.state.drop_down_value, add_Comments:this.state.comments_value});
      }
    HandleDropDown = (event) => {
        this.setState({drop_down_value: event.target.value});
      }
     HandleComments = (event) => {
       this.setState({comments_value:event.target.value})
     }
    
    render() {
        return(
            <div>
            <h1 className = "TTHeading">Hello!</h1>
                <div className='TTFORMDATA'>
                    <form onSubmit={this.HandleSubmit}>
                        <span>Select Your Project:</span>
                        <select className="DropDownBox" onChange={this.HandleDropDown}>
                            <option value="Let's">Let's</option>
                            <option value="Figure">Figure</option>
                            <option value="This Out">This Out</option>
                        </select>
                        <br/>
                        <span>Additional Comments</span>
                        <textarea className="AddCommentsBox" onChange={this.HandleComments}></textarea>
                        <input type='submit' />
                    </form>
                </div>
                <span>Current Project: {this.state.user_Selection} and AddComents: {this.state.add_Comments}</span>
                <p></p>
                <span>Current Project: {this.state.drop_down_value} and AddComents: {this.state.comments_value}</span>
            </div>
        );
    }

    
    
    

}

export default TTForm;
