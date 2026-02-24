import User_Func from "./components/User_Func";
import React from 'react';
import ReactDOM from 'react-dom';






const App = () => (
<div>
<User_Func />
</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);

