import React from 'react';
import ReactDOM from 'react-dom';
import HomeScreen from './HomeScreen';
import "./Stopwatch.css";
import "./TTForm.css";





const App = () => (
<div>
<HomeScreen />
</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
