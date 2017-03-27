import { Component, OnInit } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';

import { MapService } from '../../map/shared/map.service';
import { IgoMap } from '../../map/shared/map';

@Register({
  name: 'timeAnalyser',
  title: 'Time Analysis',
  icon: 'history'
})
@Component({
  selector: 'igo-time-analyser',
  templateUrl: './time-analyser.component.html',
  styleUrls: ['./time-analyser.component.styl']
})
export class TimeAnalyserComponent
  extends ToolComponent implements OnInit {

  public map: IgoMap;

  constructor(private mapService: MapService) {
    super();
  }

  ngOnInit() {
    this.map = this.mapService.getMap();
  }

}


