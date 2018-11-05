import React, { Component } from 'react';
import './App.scss';
import Github from './components/Github';
import User from './components/User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubCommits: [],
    }
  }

  reset = () => {
    
    this.setState({
      githubCommits: [],
    })
    
    const users = ['userA', 'userB'];
    users.forEach(user => {
      this.refs[user].setState({
        master: [],
      })
      this.refs[user].refs.terminal.refs.gtermPrefix.value = '';
      this.refs[user].refs.terminal.refs.gtermInput.value = '';
    })
  }

  push = (array) => {
    this.setState({
      githubCommits: this.state.githubCommits
        .concat(array)
        .sort((a, b) => a.timeStamp > b.timeStamp)
        .filter((commit1, pos, a) => {
          return a.findIndex((commit2) => {
            return commit1.timeStamp === commit2.timeStamp;
          }) === pos;
        })
        .map((commit, i, a) => {
          const commitCopy = Object.assign({}, commit);
          if (i !== 0 && i !== a.length - 1) {
            commitCopy.hasPrevious = true;
            commitCopy.hasNext = true;
          }
          if (i === 0) commitCopy.hasNext = true;
          if (i === a.length - 1) commitCopy.hasPrevious = true;
          return commitCopy;
        })
    })
  }

  pull = (user) => {

    let githubCommits = this.state.githubCommits;
    if (!this.state.githubCommits.length) return;
    githubCommits = githubCommits
      .concat(this.refs[user].state.master)
      .sort((a, b) => a.timeStamp > b.timeStamp)
      .filter((commit1, pos, a) => {
        return a.findIndex((commit2) => {
          return commit1.timeStamp === commit2.timeStamp;
        }) === pos;
      })
      .map((commit, i, a) => {
        const commitCopy = Object.assign({}, commit);
        if (i !== 0 && i !== a.length - 1) {
          commitCopy.hasPrevious = true;
          commitCopy.hasNext = true;
        }
        if (i === 0) commitCopy.hasNext = true;
        if (i === a.length - 1) commitCopy.hasPrevious = true;
        return commitCopy;
      })
    
    this.refs[user].setState({
      master: githubCommits
    })
  }

  render() {
    return (
      <div className="App">
        
        <button
          className="reset"
          onClick={this.reset}
        >
          Reset
        </button>

        <Github
          githubCommits={this.state.githubCommits}
        />
        
        <div style={{ borderRight: "5px solid black" }}>
          <User
            ref="userA"
            userName="Developer A"
            push={this.push}
            pull={this.pull}
          />
        </div>
        
        <div style={{ borderLeft: "5px solid black" }}>
          <User
            ref="userB"
            userName="Developer B"
            push={this.push}
            pull={this.pull}
          />
        </div>
      </div>
    )
  }
}

export default App;
