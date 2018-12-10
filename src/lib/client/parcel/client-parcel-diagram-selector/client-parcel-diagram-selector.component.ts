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
  getEntityId
} from 'src/lib/entity';

import { ClientParcelDiagram } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-diagram-selector',
  templateUrl: './client-parcel-diagram-selector.component.html',
  styleUrls: ['./client-parcel-diagram-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelDiagramSelectorComponent implements OnInit, OnDestroy {

  public currentDiagram: ClientParcelDiagram;

  private diagram$$: Subscription;
  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<ClientParcelDiagram> {
    return this._store;
  }
  set store(value: EntityStore<ClientParcelDiagram>) {
    this._store = value;
  }
  private _store;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    diagram: ClientParcelDiagram;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    this.diagram$$ = this.store
      .observeFirstBy((diagram: ClientParcelDiagram, state: State) => state.selected === true)
      .subscribe((diagram: ClientParcelDiagram) => this.currentDiagram = diagram);
  }

  ngOnDestroy() {
    this.controller.unbind();
    this.diagram$$.unsubscribe();
  }

  getDiagramTitle(diagram: ClientParcelDiagram): string {
    return getEntityId(diagram);
  }

  onSelectionChange(event: {value: ClientParcelDiagram | undefined}) {
    const diagram = event.value;
    if (diagram === undefined) {
      this.controller.updateAllEntitiesState({selected: false});
    } else {
      this.controller.updateEntityState(diagram, {selected: true}, true);
    }

    this.selectedChange.emit({selected: true, diagram});
  }

}
