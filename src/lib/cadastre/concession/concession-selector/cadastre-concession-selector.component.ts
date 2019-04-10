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

import { Concession, ConcessionResponseItem, ConcessionUnique } from 'src/lib/cadastre/concession/shared/concession.interfaces';

@Component({
  selector: 'fadq-cadastre-concession-selector',
  templateUrl: './cadastre-concession-selector.component.html',
  styleUrls: ['./cadastre-concession-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConcessionSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current concession
   * @internal
   */
  selected$ = new BehaviorSubject<Concession>(undefined);

  /**
   * Subscription to the selected entity
   */
  private selected$$: Subscription;

  /**
   *Form control used to autocomplete the list box of concessions
   */
  public concessionControl = new FormControl();

    /**
   *An observable on all concessions
   */
  public filteredMun$: Observable<ConcessionResponseItem[]>;

  /**
   * Controller of a concessions
   * @internal
   */
  private controller: EntityStoreController<Concession>;

  /**
   * Store that holds all the available Concessions
   */
  @Input() store: EntityStore<Concession>;

  /**
   * Event emmit on a selected concession
   */
  @Output() selectedConcessionChange = new EventEmitter<{
    selected: boolean;
    concession: Concession;
  }>();

  constructor( private cdRef: ChangeDetectorRef) {

  }

  /**
   * Initialisation of the component
   */
  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<Concession>) => record.state.selected === true)
      .subscribe((record: EntityRecord<Concession>) => {
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
   * Return the concession name
   * @param mun
   */
  getNomConcession(concession: ConcessionUnique): string {
    return  concession.idConcession;
  }

  /**
   * Return an event on the concession selection
   * @param event
   */
  onSelectionChange(event: {value: Concession | undefined}) {
    const concession = event.value;
    if (concession === undefined) {
      this.store.state.updateAll({selected: false});
    } else {
      this.store.state.update(concession, {selected: true}, true);
    }
    this.selectedConcessionChange.emit({selected: true, concession});
  }
}
