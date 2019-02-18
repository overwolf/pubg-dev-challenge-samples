interface GameRunningChangedListener {
  (payload?: any): void;
}

/**
 * Detect whether a game is currently running
 */
export class RunningGameService {
  private readonly _gameRunningChangedListeners: GameRunningChangedListener[];

  private static _instance: RunningGameService = new RunningGameService();

  protected constructor() {
    this._gameRunningChangedListeners = [];

    overwolf.games.onGameInfoUpdated.removeListener(
        this._onGameInfoUpdated.bind(this));
    overwolf.games.onGameInfoUpdated.addListener(
        this._onGameInfoUpdated.bind(this));
  }

  static get instance(): RunningGameService {
    return RunningGameService._instance;
  }

  /**
   * A game info was updated (running state, or other state changed such as
   * resolution changed)
   * @param event
   * @private
   */
  private _onGameInfoUpdated(event: any) {
    let gameRunning;

    if (event &&
      (event.runningChanged || event.gameChanged)) {
      gameRunning = (event.gameInfo && event.gameInfo.isRunning);
      for (let listener of this._gameRunningChangedListeners) {
        listener(gameRunning);
      }
    }
  }

  public async isGameRunning() {
    let gameRunning = await this._isGameRunning();
    return gameRunning;
  }

  private _isGameRunning() {
    return new Promise((resolve => {
      overwolf.games.getRunningGameInfo(function (runningGameInfo) {
        let isRunning = runningGameInfo && runningGameInfo.isRunning;
        resolve(isRunning);
      });
    }));
  }
  
  public addGameRunningChangedListener(callback: GameRunningChangedListener) {
    this._gameRunningChangedListeners.push(callback);
  }
}