import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { EntityStore, State, getEntityId } from 'src/app/modules/entity';
import { Editor } from 'src/app/modules/edition';

@Injectable({
  providedIn: 'root'
})
export class EditionState {

  public editor$ = new BehaviorSubject<Editor>(undefined);

  get store(): EntityStore<Editor> {
    return this._store;
  }
  private _store: EntityStore<Editor>;

  constructor() {
    this._store = new EntityStore<Editor>();
    this._store
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.editor$.next(editor));
  }

  register(editor: Editor) {
    this.store.addEntities([editor]);
  }

  selectEditor(editor: Editor) {
    const entity = this.store.getEntityById(getEntityId(editor));
    this.store.updateEntityState(entity, {selected: true}, true);
  }
}
