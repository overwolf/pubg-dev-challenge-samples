interface EventBusListener {
  (eventName: string, data: any): void;
}

export class EventBus {
  private static _instance: EventBus = new EventBus();

  private readonly _listeners: EventBusListener[];

  protected constructor() {
    this._listeners = [];
  }

  static get instance(): EventBus {
    return EventBus._instance;
  }

  public addListener(eventHandler: EventBusListener) {
    this._listeners.push(eventHandler);
  }

  public trigger(eventName: string, data: any) {
    for (let listener of this._listeners) {
      listener(eventName, data);
    }
  }
}
