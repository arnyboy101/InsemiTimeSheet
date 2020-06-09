import React from 'react';
import ReactDOM from 'react-dom';

import HomeScreen from "./Homescreen";

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducer(state, action) {
  console.log('reducer', state, action);
  return state;
  }
  
const App = () => (
<div>
    <HomeScreen />
    
    </div>
    );
const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('homescreen')
);
