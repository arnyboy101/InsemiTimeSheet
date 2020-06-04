import { Panel, PanelGroup } from 'rsuite';
import React from 'react';
import 'rsuite/dist/styles/rsuite-default.css';

class BasicPane extends React.Component
{ 
  render(){
    return(
  <Panel header="Panel title" collapsible shaded>
   <p>Blah Blah Blah</p>
  </Panel>);
  }
}

export default BasicPane;