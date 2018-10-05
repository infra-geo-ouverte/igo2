import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Register } from '@igo2/context';

@Register({
  name: 'editAddresses',
  title: 'tools.editAddresses',
  icon: 'edit_location'
})
@Component({
  selector: 'fadq-edit-addresses-tool',
  templateUrl: './edit-addresses-tool.component.html'
})
export class EditAddressesToolComponent {
  constructor() {}
}
