import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ToolComponent, EntityStore } from '@igo2/common';
import { ConfigService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { substituteProperties } from 'src/lib/utils';
import {
  Client,
  ClientParcelDiagram,
  ClientParcelYear,
  ClientParcelYearService,
  ClientSchema,
} from 'src/lib/client';

import { ClientState } from '../client.state';

/**
 * Tool to display a client's info
 */
@ToolComponent({
  name: 'client',
  title: 'tools.client',
  icon: 'person'
})
@Component({
  selector: 'fadq-client-tool',
  templateUrl: './client-tool.component.html',
  styleUrls: ['./client-tool.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientToolComponent implements OnInit {

  /**
   * Observable of the active client
   * @internal
   */
  get client$(): Observable<Client> { return this.clientState.client$; }

  /**
   * Store holding all the avaiables "parcel years"
   * @internal
   */
  get parcelYearStore(): EntityStore<ClientParcelYear> {
    return this.clientState.parcelYearStore;
  }

  /**
   * Store holding the active client's diagrams
   * @internal
   */
  get diagramStore(): EntityStore<ClientParcelDiagram> {
    return this.clientState.diagramStore;
  }

  /**
   * Store holding the active client's schemas
   * @internal
   */
  get schemaStore(): EntityStore<ClientSchema> {
    return this.clientState.schemaStore;
  }

  get map(): IgoMap { return this.mapState.map; }

  constructor(
    private clientState: ClientState,
    private mapState: MapState,
    private clientParcelYearService: ClientParcelYearService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    if (this.parcelYearStore.empty) {
      this.loadParcelYears();
    }
  }

  /**
   * Compute the link to the client's info
   * @internal
   * @param client
   * @returns External link to the client's info
   */
  computeClientInfoLink(client: Client): string {
    const baseUrl = this.configService.getConfig('client.infoLink');
    return  substituteProperties(baseUrl, {
      clientNum: client.info.numero
    });
  }

  /**
   * Open the client's info link into a new window
   * @internal
   * @param client
   */
  openClientInfoLink(client: Client) {
    window.open(this.computeClientInfoLink(client), 'Client', 'width=800, height=600');
    return false;
  }

  /**
   * Load the parcel years
   */
  private loadParcelYears() {
    this.clientParcelYearService.getParcelYears()
      .subscribe((parcelYears: ClientParcelYear[]) => {
        const current = parcelYears.find((parcelYear: ClientParcelYear) => {
          return parcelYear.current === true;
        });
        this.parcelYearStore.load(parcelYears);
        this.parcelYearStore.view.sort({
          valueAccessor: (year: ClientParcelYear) => year.annee,
          direction: 'desc'
        });
        if (current !== undefined) {
          this.parcelYearStore.state.update(current, {selected: true});
        }
      });
  }

}
