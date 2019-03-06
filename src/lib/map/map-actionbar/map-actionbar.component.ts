import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Action, ActionbarMode, ActionStore } from '@igo2/common';
import { IgoMap, MapViewState } from '@igo2/geo';

import { MapAction } from '../shared';

/**
 * Map actions bar
 */
@Component({
  selector: 'fadq-map-actionbar',
  templateUrl: './map-actionbar.component.html',
  styleUrls: ['./map-actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapActionbarComponent implements OnInit, OnDestroy {

  /**
   * The map
   */
  @Input() map: IgoMap;

  /**
   * Actionbar mode
   */
  @Input() mode: ActionbarMode;

  /**
   * Whether action titles are displayed
   */
  @Input() withTitle: boolean = true;

  /**
   * The store that'll contain the map actions
   * @internal
   */
  public store: ActionStore = new ActionStore([]);

  /**
   * Subscription to the map view's state
   */
  private mapViewState$$: Subscription;

  /**
   * Init the store and subscribe to the map view's state
   * @internal
   */
  ngOnInit() {
    this.store.load(this.buildActions());
    this.mapViewState$$ = this.map.viewController.state$
      .subscribe((state: MapViewState) => this.store.updateActionsAvailability());
  }

  /**
   * Destroy the store and unsubscribe to the map view's state
   * @internal
   */
  ngOnDestroy() {
    this.store.destroy();
    this.mapViewState$$.unsubscribe();
  }

  /**
   * Build the list of actions that'll go into the store
   */
  private buildActions(): Action[] {
    const mapViewHasPreviousState = () => {
      return this.map.viewController.hasPreviousState();
    };

    const mapViewHasNextState = () => {
      return this.map.viewController.hasNextState();
    };

    return [
      // {
      //   id: MapAction.BaseLayerSwitcher,
      //   icon: 'photo_library',
      //   title: 'map.actionbar.baselayerswitcher.title',
      //   tooltip: 'map.actionbar.baselayerswitcher.tooltip',
      //   handler: () => {}
      // },
      {
        id: MapAction.ZoomIn,
        icon: 'zoom_in',
        title: 'map.actionbar.zoomin.title',
        tooltip: 'map.actionbar.zoomin.tooltip',
        handler: () => {
          this.map.viewController.zoomIn();
        }
      },
      {
        id: MapAction.ZoomOut,
        icon: 'zoom_out',
        title: 'map.actionbar.zoomout.title',
        tooltip: 'map.actionbar.zoomout.tooltip',
        handler: () => {
          this.map.viewController.zoomOut();
        }
      },
      {
        id: MapAction.PreviousView,
        icon: 'arrow_back',
        title: 'map.actionbar.previousview.title',
        tooltip: 'map.actionbar.previousview.tooltip',
        conditions: [mapViewHasPreviousState],
        handler: () => {
          this.map.viewController.previousState();
        }
      },
      {
        id: MapAction.NextView,
        icon: 'arrow_forward',
        title: 'map.actionbar.nextview.title',
        tooltip: 'map.actionbar.nextview.tooltip',
        conditions: [mapViewHasNextState],
        handler: () => {
          this.map.viewController.nextState();
        }
      },
      // {
      //   id: MapAction.ClickInteraction,
      //   icon: 'mouse',
      //   title: 'map.actionbar.clickinteraction.title',
      //   tooltip: 'map.actionbar.clickinteraction.tooltip',
      //   handler: () => {}
      // },
      {
        id: MapAction.Geolocation,
        icon: 'my_location',
        title: 'map.actionbar.geolocation.title',
        tooltip: 'map.actionbar.geolocation.tooltip',
        handler: () => {}
      },
      {
        id: MapAction.GoogleView,
        icon: 'streetview',
        title: 'map.actionbar.googleview.title',
        tooltip: 'map.actionbar.googleview.tooltip',
        handler: () => {}
      }
    ];
  }

}
