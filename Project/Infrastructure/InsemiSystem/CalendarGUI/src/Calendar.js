import React, { useState } from 'react';
import Calendar from 'react-calendar';
import dateFns from "date-fns";
import "./App.css"

function MyApp() {
 const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
      />
    </div>
  );

}

export default MyApp;
