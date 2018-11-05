import { Component } from 'react';
import VisualizerBranch from './VisualizerBranch';

class VisualizerTree extends Component {

  constructor(props) {
    super(props);
    this.branches = [new VisualizerBranch('master')];
  }

  add(node, branchName) {
    const branch = this.branches.find((branch) => branch.name === branchName);
    if (!branch) return false;
    return branch.add(node);
  }

  render() {
    return (
      this.branches.map((branch) => {
        return branch.render();
      })
    )
  }
}

export default VisualizerTree;