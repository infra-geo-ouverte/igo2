import { Component, Input } from '@angular/core';

import { Media, MediaOrientation, MediaService } from '@igo2/core';

import { widgetToEntity } from '../../widget/shared/widget.utils';
import { Widget } from '../../widget/shared/widget.interface';
import { getEntityId } from '../../entity/shared/entity.utils';
import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { MapWidget, MAP_DEFAULT_WIDGETS } from '../shared/map.enum';
import { IgoMap } from '../../map/shared/map';

@Component({
  selector: 'fadq-map-widgetbar',
  templateUrl: './map-widgetbar.component.html',
  styleUrls: ['./map-widgetbar.component.scss']
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

  get store(): EntityStore<Entity<Widget>> {
    return this._store;
  }
  private _store = new EntityStore<Entity<Widget>>();

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
    this.store.setEntities(MAP_DEFAULT_WIDGETS.map(widgetToEntity));
  }

  activateWidget(widget: Entity<Widget>) {
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
