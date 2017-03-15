import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Tool } from '../../tool/shared/tool.interface';

import { IgoMap } from '../shared/map';
import { Layer } from '../shared/layers/layer';
import { LayerService } from '../shared/layer.service';

@Component({
  selector: 'igo-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.styl']
})
export class LayerListComponent implements OnInit {

  @Input() map: IgoMap;

  get edition (): boolean {
    return this.editTool !== undefined;
  }

  private editTool: Tool;

  constructor(private store: Store<IgoStore>,
              private layerService: LayerService) { }

  ngOnInit() {
    this.store
      .select(s => s.tools)
      .subscribe((tools: Tool[]) =>
        this.editTool = tools.find(t => t.name === 'layerEditor'));
  }

  editLayer(layer: Layer) {
    if (this.editTool !== undefined) {
      this.layerService.editLayer(layer);
      this.store.dispatch({type: 'SELECT_TOOL', payload: this.editTool});
    }
  }

  removeLayer(layer: Layer) {
    this.map.removeLayer(layer);
  }

  raiseLayer(layer: Layer) {
    this.map.raiseLayer(layer);
  }

  lowerLayer(layer: Layer) {
    this.map.lowerLayer(layer);
  }

}
