import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';

import {
  EntityRecord,
  EntityStore,
  EntityStoreController,
  getEntityTitle
} from 'src/lib/entity';

import { Editor } from '../shared';

/**
 * Drop list that activates the selected editor emit an event.
 */
@Component({
  selector: 'fadq-editor-selector',
  templateUrl: './editor-selector.component.html',
  styleUrls: ['./editor-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current editor
   * @internal
   */
  public current$ = new BehaviorSubject<Editor>(undefined);

  /**
   * Subscription to the store's selected editor
   */
  private selected$$: Subscription;

  /**
   * Store controller
   */
  private controller: EntityStoreController<Editor>;


  /**
   * Store that holds the available editors.
   */
  @Input() store: EntityStore<Editor>;

  /**
   * Event emitted when an editor is selected or unselected
   */
  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    editor: Editor;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {}

  /**
   * Observe the store's selected editor and activate it
   * @internal
   */
  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<Editor>) => record.state.selected === true)
      .subscribe((record: EntityRecord<Editor>) => {
        const editor = record ? record.entity : undefined;
        this.activateEditor(editor);
      });
  }

  /**
   * Unsubscribe to the store selected editor
   * @internal
   */
  ngOnDestroy() {
    this.controller.destroy();
    this.selected$$.unsubscribe();
  }

  /**
   * @internal
   */
  getEditorTitle(editor: Editor): string {
    return getEntityTitle(editor);
  }

  /**
   * When an editor is manually selected, select it into the
   * store and emit an event.
   * @internal
   * @param event The selection change event
   */
  onSelectionChange(event: {value: Editor}) {
    const editor = event.value;
    this.store.state.update(editor, {selected: true}, true);
    this.selectedChange.emit({selected: true, editor});
  }

  /**
   * Activate the newly selected editor and deactivate the one previously selected
   * @internal
   * @param editor Editor
   */
  private activateEditor(editor: Editor) {
    const current = this.current$.value;
    if (current !== undefined) {
      current.deactivate();
    }
    if (editor !== undefined) {
      editor.activate();
    }
    this.current$.next(editor);
  }
}
