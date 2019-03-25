import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToolComponent, EntityStore } from '@igo2/common';
import { ConfigService } from '@igo2/core';
import { IgoMap } from '@igo2/geo';
import { MapState } from '@igo2/integration';

import { substituteProperties } from 'src/lib/utils';
import {
  Client,
  ClientParcelDiagram,
  ClientParcelYear,
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
export class ClientToolComponent {

  /**
   * Observable of the active client
   * @internal
   */
  get client$(): BehaviorSubject<Client> { return this.clientState.client$; }

  /**
   * Observable of the client error, if any
   * @internal
   */
  get clientError$(): BehaviorSubject<string> { return this.clientState.clientError$; }

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
    private configService: ConfigService
  ) {}

  /**
   * Compute the link to the client's info
   * @internal
   * @param client Client
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
   * @param client Client
   */
  openClientInfoLink(client: Client) {
    window.open(this.computeClientInfoLink(client), 'Client', 'width=800, height=600');
    return false;
  }

}
