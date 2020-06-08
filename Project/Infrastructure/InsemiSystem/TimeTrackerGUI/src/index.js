import React from 'react';
import ReactDOM from 'react-dom';

import StopWatch from './MainApp';


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducer(state, action) {
  console.log('reducer', state, action);
  return state;
  }
  


const store = createStore(reducer, applyMiddleware(thunk));
const App = () => (
<div>
<StopWatch />

</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('timetracker')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

