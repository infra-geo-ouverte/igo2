import { Component } from '@angular/core';

import { Poi, Register } from '@igo2/context';
import { IgoMap, MapService } from '@igo2/geo';

import { PlaceCategory } from '../../navigation/shared/place.interface';
import { NavigationToolOptions } from './navigation-tool.interface';

@Register({
  name: 'navigation',
  title: 'tools.navigation',
  icon: 'pin_drop'
})
@Component({
  selector: 'fadq-navigation-tool',
  templateUrl: './navigation-tool.component.html',
  styleUrls: ['./navigation-tool.component.scss']
})
export class NavigationToolComponent {

  public options: NavigationToolOptions = {} as NavigationToolOptions;

  get map(): IgoMap {
    return this.mapService.getMap();
  }

  get categories(): PlaceCategory[] {
    return this.options.categories === undefined ? [] : this.options.categories;
  }

  get pois(): Poi[] {
    return this.options.pois === undefined ? [] : this.options.pois;
  }

  constructor(private mapService: MapService) {}
}
