import { WindowNames } from "../../scripts/constants/window-names";
import { WindowsService } from "../../scripts/services/windows-service";
import { DragService } from "../../scripts/services/drag-service";

export class InGameView {

	private readonly img: HTMLElement | any = document.querySelector('img');
	private readonly closeButton: HTMLElement | any = document.getElementById('closeButton');
	private readonly settingsButton: HTMLElement | any = document.getElementById('settingsButton');
	private readonly header: HTMLElement | any = document.getElementsByClassName('app-header')[0];

	private dragService: DragService | any = null;

	constructor() {
		let that = this;
		this.closeButton.addEventListener('click', InGameView._onCloseClicked);
		this.settingsButton.addEventListener('click', InGameView._onSettingsClicked);
		overwolf.windows.getCurrentWindow(result => {
			that.dragService = new DragService(result.window, that.header);
		});
	}

	private static _onCloseClicked() {
		WindowsService.instance.minimize(WindowNames.IN_GAME);
	}

	private static _onSettingsClicked() {
		WindowsService.instance.restore(WindowNames.SETTINGS);
	}

	public updateScreenshot(url: string) {
		this.img.src = url;
	}

}