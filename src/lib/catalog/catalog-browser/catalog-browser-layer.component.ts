import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { getEntityTitle, getEntityIcon } from 'src/lib/entity';

import { CatalogItemLayer } from '../shared';

/**
 * Catalog browser layer item
 */
@Component({
  selector: 'fadq-catalog-browser-layer',
  templateUrl: './catalog-browser-layer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogBrowserLayerComponent {

  /**
   * Catalog layer
   */
  @Input() layer: CatalogItemLayer;

  /**
   * Whether the layer is already added to the map
   */
  @Input() added: boolean;

  /**
   * Event emitted when the add/remove button is clicked
   */
  @Output() addedChange = new EventEmitter<{
    added: boolean;
    layer: CatalogItemLayer;
  }>();

  /**
   * @internal
   */
  get title(): string { return getEntityTitle(this.layer); }

  /**
   * @internal
   */
  get icon(): string { return getEntityIcon(this.layer) || 'layers'; }

  constructor() {}

  /**
   * On toggle button click, emit the added change event
   * @internal
   */
  onToggleClick() {
    this.added ? this.remove() : this.add();
  }

  /**
   * Emit added change event with added = true
   */
  private add() {
    this.added = true;
    this.addedChange.emit({added: true, layer: this.layer});
  }

  /**
   * Emit added change event with added = false
   */
  private remove() {
    this.added = false;
    this.addedChange.emit({added: false, layer: this.layer});
  }

}
