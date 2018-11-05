import React from 'react';
import nodeImg from '../../media/file-sketch.svg';
import '../../styles/vnode.scss'

class VisualizerNode {
  render() {
    return (
      <img className="node-img" src={nodeImg} alt="File"/>
    )
  }
}

export default VisualizerNode;