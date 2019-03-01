import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { EntityRecord, EntityStore } from '@igo2/common';
import { Editor } from 'src/lib/edition';

/**
 * Service that holds the state of the edition module
 */
@Injectable({
  providedIn: 'root'
})
export class EditionState {

  /**
   * Observable of the active editor
   */
  public editor$ = new BehaviorSubject<Editor>(undefined);

  /**
   * Store that holds all the available editors
   */
  get store(): EntityStore<Editor> { return this._store; }
  private _store: EntityStore<Editor>;

  constructor() {
    this._store = new EntityStore<Editor>([]);
    this._store.stateView
      .firstBy$((record: EntityRecord<Editor>) => record.state.selected === true)
      .subscribe((record: EntityRecord<Editor>) => {
        const editor = record ? record.entity : undefined;
        this.editor$.next(editor);
      });
  }

  /**
   * ToolComponent an editor and make it available
   * @param editor
   */
  register(editor: Editor) {
    this.store.insert(editor);
  }

  /**
   * Unregister an editor and make it unavailable
   * @param editor
   */
  unregister(editor: Editor) {
    this.store.delete(editor);
  }

  /**
   * Set the active editor
   * @param editor
   */
  setEditor(editor: Editor | undefined) {
    if (editor === undefined) {
      this.store.state.updateAll({selected: false});
    } else {
      const entity = this.store.get(editor.id);
      this.store.state.update(entity, {selected: true}, true);
    }
  }
}
