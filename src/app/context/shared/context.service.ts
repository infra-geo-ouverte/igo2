import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../../tool/shared/tool.interface';
import { ToolService } from '../../tool/shared/tool.service';

import { RequestService } from '../../core/request.service';

import { LayerOptions } from '../../map/shared/layers/layer';
import { MapViewOptions } from '../../map/shared/map';

import { Context } from './context.interface';
import { DetailedContext } from './detailed-context.interface';

@Injectable()
export class ContextService {

  constructor(private store: Store<IgoStore>,
              private http: Http,
              private requestService: RequestService,
              private toolService: ToolService) { }

  getContexts(): Observable<Context[]> {
    return this.requestService.register(
      this.http.get(`contexts/_contexts.json`)
    ).map(res => res.json());
  }

  getDetailedContext(uri?: string): Observable<DetailedContext> {
    let fileName;
    if (uri !== undefined) {
      fileName = `${uri}.json`;
    } else {
      fileName = '_default.json';
    }

    return this.requestService.register(
      this.http.get(`contexts/${fileName}`), 'Context'
    ).map(res => res.json());
  }

  loadContext(uri?: string) {
    this.getDetailedContext(uri)
      .subscribe(context => this.handleLoadContext(context));
  }

  private handleLoadContext(context: DetailedContext) {
    // TODO: Remove map, layers and tools keys
    this.store.dispatch({type: 'SET_CONTEXT', payload: context});

    // TODO: Handle "useCurrentView" option
    const mapOptions: MapViewOptions = context.map;
    this.store.dispatch({type: 'SET_MAP', payload: mapOptions});

    const layerOptions: Array<LayerOptions> = context.layers;
    this.store.dispatch({type: 'SET_LAYERS', payload: layerOptions});

    const tools: Array<Tool> = [];
    (context.tools || []).forEach((tool_: Tool) => {
      // TODO: Remove the " || {}" when more tool will be defined
      const tool = this.toolService.getTool(tool_.name) || {};
      if (tool !== undefined) {
        tools.push(Object.assign({
          toolbar: context.toolbar.indexOf(tool_.name) >= 0
        }, tool, tool_));
      }
    });
    this.store.dispatch({type: 'SET_TOOLS', payload: tools});
  }

}
