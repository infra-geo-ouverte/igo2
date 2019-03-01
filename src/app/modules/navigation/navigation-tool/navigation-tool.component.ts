import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Poi } from '@igo2/context';
import { ToolComponent } from '@igo2/common';
import { IgoMap } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { PlaceCategory } from 'src/lib/navigation';

import { NavigationToolOptions } from './navigation-tool.interfaces';

@ToolComponent({
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
   * @internal
   */
  get map(): IgoMap { return this.mapState.map; }

  /**
   * Available place catagories
   * @internal
   */
  get categories(): PlaceCategory[] {
    return this.options.categories === undefined ? [] : this.options.categories;
  }

  /**
   * Available points of interest
   * @internal
   */
  get pois(): Poi[] {
    return this.options.pois === undefined ? [] : this.options.pois;
  }

  constructor(private mapState: MapState) {}
}
