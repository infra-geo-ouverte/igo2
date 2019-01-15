import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Media, MediaOrientation, MediaService } from '@igo2/core';

import { Action, ActionbarMode } from 'src/lib/action';
import { EntityStore } from 'src/lib/entity';

import { IgoMap, MapAction } from '../shared';

/**
 * Map actions bar
 */
@Component({
  selector: 'fadq-map-actionbar',
  templateUrl: './map-actionbar.component.html',
  styleUrls: ['./map-actionbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapActionbarComponent implements OnInit {

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
  public store: EntityStore<Action> = new EntityStore<Action>();

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.store.setEntities(this.buildActions());
  }

  /**
   * Build the list of actions that'll go into the store
   */
  private buildActions(): Action[] {
    return [
      {
        id: MapAction.BaseLayerSwitcher,
        icon: 'photo_library',
        title: 'map.actionbar.baselayerswitcher.title',
        tooltip: 'map.actionbar.baselayerswitcher.tooltip',
        handler: () => {}
      },
      {
        id: MapAction.ZoomIn,
        icon: 'zoom_in',
        title: 'map.actionbar.zoomin.title',
        tooltip: 'map.actionbar.zoomin.tooltip',
        handler: () => {
          this.map.zoomIn();
        }
      },
      {
        id: MapAction.ZoomOut,
        icon: 'zoom_out',
        title: 'map.actionbar.zoomout.title',
        tooltip: 'map.actionbar.zoomout.tooltip',
        handler: () => {
          this.map.zoomOut();
        }
      },
      {
        id: MapAction.PreviousView,
        icon: 'arrow_back',
        title: 'map.actionbar.previousview.title',
        tooltip: 'map.actionbar.previousview.tooltip',
        handler: () => {}
      },
      {
        id: MapAction.NextView,
        icon: 'arrow_forward',
        title: 'map.actionbar.nextview.title',
        tooltip: 'map.actionbar.nextview.tooltip',
        handler: () => {}
      },
      {
        id: MapAction.ClickInteraction,
        icon: 'mouse',
        title: 'map.actionbar.clickinteraction.title',
        tooltip: 'map.actionbar.clickinteraction.tooltip',
        handler: () => {}
      },
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
