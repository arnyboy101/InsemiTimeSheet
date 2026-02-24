import React from 'react';
const formattedSeconds = (sec) => 
  ('0'+Math.floor(sec/3600)).slice(-2) +
  ':' +
  ('0'+ Math.floor(sec/60)%60 ).slice(-2) +
  ':' +
  ('0' + sec % 60).slice(-2)
  
  

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      secondsElapsed: 0, 
      lastClearedIncrementer: null
    };
    this.incrementer = null;
  }  
    
  handleStartClick() {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
  }
  
  handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }
  
  handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
      secondsElapsed: 0,
      laps: []
    });
  }
  
  render() {
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
   
        {(this.state.secondsElapsed === 0 ||
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}><b>START</b></Button>
          : <Button className="stop-btn" onClick={this.handleStopClick.bind(this)}><b>STOP</b></Button>
        )}
        



        {(this.state.secondsElapsed !== 0 &&
          this.incrementer === this.state.lastClearedIncrementer
          ? <Button className='reset-btn' onClick={this.handleResetClick.bind(this)}><b>RESET</b></Button>
          : null
        )}

        
      </div>
    );
  }
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

export default Stopwatch;
