import React from 'react';
import { connect } from 'react-redux';
import { start, stop, reset, tick } from './actions';

  
  let interval = null;

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    
  }  
    
  handleStartClick = () => {
    
    this.props.start();
    interval = setInterval(() => {
      if(this.props.isRunning){
        this.props.tick();
      }
    },1000);
    
  }
  //Sorry
  
  handleStopClick = () => {
    interval = clearInterval(interval);
  }
  
  handleResetClick = () =>{

    this.props.reset();
  }


  
  
  render() {
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{this.props.formattedSecs}</h1>
        
   
        
          <Button className="start-btn" onClick={this.handleStartClick}><b>START</b></Button>
           <Button className="stop-btn" onClick={this.handleStopClick}><b>STOP</b></Button>
        
        




          <Button className='reset-btn' onClick={this.handleResetClick}><b>RESET</b></Button>
          
      

        
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    secondsElapsed:state.secondsElapsed,
    lastClearedIncrementer:state.lastClearedIncrementer,
    formattedSecs:state.formattedSecs,
    isRunning:state.isRunning,
  };
}

const mapDispatchtoProps = {
  start,
  stop,
  reset,
  tick,
}
/** verbose component before 0.14
class Button extends React.Component {
  render() {
    return <button type="button" {...this.props}
                   className={"btn " + this.props.className } />;
  }
}
*/

const Button = (props) =>
  <button type="button" {...props} className={"btn " + props.className } />;

export default connect(mapStateToProps,mapDispatchtoProps)(Stopwatch);
