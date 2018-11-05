import React, { Component } from 'react';
import '../../styles/_visualizer.scss';

class Visualizer extends Component {

  constructor(props) {
    super(props);

    this.style = {
      width: this.props.width,
      height: this.props.height,
    }

    this.state = {
      displayTree: [],
    }
  }

  commit(branch) {
    
  }

  render() {
    return (
      <div className="Visualizer" style={this.style}>

      </div>
    )
  }
}

export default Visualizer;