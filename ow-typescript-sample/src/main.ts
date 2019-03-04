import {BackgroundController} from "./windows/background/background-controller";
import {InGameController} from "./windows/in-game/in-game-controller";
import {SettingsController} from "./windows/settings/settings-controller";

(function main() {
  let path = window.location.pathname.replace('/windows/', '');
  let windowFolder = path.split('/')[0];

  switch (windowFolder) {
    case 'background': {
      BackgroundController.run();
      break;
    }
    case 'in-game': {
      InGameController.run();
      break;
    }
    case 'settings': {
      SettingsController.run();
      break;
    }
  }
})();
