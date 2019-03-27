import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ToolComponent } from '@igo2/common';
import { ConfigService } from '@igo2/core';
import { Layer, ImageLayer, WMSDataSource } from '@igo2/geo';

import { substituteProperties } from 'src/lib/utils';

/**
 * Tool to browse a map's layers or to choose a different map
 */
@ToolComponent({
  name: 'map',
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

  @Input() baseUrl: string;

  constructor(private configService: ConfigService) {}

  showInfoButton(layer: Layer): boolean {
    return layer.dataSource instanceof WMSDataSource;
  }

  onInfoButtonClick(layer: Layer) {
    window.open(this.computeWMSLayerInfoLink(layer as ImageLayer));
  }

  /**
   * Compute the link to the layer's info
   * @internal
   * @param layer Layer
   * @returns External link to the layer's info
   */
  private computeWMSLayerInfoLink(layer: ImageLayer): string {
    const baseUrl = this.configService.getConfig('layer.infoLink');
    return  substituteProperties(baseUrl, {
      layerName: layer.dataSource.options.params.layers,
      layerTitle: layer.title
    });
  }
}
