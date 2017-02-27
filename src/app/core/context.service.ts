import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { Context } from '../context/shared/context.interface';
import { DetailedContext } from '../context/shared/detailed-context.interface';
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

  getContexts() {
    this.requestService.register(
      this.http.get(`contexts/_contexts.json`)
    ).subscribe(res => this.handleGetContexts(res.json()));
  }

  loadContext(name?: string) {
    let fileName;
    if (name !== undefined) {
      fileName = `${name}.json`;
    } else {
      fileName = '_default.json';
    }

    this.requestService.register(
      this.http.get(`contexts/${fileName}`)
    ).subscribe(res => this.handleLoadContext(res.json()));
  }

  private handleGetContexts(contexts: Context[]) {
    this.store.dispatch({type: 'SET_CONTEXTS', payload: contexts});
  }

  private handleLoadContext(context: DetailedContext) {
    // TODO: Remove map, layers and tools keys
    this.store.dispatch({type: 'SET_CONTEXT', payload: context});

    // TODO: Handle "useCurrentView" option
    const view: MapViewOptions = context.map.view;
    this.store.dispatch({type: 'SET_VIEW', payload: view});

    const layers: Array<LayerOptions> = context.layers;
    this.store.dispatch({type: 'SET_LAYERS', payload: layers});

    const tools: Array<Tool> = [];
    (context.tools || []).forEach((tool_: Tool) => {
      // TODO: Remove the " || {}" when more tool will be defined
      const tool = this.toolService.getTool(tool_.name) || {};
      if (tool !== undefined) {
        tools.push(Object.assign(tool, tool_));
      }
    });
    this.store.dispatch({type: 'SET_TOOLS', payload: tools});
  }

}
