import { Component, OnInit } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';

import { MapService } from '../../map/shared/map.service';
import { IgoMap } from '../../map/shared/map';

@Register()
@Component({
  selector: 'igo-time-analyser',
  templateUrl: './time-analyser.component.html',
  styleUrls: ['./time-analyser.component.styl']
})
export class TimeAnalyserComponent
  extends ToolComponent implements OnInit {

  static name_: string = 'timeAnalyser';
  static title: string = 'Time Analysis';
  static icon: string = 'history';
  static defaultOptions: any = {};

  public map: IgoMap;

  constructor(private mapService: MapService) {
    super();
  }

  ngOnInit() {
    this.map = this.mapService.getMap();
  }

}


