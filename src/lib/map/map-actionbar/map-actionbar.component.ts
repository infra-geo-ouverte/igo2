import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Media, MediaOrientation, MediaService } from '@igo2/core';

import { Action, ActionbarMode } from 'src/lib/action';
import { EntityStore } from 'src/lib/entity';

import { IgoMap, MapAction } from '../shared';

@Component({
  selector: 'fadq-map-actionbar',
  templateUrl: './map-actionbar.component.html',
  styleUrls: ['./map-actionbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapActionbarComponent implements OnInit {

  public visible = true;

  @Input()
  get map(): IgoMap { return this._map; }
  set map(value: IgoMap) { this._map = value; }
  private _map: IgoMap;

  get store(): EntityStore<Action> { return this._store; }
  private _store = new EntityStore<Action>();

  get mode(): ActionbarMode {
    const media = this.mediaService.media$.value;
    const orientation = this.mediaService.orientation$.value;
    // Make that work with OnPush strategy
    if (media === Media.Desktop && orientation === MediaOrientation.Portrait) {
      return ActionbarMode.Dock;
    }
    return ActionbarMode.Overlay;
  }

  get withTitle(): boolean {
    return this.mode === ActionbarMode.Overlay;
  }

  constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.store.setEntities(this.buildActions());
  }

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
