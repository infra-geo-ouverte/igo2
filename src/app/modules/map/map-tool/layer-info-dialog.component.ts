import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Layer, ImageLayer } from '@igo2/geo';

import { substituteProperties } from 'src/lib/utils';

@Component({
  selector: 'fadq-layer-info-dialog',
  templateUrl: 'layer-info-dialog.component.html',
  styleUrls: ['./layer-info-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayerInfoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<LayerInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {layer: ImageLayer; baseUrl: string; },
    private domSanitizer: DomSanitizer
  ) {}

  /**
   * Compute the link to the layer's info
   * @internal
   * @param layer Layer
   * @returns External link to the layer's info
   */
  computeLayerInfoLink(): SafeResourceUrl {
    const layer = this.data.layer;
    const url = substituteProperties(this.data.baseUrl, {
      layerName: layer.dataSource.options.params.layers,
      layerTitle: layer.title
    });
    const encodedUrl = encodeURI(url).replace(/[!'()*]/g, escape);
    return this.domSanitizer.bypassSecurityTrustResourceUrl(encodedUrl);
  }
}
