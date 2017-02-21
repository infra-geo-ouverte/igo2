/* tslint:disable:max-line-length */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Tool } from '../tool/shared/tool.interface';
import { ToolService } from './tool.service';
import { RequestService } from './request.service';
import { LayerOptions } from '../map/shared/layers/layer';
import { MapViewOptions } from '../map/shared/map';
import { AppStore } from '../app.store';

@Injectable()
export class ContextService {

  constructor(private store: Store<AppStore>,
              private http: Http,
              private requestService: RequestService,
              private toolService: ToolService) { }

  loadContext(id?: string) {
    let fileName;
    if (id !== undefined) {
      fileName = `${id}.json`;
    } else {
      fileName = 'default.json';
    }

    this.requestService.register(
      this.http.get(`contexts/${fileName}`)
    ).subscribe(res => this.handleGetContext(res.json()));
  }

  private handleGetContext(context: any) {
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
