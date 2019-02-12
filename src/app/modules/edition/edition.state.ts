import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { EntityRecord, EntityStore } from 'src/lib/entity';
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
   * Register an editor and make it available
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
  setEditor(editor: Editor) {
    const entity = this.store.get(editor.id);
    this.store.state.update(entity, {selected: true}, true);
  }
}
