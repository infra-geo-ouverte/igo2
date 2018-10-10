import { Component } from '@angular/core';

import { Register } from '@igo2/context';

@Register({
  name: 'addressEditor',
  title: 'tools.addressEditor',
  icon: 'edit_location'
})
@Component({
  selector: 'fadq-address-editor-tool',
  templateUrl: './address-editor-tool.component.html'
})
export class AddressEditorToolComponent {
  constructor() {}
}
