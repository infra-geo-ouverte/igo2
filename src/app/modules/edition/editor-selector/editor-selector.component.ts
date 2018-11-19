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

import { Editor } from '../shared/editor';
import { Entity } from '../../entity/shared/entity.interface';
import { EntityStore } from '../../entity/shared/store';
import { EntityStoreController } from '../../entity/shared/controller';


@Component({
  selector: 'fadq-editor-selector',
  templateUrl: './editor-selector.component.html',
  styleUrls: ['./editor-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorSelectorComponent implements OnInit, OnDestroy {

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<Entity<Editor>> {
    return this._store;
  }
  set store(value: EntityStore<Entity<Editor>>) {
    this._store = value;
  }
  private _store;

  @Output() select = new EventEmitter<Entity<Editor>>();
  @Output() unselect = new EventEmitter<Entity<Editor>>();

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

  selectEditor(editor: Entity<Editor>) {
    this.controller.updateEntityState(editor, {
      selected: true
    }, true);

    this.select.emit(editor);
  }
}
