import {HotkeysService} from "../../scripts/services/hotkeys-service";
import {SettingsView} from "./settings-view";

export class SettingsController {
  private static settingsView: SettingsView;

  private constructor() {
  }

  static async run() {
    if (!SettingsController.settingsView) {
      SettingsController.settingsView = new SettingsView();
    }

    try {
      await SettingsController._updateHotkeys();
    } catch (e) {
      console.error(e);
    }

    HotkeysService.instance.addHotkeyChangeListener(
      SettingsController._updateHotkeys);
  }

  static async _updateHotkeys() {
    let toggleHotkey = await HotkeysService.instance.getToggleHotkey();
    let screenshotHotkey = await HotkeysService.instance.getTakeScreenshotHotkey();
    SettingsController.settingsView.updateToggle(toggleHotkey);
    SettingsController.settingsView.updateScreenshot(screenshotHotkey);
  }
}

