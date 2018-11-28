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

import {
  EntityStore,
  EntityStoreController,
  State,
  getEntityId
} from 'src/app/modules/entity';

import { ClientDiagram } from '../shared';

@Component({
  selector: 'fadq-client-diagram-selector',
  templateUrl: './client-diagram-selector.component.html',
  styleUrls: ['./client-diagram-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDiagramSelectorComponent implements OnInit, OnDestroy {

  public diagram$: Observable<ClientDiagram>;

  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<ClientDiagram> {
    return this._store;
  }
  set store(value: EntityStore<ClientDiagram>) {
    this._store = value;
  }
  private _store;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    diagram: ClientDiagram;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    this.diagram$ = this.store
      .observeFirstBy((diagram: ClientDiagram, state: State) => state.selected === true);
  }

  ngOnDestroy() {
    this.controller.unbind();
  }

  getDiagramTitle(diagram: ClientDiagram): string {
    return getEntityId(diagram);
  }

  onSelectionChange(event: {value: ClientDiagram | undefined}) {
    const diagram = event.value;
    if (diagram === undefined) {
      this.controller.updateAllEntitiesState({selected: false});
    } else {
      this.controller.updateEntityState(diagram, {selected: true}, true);
    }

    this.selectedChange.emit({selected: true, diagram});
  }

}
