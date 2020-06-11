import React from 'react';
import ReactDOM from 'react-dom';
import TTForm from './TTForm'
import Stopwatch from "./Stopwatch";
import "./Stopwatch.css";
import "./TTForm.css";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';


const Initial_Stopwatch_State = {
  secondsElapsed: 0, 
  isRunning: false,
  formattedSecs: "",

};
const incrementer = null;
const formattedSeconds = (sec) => 
  ('0'+Math.floor(sec/3600)).slice(-2) +
  ':' +
  ('0'+ Math.floor(sec/60)%60 ).slice(-2) +
  ':' +
  ('0' + sec % 60).slice(-2)

function Stopwatch_reducer(state=Initial_Stopwatch_State, action) {
  console.log('reducer', state, action);
  switch(action.type){
    case 'START':
      return {
        isRunning:true,
        secondsElapsed: 0,  
      };
    case 'TICK':
      return{
        secondsElapsed: state.secondsElapsed+1,
       formattedSecs: formattedSeconds(state.secondsElapsed)
      };

    case 'STOP':
      return {
      };
    case 'RESET':
      return {
        isRunning:false,
        secondsElapsed: 0
      };
    default:
      return state;
    
    
  }
  
  }
  



const App = () => (
<Provider store = {store}>
<div>
<Stopwatch />
</div>
</Provider>
);

const store = createStore(Stopwatch_reducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
