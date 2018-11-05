import React, { Component } from 'react';
import '../styles/_terminal.scss';

class Terminal extends Component {

  constructor(props) {
    super(props);
    this.branches = ["master"];
  }
  
  submitCommand = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value;
      const lines = text.split('\n');
      const lastLine = lines[lines.length - 2];

      this.evaluate(lastLine);

      this.refs.gtermPrefix.value += 'gterm > ';
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
        this.commit();
        break;
      case 'push':
        this.push();
        break;
      case 'pull':
        this.pull();
        break;
      case 'merge':
        this.merge();
        break;
      case 'checkout':
        this.checkout();
        break;
      case undefined:
        this.displayHelp();
        break;
      default:
        this.commandNotFound();
    }
  }

  commit() {

  }

  push() {

  }

  pull() {

  }

  merge() {

  }

  checkout() {

  }

  clear() {
    this.refs.gtermInput.value = '';
    this.refs.gtermPrefix.value = '';
  }

  displayHelp() {
    const help = `
help: possible commands:
  clear
  git commit
  git push
  git pull
  git checkout
  git checkout -b newbranch
  git merge\n\n`;
    
    this.refs.gtermInput.value += help;
    this.refs.gtermPrefix.value += help.split('\n').map(line => '\n').join('');
  }

  commandNotFound() {
    console.log('Command Not Found');
  }

  render() {
    return (
      <div className="Terminal">
        <form className="gterm">
          <textarea
            className="gterm-prefix"
            ref="gtermPrefix"
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