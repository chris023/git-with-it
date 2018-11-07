import React, { Component } from 'react';
import './App.scss';
import Github from './components/Github';
import User from './components/User';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubCommits: {},
    }
  }

  reset = () => {
    this.setState({
      githubCommits: {},
    })
    
    const users = ['userA', 'userB'];
    users.forEach(user => {
      this.refs[user].setState({
        branches: {
          master: [],
        },
      })
      this.refs[user].refs.terminal.refs.gtermPrefix.value = '';
      this.refs[user].refs.terminal.refs.gtermInput.value = '';
    })
  }

  push = (array, branch) => {
    
    const githubCommits = this.state.githubCommits;

    if (!githubCommits[branch]) githubCommits[branch] = [];

    githubCommits[branch] = this.mergeAndSortCommits(githubCommits[branch], array);
    
    this.setState({
      githubCommits,
    })
  }

  pull = (user, branch) => {

    let githubCommits = this.state.githubCommits;
    const userBranches = this.refs[user].state.branches;

    console.log('1',branch, userBranches[branch], githubCommits[branch])

    if (!githubCommits[branch].length) return;

    userBranches[branch] = this.mergeAndSortCommits(userBranches[branch], githubCommits[branch]);
    
    console.log('2',branch, userBranches[branch], githubCommits[branch])

    this.refs[user].setState({
      branches: userBranches
    })
  }

  mergeAndSortCommits(arr1, arr2) {
    return arr1
      .concat(arr2)
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
        if (a.length > 1) {
          if (i === 0)
            commitCopy.hasNext = true;
          if (i === a.length - 1)
            commitCopy.hasPrevious = true;
        }
        return commitCopy;
      });
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
