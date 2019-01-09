import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { EntityStore, State, getEntityId } from 'src/lib/entity';
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
    this._store = new EntityStore<Editor>();
    this._store
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.editor$.next(editor));
  }

  /**
   * Register an editor and make it available
   * @param editor
   */
  register(editor: Editor) {
    this.store.appendEntities([editor]);
  }

  /**
   * Unregister an editor and make it unavailable
   * @param editor
   */
  unregister(editor: Editor) {
    this.store.removeEntities([editor]);
  }

  /**
   * Set the active editor
   * @param editor
   */
  setEditor(editor: Editor) {
    const entity = this.store.getEntityById(getEntityId(editor));
    this.store.updateEntityState(entity, {selected: true}, true);
  }
}
