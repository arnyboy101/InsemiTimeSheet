import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyApp from './Calendar';
import * as serviceWorker from './serviceWorker';
import "./App.css"
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';


function reducer(state, action) {
  console.log('reducer', state, action);
  return state;
  }
  


const store = createStore(reducer, applyMiddleware(thunk));
const App = () => (
<div>
<MyApp />

</div>
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
