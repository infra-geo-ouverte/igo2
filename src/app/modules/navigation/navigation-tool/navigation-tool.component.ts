import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Poi, Register } from '@igo2/context';

import { IgoMap } from 'src/lib/map';
import { PlaceCategory } from 'src/lib/navigation';

import { MapState } from 'src/app/modules/map/map.state';

import { NavigationToolOptions } from './navigation-tool.interfaces';

@Register({
  name: 'navigation',
  title: 'tools.navigation',
  icon: 'pin_drop'
})
@Component({
  selector: 'fadq-navigation-tool',
  templateUrl: './navigation-tool.component.html',
  styleUrls: ['./navigation-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationToolComponent {

  /**
   * Navigation tool options. At the moment, this needs to be defined
   * in order to be set by the toolbox component that contains it.
   */
  public options: NavigationToolOptions = {} as NavigationToolOptions;

  /**
   * Map to navigate on
   * @ignore
   */
  get map(): IgoMap { return this.mapState.map; }

  /**
   * Available place catagories
   * @ignore
   */
  get categories(): PlaceCategory[] {
    return this.options.categories === undefined ? [] : this.options.categories;
  }

  /**
   * Available points of interest
   * @ignore
   */
  get pois(): Poi[] {
    return this.options.pois === undefined ? [] : this.options.pois;
  }

  constructor(private mapState: MapState) {}
}
