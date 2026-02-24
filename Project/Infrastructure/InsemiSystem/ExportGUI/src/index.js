import React from 'react';
import ReactDOM from 'react-dom';
import Export from "./Export"





const App = () => (
<div>
<Export />
</div>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
);
