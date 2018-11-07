import React, { Component } from 'react';
import '../styles/_user.scss';
import Terminal from './Terminal';
import Visualizer from './Visualizer/Visualizer';
import Commit from './Visualizer/Commit';

class User extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentBranch: 'master',
      branchOrder: ['master'],
      branches: {
        master: [],
      }
    }
  }

  createBranch = (name) => {
    const branches = this.state.branches;
    const branchOrder = this.state.branchOrder;

    branches[name] = [];
    branchOrder.unshift(name);

    this.setState({
      branches,
      branchOrder,
    })

    this.setCurrentBranch(name)
  }

  setCurrentBranch = (name) => {
    if (!this.state.branches[name]) return this.refs.terminal.branchNotFound(name);
    if (name === this.state.currentBranch) return this.refs.terminal.alreadyOnBranch(name);

    this.setState({
      currentBranch: name,
    })

    this.refs.terminal.switchedToBranch(name);
  }

  commit = () => {
    let branches = this.state.branches;
    let currentBranch = branches[this.state.currentBranch];
    
    let hasPrev = true;
    if (!currentBranch.length)
      hasPrev = false;
    
    let commit = new Commit(this.props.userName, hasPrev)
    currentBranch.push(commit);

    if (currentBranch.length > 1)
      currentBranch[currentBranch.length - 2].hasNext = true;
    
    branches[this.state.currentBranch] = currentBranch;

    this.setState({
      branches,
    })
  }

  render() {
    return (
      <div className="User">
        <h2>{this.props.userName}</h2>
        <Visualizer
          height="100%"
          width="100%"
          branches={this.state.branches}
          branchOrder={this.state.branchOrder}
        />
        <Terminal
          ref="terminal"
          commit={this.commit}
          push={this.props.push}
          pull={this.props.pull}
          user={this.props.userName}
          branches={this.state.branches}
          visualizer={this.refs.visualizer}
          currentBranch={this.state.currentBranch}
          createBranch={this.createBranch}
          setCurrentBranch={this.setCurrentBranch}
        />
      </div>
    )
  }
}

export default User;
