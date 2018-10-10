import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Register } from '@igo2/context';

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
  constructor() {}
}
