import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Register } from '@igo2/context';

import {
  MapService,
  LayerService,
  OverlayService,
  Feature,
  FeatureType,
  AnyDataSourceOptions,
  DataSourceService
} from '@igo2/geo';

@Register({
  name: 'featureDetails',
  title: 'tools.featureDetails',
  icon: 'info'
})
@Component({
  selector: 'fadq-feature-details-tool',
  templateUrl: './feature-details-tool.component.html'
})
export class FeatureDetailsToolComponent {
  constructor() {}
}
