/**
 * provides functionality for enabling windows dragging
 */
export class DragService {
  private static readonly SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 1;

  private readonly currentWindow: any;
  private initialMousePosition: any;
  private isMouseDown: boolean;

  constructor(currentWindow: any, element: HTMLElement) {
    this.currentWindow = currentWindow;
    this.initialMousePosition = null;
    this.isMouseDown = false;

    element.addEventListener('mousedown', this.onDragStart.bind(this));
    element.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  public onDragStart(event: MouseEvent) {
    this.isMouseDown = true;
    this.initialMousePosition = {
      x: event.clientX,
      y: event.clientY
    };
  }

  public onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) {
      return;
    }

    let isSignificantMove = this._isSignificantMouseMove(event);
    if (!isSignificantMove) {
      return;
    }

    this.isMouseDown = false;

    if (this.currentWindow) {
      overwolf.windows.dragMove(this.currentWindow.id);
    }
  }

  /**
   * check that the mouse is moved in a significant distance to prevent
   * unnecessary calls for dragMove
   * @param event
   * @private
   */
  private _isSignificantMouseMove(event: MouseEvent) {
    if (!this.initialMousePosition) {
      return false;
    }

    let x = event.clientX;
    let y = event.clientY;
    let diffX = Math.abs(x - this.initialMousePosition.x);
    let diffY = Math.abs(y - this.initialMousePosition.y);
    let isSignificant =
        (diffX > DragService.SIGNIFICANT_MOUSE_MOVE_THRESHOLD) ||
        (diffY > DragService.SIGNIFICANT_MOUSE_MOVE_THRESHOLD);

    return isSignificant;
  }
}
