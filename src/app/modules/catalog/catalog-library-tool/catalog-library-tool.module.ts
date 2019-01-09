import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { FadqLibCatalogModule } from 'src/lib/catalog/catalog.module';
import { CatalogLibraryToolComponent } from './catalog-library-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [FadqLibCatalogModule],
  declarations: [CatalogLibraryToolComponent],
  exports: [CatalogLibraryToolComponent],
  entryComponents: [CatalogLibraryToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqCatalogLibraryToolModule {}
