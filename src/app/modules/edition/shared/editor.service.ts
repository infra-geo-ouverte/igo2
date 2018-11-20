import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { Editor } from './editor';
import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { editorToEntity } from './edition.utils';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  get store(): EntityStore<Entity<Editor>> {
    return this._store;
  }
  private _store: EntityStore<Entity<Editor>>;

  get observable(): Subject<Entity<Editor>> {
    return this._observable;
  }
  private _observable = new Subject<Entity<Editor>>();

  constructor() {
    this._store = new EntityStore<Entity<Editor>>();
    this._store.observeFirstBy((editor: Entity<Editor>) => {
      return this.store.getEntityState(editor).selected === true;
    }).subscribe((editor: Entity<Editor>) => this.observable.next(editor));
  }

  register(editor: Editor) {
    this.store.addEntities([editorToEntity(editor)]);
  }

  selectEditor(editor: Editor) {
    const entity = this.store.getEntityByRid(editor.id);
    this.store.updateEntityState(entity, {selected: true}, true);
  }
}
