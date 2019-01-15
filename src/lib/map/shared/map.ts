import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  IgoMap as IgoLibMap,
  MapOptions,
  MapViewOptions
} from '@igo2/geo';

import { Overlay } from 'src/lib/overlay';

// TODO: move that to a better place
export interface MapMovement {
  extent: [number, number, number, number];
  action: string;
}

/**
 * This class extends the base IgoMap and adds a few functionnalities.
 * @todo Move "view" stuff elsewhere
 * @todo Bakcport this to the library
 */
export class IgoMap extends IgoLibMap {

  /**
   * Overlay layer
   */
  public overlay: Overlay;

  /**
   * Movement stream
   */
  private movement$ = new Subject<MapMovement>();

  /**
   * Subscription to the movement stream
   */
  private movement$$: Subscription;

  constructor(options?: MapOptions) {
    super(options);
    this.overlay = new Overlay(this);
  }

  /**
   * Set the map view and subscribe to the movement stream
   * @param options Map view options
   */
  setView(options: MapViewOptions) {
    this.unsubscribeToMovement();
    super.setView(options);
    this.subscribeToMovement();
  }

  /**
   * Move to extent after a short delay (100ms) unless
   * a new movement gets registered in the meantime.
   * @param extent Extent to move to
   */
  delayedMoveToExtent(extent: [number, number, number, number]) {
    this.movement$.next({extent, action: 'move'});
  }

  /**
   * Zoom to extent after a short delay (100ms) unless
   * a new movement gets registered in the meantime.
   * @param extent Extent to zoom to
   */
  delayedZoomToExtent(extent: [number, number, number, number]) {
    this.movement$.next({extent, action: 'zoom'});
  }

  /**
   * Subscribe to the movement stream and apply only the latest
   * when many are registered in a interval or 100ms or less.
   */
  private subscribeToMovement() {
    this.movement$$ = this.movement$.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe((movement: MapMovement) => this.doMovement(movement));
  }

  /**
   * Unsubscribe to the movement stream
   */
  private unsubscribeToMovement() {
    if (this.movement$$ !== undefined) {
      this.movement$$.unsubscribe();
      this.movement$$ = undefined;
    }
  }

  /**
   * Do the given movement retrieved from the stream
   * @param movement Map movement
   */
  private doMovement(movement: MapMovement) {
    if (movement.action === 'move') {
      this.moveToExtent(movement.extent);
    } else if (movement.action === 'zoom') {
      this.zoomToExtent(movement.extent);
    }
  }
}
