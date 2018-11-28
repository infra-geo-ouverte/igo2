import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { Register } from '@igo2/context';

import { EntityStore } from 'src/app/modules/entity';
import { Client, ClientDiagram, ClientSchema } from 'src/app/modules/client';
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
export class  ClientInfoToolComponent {

  get client$(): Observable<Client> {
    return this.clientState.client$;
  }

  get diagramStore(): EntityStore<ClientDiagram> {
    return this.clientState.diagramStore;
  }

  get schemaStore(): EntityStore<ClientSchema> {
    return this.clientState.schemaStore;
  }

  constructor(private clientState: ClientState) {}
}
