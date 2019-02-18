import { WindowNames} from "../../scripts/constants/window-names";
import { WindowsService } from "../../scripts/services/windows-service";
import { RunningGameService } from "../../scripts/services/running-game-service";
import { HotkeysService } from "../../scripts/services/hotkeys-service";
import { GepService } from "../../scripts/services/gep-service";
import { ScreenshotsService } from "../../scripts/services/screenshots-service";
import {EventBus} from "../../scripts/services/event-bus";

export class BackgroundController {
  private constructor() {
  }

  static async run() {
    (<any>window).ow_eventBus = EventBus.instance;

    BackgroundController._registerAppLaunchTriggerHandler();
    BackgroundController._registerHotkeys();

    let startupWindow = await WindowsService.instance.getStartupWindowName();
    await WindowsService.instance.restore(startupWindow);

    let isGameRunning = await RunningGameService.instance.isGameRunning();
    if (isGameRunning) {
      GepService.instance.registerToGEP();
      await WindowsService.instance.restore(WindowNames.IN_GAME);
      WindowsService.instance.minimize(WindowNames.IN_GAME);
    }

    RunningGameService.instance.addGameRunningChangedListener((isGameRunning) => {
      if (isGameRunning) {
        WindowsService.instance.restore(WindowNames.IN_GAME);
      } else {
        // windowsService.minimize(WindowNames.IN_GAME);
        console.log('closing app after game closed');
        window.close();
      }
    });
  }

  static _registerAppLaunchTriggerHandler() {
    overwolf.extensions.onAppLaunchTriggered.removeListener(
      BackgroundController._onAppRelaunch);
    overwolf.extensions.onAppLaunchTriggered.addListener(
      BackgroundController._onAppRelaunch);
  }

  static _onAppRelaunch() {
    WindowsService.instance.restore(WindowNames.SETTINGS);
  }

  static _registerHotkeys() {
    HotkeysService.instance.setTakeScreenshotHotkey(async () => {
      try {
        let screenshotUrl = await ScreenshotsService.takeScreenshot();
        (<any>window).ow_eventBus.trigger('screenshot', screenshotUrl);
      } catch (e) {
        console.error(e);
      }
    });
  }
}

