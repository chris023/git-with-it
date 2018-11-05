import React, { Component } from 'react';
import '../styles/_user.scss';
import Terminal from './Terminal';
import Visualizer from './Visualizer/Visualizer';

class User extends Component {

  render() {
    return (
      <div className="User">
        <Visualizer height="100%" width="100%"/>
        <Terminal />
      </div>
    )
  }
}

export default User;
