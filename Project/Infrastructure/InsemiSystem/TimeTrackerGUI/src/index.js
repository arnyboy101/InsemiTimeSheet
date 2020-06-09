import React from 'react';
import ReactDOM from 'react-dom';

import Stopwatch from "./Stopwatch";
import "./Stopwatch.css";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducer(state, action) {
  console.log('reducer', state, action);
  return state;
  }
  


const store = createStore(reducer, applyMiddleware(thunk));
const App = () => (
<div>
<Stopwatch />

</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
