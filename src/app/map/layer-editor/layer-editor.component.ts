import { Component, OnInit } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';

import { Layer } from '../shared/layers/layer';
import { LayerService } from '../shared/layer.service';

@Register()
@Component({
  selector: 'igo-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.styl']
})
export class LayerEditorComponent
  extends ToolComponent implements OnInit {

  static name_: string = 'layerEditor';
  static title: string = 'Edit Layer';
  static icon: string = 'layers';
  static defaultOptions: any = {};

  layer: Layer;

  constructor(private layerService: LayerService) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.layerService.editedLayer
        .subscribe((layer: Layer) => this.layer = layer));
  }

  updateLayer() {
    console.log(this.layer);
  }

}
