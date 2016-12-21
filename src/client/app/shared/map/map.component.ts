import { Component, Input, Output, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MapService } from "./map.service";

@Component({
  moduleId: module.id,
  selector: 'igo-map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
})

export class MapComponent implements AfterViewInit, OnInit {

  // @Input() options: any;

  // @Output() mapCreated = new EventEmitter();
  // @Output() sidebarToggled = new EventEmitter();

  map: ol.Map;
  view: ol.View;
  target: string = 'div-map';
  hasSidebar: boolean;
  zoomDuration: number = 500;
  sidebarCollapsible: boolean = false;
  contextId: string;

  constructor(private mapService: MapService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.contextId = params['id']);
  }

  public ngOnInit(): any {

    this.mapService.getView(this.contextId)
      .subscribe(
        (view: ol.View) => this.view = view
        // error => this.errorMessage = <any>error
      );

    this.mapService.getLayers(this.contextId)
        .subscribe(
          (layers: ol.layer.Base[]) => setTimeout(() => this.initMap(layers), 100),
          // error => this.errorMessage = <any>error
        );
  }

  public ngAfterViewInit(): any {
      //
  }

  private initMap(layers: any): any {

    // TODO: garder l'information dans un service
    this.map = new ol.Map({
      layers: layers,
      target: this.target,
      controls: ol.control.defaults({
        zoom: false,
        attributionOptions: ({
          collapsible: false
        })
      }),
      view: this.view
    });

  }


}
