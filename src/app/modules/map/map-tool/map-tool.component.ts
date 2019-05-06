import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ToolComponent } from '@igo2/common';
import { ConfigService } from '@igo2/core';
import { Layer, ImageLayer,  WMSDataSource } from '@igo2/geo';

import { LayerInfoDialogComponent } from './layer-info-dialog.component';

/**
 * Tool to browse a map's layers or to choose a different map
 */
@ToolComponent({
  name: 'fadqMap',
  title: 'tools.map',
  icon: 'map'
})
@Component({
  selector: 'fadq-map-tool',
  templateUrl: './map-tool.component.html',
  styleUrls: ['./map-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapToolComponent {

  constructor(
    private configService: ConfigService,
    private dialog: MatDialog
  ) {}

  showInfoButton(layer: Layer): boolean {
    return layer.dataSource instanceof WMSDataSource;
  }

  onInfoButtonClick(layer: Layer) {
    const data = {
      layer: layer as ImageLayer,
      baseUrl: this.configService.getConfig('layer.infoLink')
    };
    this.dialog.open(LayerInfoDialogComponent, {data});
  }
}
