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

import { Observable } from 'rxjs';

import { getEntityTitle } from '../../entity/shared/entity.utils';
import { State } from '../../entity/shared/entity.interface';
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

  public editor$: Observable<Editor>;

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
    this.controller.bind(this.store);
    this.editor$ = this.store
      .observeFirstBy((editor: Editor, state: State) => state.selected === true);
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
