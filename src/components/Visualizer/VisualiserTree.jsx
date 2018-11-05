import VisualizerBranch from './VisualiserBranch';

class VisualizerTree {

  constructor() {
    this.branches = [new VisualizerBranch('master')];
  }

  add(node, branchName) {
    const branch = this.branches.find((branch) => branch.name === branchName);
    if (!branch) return false;
    return branch.add(node);
  }

  render() {
    this.branches.map((branch) => {
      return branch.render();
    })
  }
}

export default VisualizerTree;