import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import {
  EntityFormField,
  EntityFormFieldInput,
  EntityFormFieldSelectInput,
  EntityFormFieldSelectInputChoice
} from '../shared';

/**
 * This component renders the proper form input based on
 * the field configuration it receives.
 */
@Component({
  selector: 'fadq-entity-form-field',
  templateUrl: './entity-form-field.component.html',
  styleUrls: ['./entity-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormFieldComponent {

  /**
   * Field configuration
   */
  @Input() field: EntityFormField;

  /**
   * The field's form control
   */
  @Input() control: FormControl;

  /**
   * Input configuration found in the field onfiguration
   * @internal
   */
  get input(): EntityFormFieldInput { return this.field.input || {}; }

  /**
   * Input type
   * @internal
   */
  get inputType(): string { return this.input.type || 'text'; }

  /**
   * Select input choices
   * @internal
   */
  get inputChoices(): EntityFormFieldSelectInputChoice[] {
    if (this.inputType === 'select') {
      return (this.input as EntityFormFieldSelectInput).choices || [];
    }
    return [];
  }
}
