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
  name: 'searchClient',
  title: 'tools.searchClient',
  icon: 'person'
})
@Component({
  selector: 'fadq-search-client-tool',
  templateUrl: './search-client-tool.component.html'
})
export class SearchClientToolComponent {
  constructor() {}
}
