/**
 * Detects the launch source of the app (manual or automatic from game launch)
 * gamelaunchevent source means the app was autolaunched with the game
 */
export class LaunchSourceService {
  private static _instance: LaunchSourceService = new LaunchSourceService();

  private readonly _launchSource: string;

  protected constructor() {
    this._launchSource = this._detectLaunchSource();
  }

  static get instance(): LaunchSourceService {
    return LaunchSourceService._instance;
  }

  private _detectLaunchSource(): string {
    let source = this._getUrlParameterByName('source');
    return source;
  }

  private _getUrlParameterByName(name: string): string {
    let regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  public getLaunchSource(): string {
    return this._launchSource;
  }
}
