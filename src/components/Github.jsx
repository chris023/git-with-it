import React, { Component } from 'react';
import '../styles/_github.scss';
import octocat from '../media/Octocat.png';
import gitHubLogo from '../media/GitHub_Logo.png'
import Visualizer from './Visualizer/Visualizer';

class Github extends Component {
  render() {
    return (
      <div className="Github">
        <div className="github-logos">
          <img className="github-logo" src={gitHubLogo} alt="Github" />
          <img className="octocat" src={octocat} alt="GithubLogo"/>
        </div>
        <Visualizer
          height="100%"
          width="100%"
          master={this.props.githubCommits}
        />
      </div>
    )
  }
}

export default Github;