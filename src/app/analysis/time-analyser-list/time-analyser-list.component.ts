import { Component, OnInit, Input } from '@angular/core';

import { Observer } from '../../utils/observer';

import { IgoMap } from '../../map/shared/map';
import { Layer } from '../../map/shared/layers/layer';

@Component({
  selector: 'igo-time-analyser-list',
  templateUrl: './time-analyser-list.component.html',
  styleUrls: ['./time-analyser-list.component.styl']
})
export class TimeAnalyserListComponent
  extends Observer implements OnInit {

  @Input() map: IgoMap;

  public layers: Layer[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.map.layers.subscribe((layers: Layer[]) => {
      this.layers = layers.filter(layer =>
        layer.options.timeFilter !== undefined);
    });
  }

}
