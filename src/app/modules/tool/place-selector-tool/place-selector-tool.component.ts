import { Component } from '@angular/core';

import { Register } from '@igo2/context';

import { PlaceCategory } from '../../navigation/shared/place.interface';
import { PlaceSelectorToolOptions } from './place-selector-tool.interface';

@Register({
  name: 'placeSelector',
  title: 'tools.placeSelector',
  icon: 'navigation'
})
@Component({
  selector: 'fadq-place-selector-tool',
  templateUrl: './place-selector-tool.component.html'
})
export class PlaceSelectorToolComponent {
  public options: PlaceSelectorToolOptions = {} as PlaceSelectorToolOptions;

  get categories(): PlaceCategory[] {
    return this.options.categories === undefined ? [] : this.options.categories;
  }

  constructor() {}
}
