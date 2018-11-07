import React, { Component } from 'react';
import '../styles/_terminal.scss';

class Terminal extends Component {
  
  submitCommand = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value;
      const lines = text.split('\n');
      const lastLine = lines[lines.length - 2];

      this.evaluate(lastLine);

      this.refs.gtermPrefix.value += 'gterm > ';

      // this.props.visualizer.refs.window.scrollLeft += Infinity;

      // if (lines.length > 13) {
      //   const numToRemove = lines.length - 13;

      // }
    }
  }

  evaluate(command) {
    command = command.split(' ');

    switch (command[0]) {
      case '':
        return;
      case 'git':
        break;
      case 'help':
        this.displayHelp();
        return;
      case 'clear':
        this.clear();
        return;
      default:
        this.commandNotFound();
        return;
    }

    switch (command[1]) {
      case 'commit':
        this.props.commit();
        this.refs.gtermPrefix.value += 'gterm > ';
        break;
      case 'push':
        this.props.push(this.props.branches[this.props.currentBranch], this.props.currentBranch);
        break;
      case 'pull':
        this.props.pull('user' + this.props.user[this.props.user.length - 1], this.props.currentBranch);
        break;
      case 'merge':
        this.merge();
        break;
      case 'checkout':
        switch (command[2]) {
          case '-b':
            !command[3] ? this.commandNotFound() : this.props.createBranch(command[3]);
            break;
          default:
            !command[2] ? this.commandNotFound() : this.props.setCurrentBranch(command[2]);
        }
        break;
      case undefined:
        this.displayHelp();
        break;
      default:
        this.commandNotFound();
    }
  }

  merge() {

  }

  checkout() {

  }

  clear() {
    this.refs.gtermInput.value = '';
    this.refs.gtermPrefix.value = '';
  }

  branchNotFound(name) {
    this.refs.gtermInput.value += `  no branch '${name}'\n`;
    this.refs.gtermPrefix.value += '\n\n'
  }

  switchedToBranch(name) {
    this.refs.gtermInput.value += `  switched to branch ${name}\n`;
    this.refs.gtermPrefix.value += '\n\n'
  }

  alreadyOnBranch(name) {
    this.refs.gtermInput.value += `  already on ${name}\n`;
    this.refs.gtermPrefix.value += '\n\n'
  }

  displayHelp() {
    const help = `
possible commands:
 clear
 git commit
 git push
 git pull
 git checkout <branchname>
 git checkout -b <branchname>\n\n`;
    
    this.refs.gtermInput.value += help;
    this.refs.gtermPrefix.value += help.split('\n').map(line => '\n').join('');
  }

  commandNotFound() {
    this.refs.gtermInput.value += `Command not found. Type 'help' for more options\n`;
    this.refs.gtermPrefix.value += `\n\n\n`;
  }

  render() {
    return (
      <div className="Terminal">
        <div className="gterm-header">
          <div className="osx-button one"></div>
          <div className="osx-button two"></div>
          <div className="osx-button three"></div>
          <p>Terminal</p>
        </div>
        <form className="gterm">
          <textarea
            ref="gtermPrefix"
            className="gterm-prefix"
            value="gterm > "
            readOnly>
          </textarea>
          <textarea
            ref="gtermInput"
            className="gterm-input"
            onKeyUp={this.submitCommand}
            spellCheck="false">
          </textarea>
        </form>
      </div>
    );
  }
}

export default Terminal;