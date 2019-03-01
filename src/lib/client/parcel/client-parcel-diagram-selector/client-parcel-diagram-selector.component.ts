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

import { BehaviorSubject, Subscription } from 'rxjs';

import { EntityRecord, EntityStore, EntityStoreController } from '@igo2/common';

import { ClientParcelDiagram } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-diagram-selector',
  templateUrl: './client-parcel-diagram-selector.component.html',
  styleUrls: ['./client-parcel-diagram-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelDiagramSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current diagram
   * @internal
   */
  public current$ = new BehaviorSubject<ClientParcelDiagram>(undefined);

  private selected$$: Subscription;

  private controller: EntityStoreController<ClientParcelDiagram>;

  @Input() store: EntityStore<ClientParcelDiagram>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    diagram: ClientParcelDiagram;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<ClientParcelDiagram>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientParcelDiagram>) => {
        this.current$.next(record ? record.entity : undefined);
      });
  }

  ngOnDestroy() {
    this.controller.destroy();
    this.selected$$.unsubscribe();
  }

  getDiagramId(diagram: ClientParcelDiagram): number {
    return diagram.id;
  }

  onSelectionChange(event: {value: ClientParcelDiagram | undefined}) {
    const diagram = event.value;
    if (diagram === undefined) {
      this.store.state.updateAll({selected: false});
    } else {
      this.store.state.update(diagram, {selected: true}, true);
    }

    this.selectedChange.emit({selected: true, diagram});
  }

}
