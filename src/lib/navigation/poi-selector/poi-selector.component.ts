import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

import * as olproj from 'ol/proj';
import * as oleasing from 'ol/easing';

import { Poi } from '@igo2/context';
import { IgoMap } from '@igo2/geo';


@Component({
  selector: 'fadq-poi-selector',
  templateUrl: './poi-selector.component.html',
  styleUrls: ['./poi-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoiSelectorComponent implements OnInit {

  filteredPois$: Observable<Poi[]>;

  poiControl = new FormControl();

  @Input() map: IgoMap;

  @Input() pois: Poi[];

  constructor() {}

  ngOnInit() {
    this.filteredPois$ = this.poiControl.valueChanges
      .pipe(
        startWith<string | Poi | undefined>(undefined),
        map(value => {
          if (value === undefined) {
            return '';
          }
          return typeof value === 'string' ? value : value.title;
        }),
        map(title => title ? this.filterPoisByTitle(title) : this.pois.slice())
      );
  }

  onPoiSelect(poi: Poi) {
    this.zoomToPoi(poi);
  }

  onZoomButtonClick() {
    this.zoomToPoi(this.poiControl.value);
  }

  onClearButtonClick() {
    this.poiControl.setValue(undefined);
  }

  getPoiTitle(poi?: Poi) {
    return poi ? poi.title : undefined;
  }

  private filterPoisByTitle(title: string): Poi[] {
    const filterValue = title.toLowerCase();
    return this.pois.filter(poi => {
      return poi.title.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  private zoomToPoi(poi: Poi) {
    const center = olproj.fromLonLat(
      [Number(poi.x), Number(poi.y)],
      this.map.projection
    );

    this.map.ol.getView().animate({
      center: center,
      zoom: poi.zoom,
      duration: 500,
      easing: oleasing.easeOut
    });
  }

}
