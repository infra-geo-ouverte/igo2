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

export class IgoMap extends IgoLibMap {

  public overlay: Overlay;

  // TODO: move most of this stuff ins a MapViewController
  private movement$ = new Subject<MapMovement>();
  private movement$$: Subscription;

  constructor(options?: MapOptions) {
    super(options);
    this.overlay = new Overlay(this);
  }

  setView(options: MapViewOptions) {
    this.unsubscribeToMovement();
    super.setView(options);
    this.subscribeToMovement();
  }

  delayedMoveToExtent(extent: [number, number, number, number]) {
    this.movement$.next({extent, action: 'move'});
  }

  delayedZoomToExtent(extent: [number, number, number, number]) {
    this.movement$.next({extent, action: 'zoom'});
  }

  private subscribeToMovement() {
    this.movement$$ = this.movement$.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe((movement: MapMovement) => this.doMovement(movement));
  }

  private unsubscribeToMovement() {
    if (this.movement$$ !== undefined) {
      this.movement$$.unsubscribe();
      this.movement$$ = undefined;
    }
  }

  private doMovement(movement: MapMovement) {
    if (movement.action === 'move') {
      this.moveToExtent(movement.extent);
    } else if (movement.action === 'zoom') {
      this.zoomToExtent(movement.extent);
    }
  }
}
