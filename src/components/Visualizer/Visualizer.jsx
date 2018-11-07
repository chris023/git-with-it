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
    const branchOrder = Object.keys(this.props.branches).sort((a, b) => {
      if (!this.props.branches[a][0] || !this.props.branches[b][0]) {
        return true;
      }
      return this.props.branches[a][0].timeStamp < this.props.branches[b][0].timeStamp;
    });
    return (
      <div ref="window" className="Visualizer" style={this.style}>
        {
          this.props.branches && (
            branchOrder.map((branch) => {
              return (
                <div style={{ display: "flex" }}>
                  {
                    this.props.branches[branch].length ? (
                      <p className="branchName">{branch}</p>
                    ) : ''
                  }
                  {this.props.branches[branch].map(commit => Commit.render(commit))}
                </div>
              )
            })
          )  
        }
      </div>
    )
  }
}

export default Visualizer;
