import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Layer } from '../shared/layers/layer';

@Component({
  selector: 'igo-layer-list-item',
  templateUrl: './layer-list-item.component.html',
  styleUrls: ['./layer-list-item.component.styl']
})
export class LayerListItemComponent {

  @Input() layer: Layer;
  @Input() edition: boolean = true;

  @Output() editLayer: EventEmitter<Layer> = new EventEmitter();

  constructor() { }

}
