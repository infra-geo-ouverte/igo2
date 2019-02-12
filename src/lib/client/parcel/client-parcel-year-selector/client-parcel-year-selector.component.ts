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

import {
  EntityRecord,
  EntityStore,
  EntityStoreController
} from 'src/lib/entity';

import { ClientParcelYear } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-year-selector',
  templateUrl: './client-parcel-year-selector.component.html',
  styleUrls: ['./client-parcel-year-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelYearSelectorComponent implements OnInit, OnDestroy {

  /**
   * The current parcel year
   * @internal
   */
  public current$ = new BehaviorSubject<ClientParcelYear>(undefined);

  private selected$$: Subscription;

  private controller: EntityStoreController<ClientParcelYear>;

  @Input() store: EntityStore<ClientParcelYear>;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    parcelYear: ClientParcelYear;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.controller = new EntityStoreController(this.store, this.cdRef);
    this.selected$$ = this.store.stateView
      .firstBy$((record: EntityRecord<ClientParcelYear>) => record.state.selected === true)
      .subscribe((record: EntityRecord<ClientParcelYear>) => {
        this.current$.next(record ? record.entity : undefined);
      });
  }

  ngOnDestroy() {
    this.controller.destroy();
    this.selected$$.unsubscribe();
  }

  getParcelYearTitle(parcelYear: ClientParcelYear): string {
    return '' + parcelYear.annee;
  }

  onSelectionChange(event: {value: ClientParcelYear | undefined}) {
    const parcelYear = event.value;
    if (parcelYear === undefined) {
      this.store.state.updateAll({selected: false});
    } else {
      this.store.state.update(parcelYear, {selected: true}, true);
    }

    this.selectedChange.emit({selected: true, parcelYear});
  }

}
