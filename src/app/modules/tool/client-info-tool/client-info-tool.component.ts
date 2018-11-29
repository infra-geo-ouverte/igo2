import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from '@igo2/context';

import { EntityStore } from 'src/app/modules/entity';
import {
  Client,
  ClientDiagram,
  ClientSchema,
  ClientParcelYear,
  ClientParcelYearService
} from 'src/app/modules/client';
import { ClientState } from 'src/app/state';

@Register({
  name: 'clientInfo',
  title: 'tools.clientInfo',
  icon: 'person'
})
@Component({
  selector: 'fadq-client-info-tool',
  templateUrl: './client-info-tool.component.html',
  styleUrls: ['./client-info-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class  ClientInfoToolComponent implements OnInit {

  get client$(): Observable<Client> {
    return this.clientState.client$;
  }

  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this.clientState.parcelYearStore;
  }

  get diagramStore(): EntityStore<ClientDiagram> {
    return this.clientState.diagramStore;
  }

  get schemaStore(): EntityStore<ClientSchema> {
    return this.clientState.schemaStore;
  }

  constructor(
    private clientParcelYearService: ClientParcelYearService,
    private clientState: ClientState
  ) {}

  ngOnInit() {
    if (this.parcelYearStore.empty) {
      this.loadParcelYears();
    }
  }

  private loadParcelYears() {
    // TODO: Move that to an initializer to make sure we
    // can use the current year when doing a research for the first time
    this.clientParcelYearService.loadParcelYears()
      .subscribe((parcelYears: ClientParcelYear[]) => {
        const current = parcelYears.find((parcelYear: ClientParcelYear) => {
          return parcelYear.current === true;
        });
        this.parcelYearStore.setEntities(parcelYears);
        this.parcelYearStore.sorter.set({property: 'annee', direction: 'desc'});
        if (current !== undefined) {
          this.parcelYearStore.updateEntityState(current, {selected: true});
        }
      });
  }

}
