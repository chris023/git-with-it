class VisualizerBranch {
  constructor(name) {
    this.name = name; 
    this.nodes = [];
  }

  add(node) {
    this.nodes.push(node);
    return true;
  }

  render() {
    this.nodes.map((node) => {
      return node.render();
    })
  }
}

export default VisualizerBranch;