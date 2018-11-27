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
} from 'src/app/modules/entity';

import { Editor } from '../shared';

@Component({
  selector: 'fadq-editor-selector',
  templateUrl: './editor-selector.component.html',
  styleUrls: ['./editor-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorSelectorComponent implements OnInit, OnDestroy {

  public editor: Editor;

  private editor$$: Subscription;
  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Editor> {
    return this._store;
  }
  set store(value: EntityStore<Editor>) {
    this._store = value;
  }
  private _store;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    editor: Editor;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    this.editor$$ = this.store
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.initEditor(editor));
  }

  ngOnDestroy() {
    this.controller.unbind();
    this.editor$$.unsubscribe();
  }

  getEditorTitle(editor: Editor): string {
    return getEntityTitle(editor);
  }

  onSelectionChange(event: {value: Editor}) {
    const editor = event.value;
    this.controller.updateEntityState(editor, {selected: true}, true);
    this.selectedChange.emit({selected: true, editor});
  }

  private initEditor(editor: Editor) {
    if (this.editor !== undefined) {
      this.editor.destroy();
    }
    if (editor !== undefined) {
      editor.init();
    }
    this.editor = editor;
  }
}
