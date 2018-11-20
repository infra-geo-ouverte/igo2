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

import { getEntityTitle } from '../../entity';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';
import { Editor } from '../shared/editor';

@Component({
  selector: 'fadq-editor-selector',
  templateUrl: './editor-selector.component.html',
  styleUrls: ['./editor-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorSelectorComponent implements OnInit, OnDestroy {

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Editor> {
    return this._store;
  }
  set store(value: EntityStore<Editor>) {
    this._store = value;
  }
  private _store;

  @Output() select = new EventEmitter<Editor>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.store.state.reset();
    this.controller.bind(this.store);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  getEditorTitle(editor: Editor): string {
    return getEntityTitle(editor);
  }

  selectEditor(editor: Editor) {
    this.controller.updateEntityState(editor, {selected: true}, true);
    this.select.emit(editor);
  }
}
