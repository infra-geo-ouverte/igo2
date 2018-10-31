import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { FadqCatalogModule } from '../../catalog/catalog.module';
import { CatalogToolComponent } from './catalog-tool.component';

@NgModule({
  imports: [FadqCatalogModule],
  declarations: [CatalogToolComponent],
  exports: [CatalogToolComponent],
  entryComponents: [CatalogToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqCatalogToolModule {}
