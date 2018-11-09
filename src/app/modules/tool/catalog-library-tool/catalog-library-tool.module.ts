import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { FadqCatalogModule } from '../../catalog/catalog.module';
import { CatalogLibraryToolComponent } from './catalog-library-tool.component';

@NgModule({
  imports: [FadqCatalogModule],
  declarations: [CatalogLibraryToolComponent],
  exports: [CatalogLibraryToolComponent],
  entryComponents: [CatalogLibraryToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqCatalogLibraryToolModule {}
