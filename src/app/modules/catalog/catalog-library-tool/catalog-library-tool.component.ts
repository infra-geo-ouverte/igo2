import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Register, ToolService } from '@igo2/context';

import { EntityStore } from 'src/lib/entity';
import { Catalog, CatalogService } from 'src/lib/catalog';

import { CatalogState } from '../catalog.state';

@Register({
  name: 'catalogFadq',
  title: 'igo.tools.catalog',
  icon: 'photo_library'
})
@Component({
  selector: 'fadq-catalog-library-tool',
  templateUrl: './catalog-library-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogLibraryToolComponent implements OnInit {

  get store(): EntityStore<Catalog> {
    return this.catalogState.catalogStore;
  }

  constructor(
    private catalogService: CatalogService,
    private catalogState: CatalogState,
    private toolService: ToolService
  ) {}

  ngOnInit() {
    if (this.store.empty) {
      this.loadCatalogs();
    }
  }

  onCatalogSelectChange(event: {selected: boolean; catalog: Catalog}) {
    if (event.selected === false) {
      return;
    }
    const tool = this.toolService.getTool('catalogBrowser');
    if (tool) {
      this.toolService.selectTool(tool);
    }
  }

  private loadCatalogs() {
    this.catalogService.loadCatalogs()
      .subscribe((catalogs: Catalog[]) => {
        this.store.state.reset();
        this.store.addEntities(catalogs);
      });
  }

}
