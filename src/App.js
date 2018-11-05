import React, { Component } from 'react';
import './App.scss';
import Github from './components/Github';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Github />
        
        <div style={{ borderRight: "5px solid black" }}>
          <User />
        </div>
        
        <div style={{ borderLeft: "5px solid black" }}>
          <User />
        </div>
      </div>
    )
  }
}

export default App;
