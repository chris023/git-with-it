import React from 'react';
import commitIcon from '../../media/file-sketch.svg'
import '../../styles/_commit.scss';

class Commit {
  constructor(owner, hasPrevious, branchesOff) {
    this.hasPrevious = hasPrevious || false;
    this.hasNext = false;
    this.branchesOff = branchesOff || false;
    this.timeStamp = new Date(Date.now());
    this.owner = owner;
  }

  static render(commit) {
    return (
      <div className="Commit" key={commit.timeStamp.toLocaleTimeString()}>
        <p className="timestamp">{commit.timeStamp.toLocaleTimeString()}</p>
        <div className="main-commit-wrapper">
          { commit.hasPrevious && <div className="line commits left"></div> }
          <img className={`commit-icon ${commit.owner.split('').pop()}`} src={commitIcon} alt="Commit File" />
          { commit.hasNext && <div className="line commits right"></div>}
        </div>
      </div>
    )
  }
}

export default Commit;