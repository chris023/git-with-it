import React, { Component } from 'react';
import Commit from './Commit';

import '../../styles/_visualizer.scss';

class Visualizer extends Component {

  constructor(props) {
    super(props);

    this.style = {
      width: this.props.width,
      height: this.props.height,
    }
  }

 

  render() {
    return (
      <div className="Visualizer" style={this.style}>
        {
          this.props.master.map(commit => Commit.render(commit))
        }
      </div>
    )
  }
}

export default Visualizer;
