import Settings from "./components/Settings";
import React from 'react';
import ReactDOM from 'react-dom';






const App = () => (
<div>
<Settings />
</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
