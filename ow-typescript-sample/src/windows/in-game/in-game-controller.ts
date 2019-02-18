import { WindowNames } from "../../scripts/constants/window-names";
import { WindowsService } from "../../scripts/services/windows-service";

import { InGameView } from "./in-game-view";

export class InGameController {
  private static inGameView: InGameView;

  private constructor() {
  }

  static run() {
    if (!InGameController.inGameView) {
      InGameController.inGameView = new InGameView();
    }

    let mainWindow = overwolf.windows.getMainWindow();
    (<any>mainWindow).ow_eventBus.addListener(InGameController._eventListener);
  }

  private static _eventListener(eventName: string, data: any) {
    switch (eventName) {
      case 'screenshot': {
        InGameController._updateScreenshot(data);
        break;
      }
      default:
        break;
    }
  }

  private static _updateScreenshot(url: string) {
    InGameController.inGameView.updateScreenshot(url);
    WindowsService.instance.restore(WindowNames.IN_GAME);
  }
}


