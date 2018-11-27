import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Media, MediaOrientation, MediaService } from '@igo2/core';

import { EntityStore, getEntityId } from 'src/app/modules/entity';
import { Widget } from 'src/app/modules/widget';

import { IgoMap, MapWidget, MAP_DEFAULT_WIDGETS } from '../shared';

@Component({
  selector: 'fadq-map-widgetbar',
  templateUrl: './map-widgetbar.component.html',
  styleUrls: ['./map-widgetbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapWidgetbarComponent {

  public visible = true;

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

  get store(): EntityStore<Widget> {
    return this._store;
  }
  private _store = new EntityStore<Widget>();

  get collapsed(): boolean {
    // Make that work with OnPush strategy
    return (
      this.mediaService.media$.value !== Media.Desktop ||
      (
        this.mediaService.media$.value === Media.Desktop &&
        this.mediaService.orientation$.value === MediaOrientation.Portrait
      )
    );
  }

  constructor(private mediaService: MediaService) {
    this.store.setEntities(MAP_DEFAULT_WIDGETS);
  }

  onActivateWidget(widget: Widget) {
    const widgetId = getEntityId(widget);
    switch (widgetId) {
      case MapWidget.ZoomIn: {
        this.map.zoomIn();
        break;
      }
      case MapWidget.ZoomOut: {
        this.map.zoomOut();
        break;
      }
      default: {
        break;
      }
    }
  }

}
