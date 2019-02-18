import {WindowNames} from "../../scripts/constants/window-names";
import {WindowsService} from "../../scripts/services/windows-service";
import {DragService} from "../../scripts/services/drag-service";
import {RunningGameService} from "../../scripts/services/running-game-service";

export class SettingsView {

  private readonly toggleDiv: HTMLElement | any = document.getElementById('toggle');
  private readonly screenshotDiv: HTMLElement | any = document.getElementById('screenshot');
  private readonly closeButton: HTMLElement | any = document.getElementById('closeButton');
  private readonly header: HTMLElement | any = document.getElementsByClassName('app-header')[0];

  private dragService: DragService | any = null;

	constructor() {
    let that = this;
    this.closeButton.addEventListener('click', SettingsView._onCloseClicked);
    overwolf.windows.getCurrentWindow(result => {
      that.dragService = new DragService(result.window, that.header);
    });
  }

	private static async _onCloseClicked() {
    let isGameRunning = await RunningGameService.instance.isGameRunning();
    if (isGameRunning) {
		  window.close();
    } else {
      let mainWindow = overwolf.windows.getMainWindow();
      mainWindow.close();
    }
	}

  public updateToggle(value: string) {
    this.toggleDiv.textContent = value;
  }

  public updateScreenshot(value: string) {
    this.screenshotDiv.textContent = value;
  }
}