import { Component, OnInit } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';

import { IgoMap } from '../shared/map';
import { MapService } from '../shared/map.service';

@Register({
  name: 'mapEditor',
  title: 'Map',
  icon: 'map'
})
@Component({
  selector: 'igo-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.styl']
})
export class MapEditorComponent
  extends ToolComponent implements OnInit {

  public map: IgoMap;

  constructor(private mapService: MapService) {
    super();
  }

  ngOnInit() {
    this.map = this.mapService.getMap();
  }

}
