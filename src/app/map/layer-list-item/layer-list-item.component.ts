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

  get state () {
    let collapsed = this.layer.options.collapsed;
    if (collapsed === undefined) {
      collapsed = !this.layer.visible;
    }

    return collapsed ? 'collapsed' : 'expanded';
  }

  constructor() { }

  toggleVisibility() {
    this.layer.toggleVisibility();
    this.layer.visible ? this.expand() : this.collapse();
  }

  expand() {
    this.layer.options.collapsed = false;
  }

  collapse() {
    this.layer.options.collapsed = true;
  }

}
