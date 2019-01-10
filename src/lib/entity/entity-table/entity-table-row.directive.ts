import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  EventEmitter,
  Output,
  HostListener
} from '@angular/core';

import { EntityTableScrollBehavior } from '../shared/entity.enums';

/**
 * Directive that handles an entity table row click and selection.
 */
@Directive({
  selector: '[entityTableRow]'
})
export class EntityTableRowDirective {

  /**
   * Class added to a selected row
   */
  static selectedCls = 'fadq-entity-table-row-selected';

  /**
   * Whether a row supports selection
   */
  @Input() selection: boolean = false;

  /**
   * Whether a row is selected
   */
  @Input()
  set selected(value: boolean) {
    if (this.selection === false) {
      return;
    }
    if (value === this._selected) {
      return;
    }

    this.toggleSelected(value);
    this.scroll();
  }
  get selected(): boolean {
    return this._selected;
  }
  private _selected = false;

  /**
   * Scroll behavior on selection
   */
  @Input()
  scrollBehavior: EntityTableScrollBehavior = EntityTableScrollBehavior.Smooth;

  /**
   * Event emitted when a row is selected
   */
  @Output() select = new EventEmitter<EntityTableRowDirective>();

  /**
   * When a row is clicked, select it if it's supported
   * @ignore
   */
  @HostListener('click')
  onClick() {
    if (this.selection === false) {
      return;
    }

    this.toggleSelected(true);
    this.select.emit(this);
  }

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  /**
   * Select a row and add or remove the selected class from it
   * @param selected Whether the row should be selected
   */
  private toggleSelected(selected: boolean) {
    this._selected = selected;
    if (selected) {
      this.addCls(EntityTableRowDirective.selectedCls);
    } else {
      this.removeCls(EntityTableRowDirective.selectedCls);
    }
  }

  /**
   * Scroll to the selected row
   */
  private scroll() {
    if (this._selected === true) {
      this.el.nativeElement.scrollIntoView({behavior: this.scrollBehavior});
    }
  }

  /**
   * Add the selected CSS class
   */
  private addCls(cls: string) {
    this.renderer.addClass(this.el.nativeElement, cls);
  }

  /**
   * Remove the selected CSS class
   */
  private removeCls(cls: string) {
    this.renderer.removeClass(this.el.nativeElement, cls);
  }
}
