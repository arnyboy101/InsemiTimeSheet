import React, {Component} from 'react';
import { InputPicker } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const Choices = [
    {
      "label": "Eugenia",
      "value": "Eugenia",
      "role": "Master"
    },
    {
      "label": "Kariane",
      "value": "Kariane",
      "role": "Master"
    },
    {
      "label": "Louisa",
      "value": "Louisa",
      "role": "Master"
    },
    {
      "label": "Marty",
      "value": "Marty",
      "role": "Master"
    },
    {
      "label": "Kenya",
      "value": "Kenya",
      "role": "Master"
    },
    {
      "label": "Hal",
      "value": "Hal",
      "role": "Developer"
    },
    {
      "label": "Julius",
      "value": "Julius",
      "role": "Developer"
    },
    {
      "label": "Travon",
      "value": "Travon",
      "role": "Developer"
    },
    {
      "label": "Vincenza",
      "value": "Vincenza",
      "role": "Developer"
    },
    {
      "label": "Dominic",
      "value": "Dominic",
      "role": "Developer"
    },
    {
      "label": "Pearlie",
      "value": "Pearlie",
      "role": "Guest"
    },
    {
      "label": "Tyrel",
      "value": "Tyrel",
      "role": "Guest"
    },
    {
      "label": "Jaylen",
      "value": "Jaylen",
      "role": "Guest"
    },
    {
      "label": "Rogelio",
      "value": "Rogelio",
      "role": "Guest"
    }
  ]

class DropDown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user_Selection:"",
            is_Selected:false
        }
        
    }

    componentDidMount() {

    }


    render() {
        return(
            <div className = "DropDown">
                <InputPicker data = {Choices} style={ { width:244 }}/>
            </div>
        );

    }
}

export default DropDown;
