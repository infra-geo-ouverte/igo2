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
import { FormControl } from '@angular/forms';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith} from 'rxjs/operators';

import {
  EntityStore,
  EntityStoreController,
  EntityRecord
} from '@igo2/common';

import { Lot, LotResponseItem, LotUnique } from 'src/lib/cadastre/lot/shared/lot.interfaces';

@Component({
  selector: 'fadq-cadastre-lot-selector',
  templateUrl: './cadastre-lot-selector.component.html',
  styleUrls: ['./cadastre-lot-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LotSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current lot
   * @internal
   */
  selected$ = new BehaviorSubject<Lot>(undefined);

  /**
   * Subscription to the selected lot
   */
  private selected$$: Subscription;

  /**
   *Form control used to autocomplete the list box of lots
   */
  public lotControl = new FormControl();

  /**
   *An observable on all lots
   */
  public filteredMun$: Observable<LotResponseItem[]>;

  /**
   * Controller of a lots
   * @internal
   */
  private controller: EntityStoreController<Lot>;

  /**
   * Store that holds all the available Lots
   */
  @Input() store: EntityStore<Lot>;

  /**
   * Event emmit on a selected lot
   */
  @Output() selectedLotChange = new EventEmitter<{
    selected: boolean;
    lot: Lot;
  }>();

  constructor( private cdRef: ChangeDetectorRef) {

  }

  /**
   * Initialisation of the component
   */
  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<Lot>) => record.state.selected === true)
      .subscribe((record: EntityRecord<Lot>) => {
        this.selected$.next(record ? record.entity : undefined);
      });
  }

  /**
   * Destroy the listeners
   */
  ngOnDestroy() {
    this.controller.destroy();
    this.selected$$.unsubscribe();
  }

  /**
   * Return the lot id
   * @param lot A unique lot
   */
  getNomLot(lot: LotUnique): string {
    return  lot.idLot;
  }

  /**
   * Return an event on the lot selection
   * @param event
   */
  onSelectionChange(event: {value: Lot | undefined}) {
    const lot = event.value;
    if (lot === undefined) {
      this.store.state.updateAll({selected: false});
    } else {
      this.store.state.update(lot, {selected: true}, true);
    }
    this.selectedLotChange.emit({selected: true, lot});
  }
}
