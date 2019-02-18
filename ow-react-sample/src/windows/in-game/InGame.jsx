/*global overwolf*/

import React, { Component } from 'react';
import WindowNames from '../../common/constants/window-names';
import WindowsService from '../../common/services/windows-service';
import DragService from '../../common/services/drag-service';
import '../../common/style.css';

class InGame extends Component {
	constructor(props) {
		super(props);

		this._dragService = null;
		this._headerRef = React.createRef();

		this.state = {
			imgSrc: null
		}

		this._eventListener = this._eventListener.bind(this);
		this._updateScreenshot = this._updateScreenshot.bind(this);
	}

	componentDidMount() {
		let mainWindow = overwolf.windows.getMainWindow();
		mainWindow.ow_eventBus.addListener(this._eventListener);

		// Make window draggable
		overwolf.windows.getCurrentWindow(result => {
			this._dragService = new DragService(result.window, this._headerRef.current)
		})
	}

	_eventListener(eventName, data) {
		switch (eventName) {
			case 'screenshot': {
				this._updateScreenshot(data);
				break;
			}
			default:
				break;
		}
	}

	_updateScreenshot(url) {
		WindowsService.restore(WindowNames.IN_GAME);
		this.setState({ imgSrc: url })
	}

	onCloseClicked(event) {
		WindowsService.minimize(WindowNames.IN_GAME);
	}

	onSettingsClicked(event) {
		WindowsService.restore(WindowNames.SETTINGS);
	}

  render() {
    return (
      <div className="in-game">
				<svg xmlns='http://www.w3.org/2000/svg' display='none'>
					<symbol id='window-control_close' viewBox='0 0 30 30'>
						<line x1='19.5' y1='10.5' x2='10.5' y2='19.5' fill='none' stroke='currentcolor'
						strokeLinecap='round' />
						<line x1='10.5' y1='10.5' x2='19.5' y2='19.5' fill='none' stroke='currentcolor'
						strokeLinecap='round' />
					</symbol>
					<symbol id='window-control_settings' viewBox='0 0 30 30'>
						<path d='M22,16.3V13.7H19.81a4.94,4.94,0,0,0-.49-1.18L20.87,11,19,9.13l-1.55,1.55a5,5,0,0,0-1.18-.49V8H13.7v2.19a5,5,0,0,0-1.18.49L11,9.13,9.13,11l1.55,1.55a5,5,0,0,0-.49,1.18H8v2.6h2.19a5,5,0,0,0,.49,1.18L9.13,19,11,20.87l1.55-1.55a4.94,4.94,0,0,0,1.18.49V22h2.6V19.81a4.94,4.94,0,0,0,1.18-.49L19,20.87,20.87,19l-1.55-1.55a4.94,4.94,0,0,0,.49-1.18Zm-7,1.45A2.75,2.75,0,1,1,17.75,15,2.75,2.75,0,0,1,15,17.75Z'
						fill='currentcolor' />
					</symbol>
				</svg>

				<header className="app-header" ref={this._headerRef}>
					<div className="window-controls-group">
						<button className="icon window-control" id="settingsButton" onClick={this.onSettingsClicked}>
							<svg>
								<use xlinkHref="#window-control_settings" />
							</svg>
						</button>
						<button className="icon window-control window-control-close" id="closeButton" onClick={this.onCloseClicked}>
							<svg>
								<use xlinkHref="#window-control_close" />
							</svg>
						</button>
					</div>
				</header>

				<img src={this.state.imgSrc} width="100%" height="100%"></img>
      </div>
    );
  }
}

export default InGame;