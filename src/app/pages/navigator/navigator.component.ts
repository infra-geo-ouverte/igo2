import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../../tool/shared/tool.interface';
import { NavigatorStore } from './navigator.store';

@Component({
  selector: 'igo-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigatorComponent implements OnInit {
  context: any;

  selectedTool: Tool;

  constructor(private store: Store<NavigatorStore>) {
    store
      .select<Tool>(s => s.selectedTool)
      .subscribe(state => this.selectedTool = state);
  }

  ngOnInit() {
    this.context = {
      map: {
        view: {
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([-72, 46], 'EPSG:3857'),
          zoom: 6
        }
      },
      layers: [
        {
          name: 'OSM',
          type: 'osm'
        }
      ],
      tools: [
        {
          name: 'context',
          title: 'Contexts',
          icon: 'local_offer'
        },
        {
          name: 'search',
          title: 'Search Results',
          icon: 'search'
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
  }

  selectTool(tool?: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }

  unselectTool() {
    this.store.dispatch({type: 'UNSELECT_TOOL'});
  }

  selectToolByName(name: string) {
    const tools = this.context.tools || [];
    this.selectTool(tools.find(tool => tool.name === name));
  }

  goBack() {
    this.unselectTool();
  }

  goHome() {
    this.unselectTool();
  }

}
