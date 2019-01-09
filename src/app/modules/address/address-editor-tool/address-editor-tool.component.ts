import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Register } from '@igo2/context';

/**
 * Tool to edit addresses from Adresse Quebec.
 */
@Register({
  name: 'addressEditor',
  title: 'tools.addressEditor',
  icon: 'edit_location'
})
@Component({
  selector: 'fadq-address-editor-tool',
  templateUrl: './address-editor-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressEditorToolComponent {

  constructor() {}
}
