import { Component, OnInit } from '@angular/core';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';

import { Layer } from '../shared/layers/layer';
import { LayerService } from '../shared/layer.service';

@Register({
  name: 'layerEditor',
  title: 'Edit Layer',
  icon: 'layers'
})
@Component({
  selector: 'igo-layer-editor',
  templateUrl: './layer-editor.component.html',
  styleUrls: ['./layer-editor.component.styl']
})
export class LayerEditorComponent
  extends ToolComponent implements OnInit {

  public layer: Layer;

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
