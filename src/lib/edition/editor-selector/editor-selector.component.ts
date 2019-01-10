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

import { Subscription } from 'rxjs';

import {
  EntityStore,
  EntityStoreController,
  State,
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
   * The selected editor
   * @internal
   */
  public editor: Editor;

  /**
   * Subscription to the store's selected editor
   */
  private editor$$: Subscription;

  /**
   * Store controller
   */
  private controller: EntityStoreController;

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

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  /**
   * Observe the store's selected editor and activate it
   * @internal
   */
  ngOnInit() {
    this.controller.bind(this.store);
    this.editor$$ = this.store
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.activateEditor(editor));
  }

  /**
   * Unsubscribe to the store selected editor
   * @internal
   */
  ngOnDestroy() {
    this.controller.unbind();
    this.editor$$.unsubscribe();
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
    this.controller.updateEntityState(editor, {selected: true}, true);
    this.selectedChange.emit({selected: true, editor});
  }

  /**
   * Activate the newly selected editor and deactivate the one previously selected
   * @internal
   * @param editor Editor
   */
  private activateEditor(editor: Editor) {
    if (this.editor !== undefined) {
      this.editor.deactivate();
    }
    if (editor !== undefined) {
      editor.activate();
    }
    this.editor = editor;
  }
}
