/*global overwolf*/

import React, { Component } from 'react';
import HotkeysService from '../../common/services/hotkeys-service';
import DragService from '../../common/services/drag-service';
import '../../common/style.css';

class Settings extends Component {
	constructor(props) {
		super(props);

		this._dragService = null;
		this._headerRef = React.createRef();

		this.state = {
			toggleText: '',
			screenshotText: '',
		};
	}

	async _updateHotkeys() {
		let toggleHotkey = await HotkeysService.getToggleHotkey();
		let screenshotHotkey = await HotkeysService.getTakeScreenshotHotkey();
		this.updateToggle(toggleHotkey);
		this.updateScreenshot(screenshotHotkey);
	}

	async componentDidMount() {
		try {
			await this._updateHotkeys();
		} catch (e) {
			console.error(e);
		}

		HotkeysService.addHotkeyChangeListener(this._updateHotkeys);

		// Make window draggable
		overwolf.windows.getCurrentWindow(result => {
			this._dragService = new DragService(result.window, this._headerRef.current)
		})
	}
	
	onCloseClicked(event) {
		window.close();
	}
	
	updateToggle(value) {
		this.setState({
			toggleText: value
		});
	}
	
	updateScreenshot(value) {
		this.setState({
			screenshotText: value
		});
	}

  render() {
    return (
      <div className="settings">
				<svg xmlns='http://www.w3.org/2000/svg' display='none'>
   				 <symbol id='window-control_close' viewBox='0 0 30 30'>
       			 <line x1='19.5' y1='10.5' x2='10.5' y2='19.5' fill='none' stroke='currentcolor'
							strokeLinecap='round' />
							<line x1='10.5' y1='10.5' x2='19.5' y2='19.5' fill='none' stroke='currentcolor'
      				  strokeLinecap='round' />
    			</symbol>
				</svg>

				<header className="app-header" ref={this._headerRef}>
					<div className="window-controls-group">
						<button className="icon window-control window-control-close" id="closeButton" onClick={this.onCloseClicked}>
							<svg>
								<use xlinkHref="#window-control_close" />
							</svg>
						</button>
					</div>
				</header>

				<main>
					<div><span>Toggle:&nbsp;</span><kbd id="toggle">{this.state.toggleText}</kbd></div>
					<div><span>Take a screentshot:&nbsp;</span><kbd id="screenshot">{this.state.screenshotText}</kbd></div>
				</main>

      </div>
    );
  }
}

export default Settings;