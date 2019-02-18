import React, { Component } from 'react';
import BackgroundController from './BackgroundController';

class Background extends Component {
	componentDidMount() {
		BackgroundController.run();
	}

  render() {
    return (
      <div className="Background">
      </div>
    );
  }
}

export default Background;