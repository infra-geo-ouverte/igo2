import { Component, OnInit, Input } from '@angular/core';

import { Layer, LayerLegendOptions } from '../shared/layers';

@Component({
  selector: 'igo-layer-legend',
  templateUrl: './layer-legend.component.html',
  styleUrls: ['./layer-legend.component.styl']
})
export class LayerLegendComponent implements OnInit {

  @Input() layer: Layer;

  legend: LayerLegendOptions[];

  constructor() { }

  ngOnInit() {
    this.legend = this.layer.getLegend();
  }

}
