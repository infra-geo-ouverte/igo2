import { Component } from '@angular/core';

import { Register } from '@igo2/context';


@Register({
  name: 'clientInfo',
  title: 'tools.clientInfo',
  icon: 'person'
})
@Component({
  selector: 'fadq-client-info-tool',
  templateUrl: './client-info-tool.component.html'
})
export class  ClientInfoToolComponent {
  constructor() {}
}
