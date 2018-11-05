import React, { Component } from 'react';
import '../styles/_user.scss';
import Terminal from './Terminal';
import Visualizer from './Visualizer/Visualizer';
import Commit from './Visualizer/Commit';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      master: [],
    }
  }

  commit = () => {
    let master = this.state.master;
    
    let hasPrev = true;
    if (!master.length)
      hasPrev = false;
    
    let commit = new Commit(this.props.userName, hasPrev)
    master.push(commit);

    if (master.length > 1)
      master[master.length - 2].hasNext = true;

    this.setState({
      master,
    })
  }

  render() {
    return (
      <div className="User">
        <h2>{this.props.userName}</h2>
        <Visualizer
          height="100%"
          width="100%"
          master={ this.state.master }
        />
        <Terminal
          ref="terminal"
          commit={this.commit}
          push={this.props.push}
          pull={this.props.pull}
          user={this.props.userName}
          master={this.state.master}
        />
      </div>
    )
  }
}

export default User;
