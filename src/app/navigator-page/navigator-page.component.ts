import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'igo-navigator-page',
  templateUrl: './navigator-page.component.html',
  styleUrls: ['./navigator-page.component.styl']
})
export class NavigatorPageComponent implements OnInit {
  public config: any;

  constructor() { }

  ngOnInit() {
    this.config = {
      map: {
        view: {
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([-72, 46], 'EPSG:3857'),
          zoom: 6
        },
        layers: [
          {
            type: 'osm'
          }
        ]
      }
    };
  }

}
