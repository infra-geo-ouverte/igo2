import { Component, Input, Output,
         EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Layer } from '../shared/layers/layer';

@Component({
  selector: 'igo-layer-list-item',
  templateUrl: './layer-list-item.component.html',
  styleUrls: ['./layer-list-item.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerListItemComponent {

  @Input() layer: Layer;
  @Input() edition: boolean = true;

  @Output() editLayer: EventEmitter<Layer> = new EventEmitter();
  @Output() removeLayer: EventEmitter<Layer> = new EventEmitter();
  @Output() raiseLayer: EventEmitter<Layer> = new EventEmitter();
  @Output() lowerLayer: EventEmitter<Layer> = new EventEmitter();

  get opacity () {
    return this.layer.opacity * 100;
  }

  set opacity (opacity: number) {
    this.layer.opacity = opacity / 100;
  }

  constructor() { }

  toggleLegend(collapsed: boolean) {
    this.layer.collapsed = collapsed;
  }

  toggleVisibility() {
    this.layer.visible = !this.layer.visible;
    this.toggleLegend(!this.layer.visible);
  }

}
