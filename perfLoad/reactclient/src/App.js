import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socket from './utilities/socketConnection';
import Widget from './Widget';

class App extends Component {
  constructor(){
    super();
    this.state = {
      performanceData: {}
    }
  }

  componentDidMount(){
    socket.on('data',(data)=>{
      // inside this callback, we just got some new data!!
      // Let's update state so we can re-render App --> Widget --> CPU/Mem/Info
      // We need to make a copy of current state so we can use it!
      const currentState = ({...this.state.performanceData});
      // Object.assign(this.state.performanceData,{});
      // Current state is an object!! Not an array!
      // the reason for this is so we can use the machine's
      // macA as it's property
      currentState[data.macA] = data;
      this.setState({
        performanceData: currentState
      })
      console.log(data);
    })
  }

  render() {
    console.log(this.state.performanceData);
    let widgets = [];
    const data = this.state.performanceData;
    // grab each machine by property, from data
    Object.entries(data).forEach(([key, value])=>{
      widgets.push(<Widget key={key} data={value} />)
    })
    return (
      <div className="App">
        {widgets}
      </div>
    );
  }
}

export default App;
