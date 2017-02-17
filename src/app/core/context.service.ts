/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../tool/shared/tool.interface';
import { ToolService } from './tool.service';
import { LayerOptions } from '../map/shared/layers/layer';
import { MapViewOptions } from '../map/shared/map';
import { AppStore } from '../app.store';

@Injectable()
export class ContextService {

  constructor(private store: Store<AppStore>,
              private toolService: ToolService) { }

  loadContext() {
    // This will go somewhere else eventually
    // Important: For For now we use some new ol.abc
    // in the context but this will have to change because
    // we want to be able to save the context as a JSON

    const context = {
      map: {
        view: {
          projection: 'EPSG:3857',
          center: [-72, 52] as [number, number],
          zoom: 6
        }
      },
      layers: [
        {
          name : 'OSM',
          type : 'osm'
        }
      ],
      tools: [
        {
          name: 'context',
          title: 'Contexts',
          icon: 'local_offer'
        },
        {
          name: 'search'
        },
        {
          name: 'map',
          title: 'Map',
          icon: 'map'
        },
        {
          name: 'add_layers',
          title: 'Add Layers',
          icon: 'add_location'
        },
        {
          name: 'directions',
          title: 'Directions',
          icon: 'directions'
        },
        {
          name: 'historical_analysis',
          title: 'Historical Analysis',
          icon: 'history'
        },
        {
          name: 'print',
          title: 'Print',
          icon: 'local_printshop'
        },
        {
          name: 'measure',
          title: 'Measure',
          icon: 'straighten'
        }
      ]
    };

    const view: MapViewOptions = context.map.view;
    this.store.dispatch({type: 'UPDATE_VIEW', payload: view});

    const layers: Array<LayerOptions> = context.layers;
    this.store.dispatch({type: 'UPDATE_LAYERS', payload: layers});

    const tools: Array<Tool> = [];
    (context.tools || []).forEach((tool_: Tool) => {
      // TODO: Remove the " || {}" when more tool will be defined
      const tool = this.toolService.getTool(tool_.name) || {};
      if (tool !== undefined) {
        tools.push(Object.assign(tool, tool_));
      }
    });
    this.store.dispatch({type: 'UPDATE_TOOLS', payload: tools});
  }

}
