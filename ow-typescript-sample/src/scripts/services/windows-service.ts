import { WindowNames } from   '../constants/window-names';
import { LaunchSourceService } from '../services/launch-source-service';
import { RunningGameService } from   '../services/running-game-service';

export class WindowsService {
  private static _instance: WindowsService = new WindowsService();

  protected constructor() {
  }

  static get instance(): WindowsService {
    return WindowsService._instance;
  }

  /**
   * obtain a window object by a name as declared in the manifest
   * this is required in order to create the window before calling other APIs
   * on that window
   * @param name
   * @returns {Promise<any>}
   * @private
   */
  private _obtainWindow(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      overwolf.windows.obtainDeclaredWindow(name, (response) => {
        if (response.status !== 'success') {
          return reject(response);
        }

        resolve(response);
      });
    });
  }

  private _getCurrentWindow(): Promise<any> {
    return new Promise((resolve, reject) => {
      overwolf.windows.getCurrentWindow(result => {
        if (result.status === 'success') {
          resolve(result.window);
        } else {
          reject(result);
        }
      });
    });
  }

  /**
   * restore a window by name
   * @param name
   * @returns {Promise<any>}
   */
  public restore(name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this._obtainWindow(name);
        overwolf.windows.restore(name, (result) => {
          if (result.status === 'success') {
            resolve();
          } else {
            reject(result);
          }
        });
      } catch (e) {
        reject(e)
      }
    });
  }

  /**
   * start dragging the current window
   * @param name
   * @returns {Promise<any>}
   */
  public dragMove(name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this._obtainWindow(name);
        let window = await this._getCurrentWindow();
        overwolf.windows.dragMove(window.id, (result) => {
          if (result.status === 'success') {
            resolve();
          } else {
            reject(result)
          }
        });
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * minimize a window by name
   * @param name
   * @returns {Promise<any>}
   */
  public minimize(name: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        await this._obtainWindow(name);
        overwolf.windows.minimize(name, (result) => {
          if (result.status === 'success') {
            resolve();
          } else {
            reject(result);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * get the name of the window to show first
   * @returns {Promise<*>}
   */
  public async getStartupWindowName(): Promise<string> {
    let launchSource = LaunchSourceService.instance.getLaunchSource();

    if (launchSource === 'gamelaunchevent') {
      return WindowNames.IN_GAME;
    }

    // if toggle hotkey -> 'settings'

    let isGameRunning = await RunningGameService.instance.isGameRunning();
    if (isGameRunning) {
      return WindowNames.IN_GAME;
    }

    return WindowNames.SETTINGS;
  }
}