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
  State
} from 'src/lib/entity';

import { ClientParcelYear } from '../shared/client-parcel.interfaces';

@Component({
  selector: 'fadq-client-parcel-year-selector',
  templateUrl: './client-parcel-year-selector.component.html',
  styleUrls: ['./client-parcel-year-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientParcelYearSelectorComponent implements OnInit, OnDestroy {

  public currentParcelYear: ClientParcelYear;

  private parcelYear$$: Subscription;
  private controller: EntityStoreController;

  @Input()
  get store(): EntityStore<ClientParcelYear> {
    return this._store;
  }
  set store(value: EntityStore<ClientParcelYear>) {
    this._store = value;
  }
  private _store;

  @Output() selectedChange = new EventEmitter<{
    selected: boolean;
    parcelYear: ClientParcelYear;
  }>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.controller = new EntityStoreController()
      .withChangeDetector(this.cdRef);
  }

  ngOnInit() {
    this.controller.bind(this.store);
    this.parcelYear$$ = this.store
      .observeFirstBy((parcelYear: ClientParcelYear, state: State) => state.selected === true)
      .subscribe((parcelYear: ClientParcelYear) => this.currentParcelYear = parcelYear);
  }

  ngOnDestroy() {
    this.controller.unbind();
    this.parcelYear$$.unsubscribe();
  }

  getParcelYearTitle(parcelYear: ClientParcelYear): string {
    return '' + parcelYear.annee;
  }

  onSelectionChange(event: {value: ClientParcelYear | undefined}) {
    const parcelYear = event.value;
    if (parcelYear === undefined) {
      this.controller.updateAllEntitiesState({selected: false});
    } else {
      this.controller.updateEntityState(parcelYear, {selected: true}, true);
    }

    this.selectedChange.emit({selected: true, parcelYear});
  }

}
