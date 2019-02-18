/**
 * Game Event Provider service
 * This will listen to events from the game provided by
 * Overwolf's Game Events Provider
 */

import { ScreenshotsService } from './screenshots-service';

export class GepService {

  private static readonly REQUIRED_FEATURES: string[] = ['kill'];
  private static readonly REGISTER_RETRY_TIMEOUT: number = 10000;

  private static _instance: GepService = new GepService();

  protected constructor() {
  }

  static get instance(): GepService {
    return GepService._instance;
  }

  public registerToGEP() {
    // set the features we are interested in receiving
    overwolf.games.events.setRequiredFeatures(GepService.REQUIRED_FEATURES,
        this._registerToGepCallback.bind(this));
  }

  private _registerToGepCallback(response: any) {
    if (response.status === 'error') {
      setTimeout(this.registerToGEP.bind(this), GepService.REGISTER_RETRY_TIMEOUT);
    } else if (response.status === 'success') {
      overwolf.games.events.onNewEvents.removeListener(this._handleGameEvent.bind(this));
      overwolf.games.events.onNewEvents.addListener(this._handleGameEvent.bind(this));
    }
  }

  private async _handleGameEvent(eventsInfo: any) {
    for (let eventData of eventsInfo.events) {
      switch (eventData.name) {
        case 'kill': {
          try {
            let screenshotUrl = await ScreenshotsService.takeScreenshot();
            (<any>window).ow_eventBus.trigger('screenshot', screenshotUrl);
          } catch (e) {
            console.error(e);
          }

          break;
        }
      }
    }
  }


}


