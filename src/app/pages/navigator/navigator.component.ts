import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { Tool } from '../../tool/shared/tool.interface';
import { ToolService } from '../../core/tool.service';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.styl']
})
export class NavigatorComponent {

  context: any;
  selectedTool: Tool;
  searchTool: Tool;
  tools: Tool[] = [];

  constructor(private store: Store<AppStore>,
              private toolService: ToolService) {

    store
      .select(s => s.selectedTool)
      .subscribe(state => {
          this.selectedTool = state;
       });

    this.context = {
      map: {
        view: {
          projection: 'EPSG:3857',
          center: ol.proj.fromLonLat([-72, 52], 'EPSG:3857'),
          zoom: 6
        }
      },
      layers: [
        {
          name: 'MSP',
          type: 'xyz',
          source: {
            url: 'http://geoegl.msp.gouv.qc.ca/cgi-wms/mapcache.fcgi/tms/1.0.0/carte_gouv_qc_ro@EPSG_3857/{z}/{x}/{-y}.png',
            attribution: new ol.Attribution({
              html: '© Gouvernement du Québec <a href="http://www.droitauteur.gouv.qc.ca/copyright.php">'
            }),
            logo: {
              href: 'http://www.droitauteur.gouv.qc.ca/copyright.php',
              src: 'http://geoegl.msp.gouv.qc.ca/gouvouvert/public/images/quebec/gouv_qc_logo.png'
            },
            maxZoom: 17
          }
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

    let tool;
    for (const contextTool of this.context.tools) {
      // TODO: Remove the " || {}" when more tool will be defined
      tool = this.toolService.getTool(contextTool.name) || {};
      if (tool !== undefined) {
        this.tools.push(Object.assign(tool, contextTool));
      }
    }

    this.searchTool = this.tools.find(t => t.name === 'search');
  }

  selectTool(tool: Tool) {
    this.store.dispatch({type: 'SELECT_TOOL', payload: tool});
  }

  unselectTool() {
    this.store.dispatch({ type: 'UNSELECT_TOOL' });
  }

  goBack() {
    this.unselectTool();
  }

  goHome() {
    this.unselectTool();
  }

}
