import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { FormField, FormFieldInputs } from '../shared/form.interfaces';
import { FormFieldService } from '../shared/form-field.service';

/**
 * This component renders the proper form input based on
 * the field configuration it receives.
 */
@Component({
  selector: 'fadq-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {

  /**
   * Field configuration
   */
  @Input() field: FormField;

  constructor(private formFieldService: FormFieldService) {}

  getFieldComponent(): any {
    return this.formFieldService.getFieldByType(this.field.type || 'text');
  }

  getFieldInputs(): FormFieldInputs {
    return Object.assign(
      {placeholder: this.field.title},
      this.field.inputs || {},
      {formControl: this.field.control}
    );
  }

  getFieldSubscribers(): {[key: string]: ({field: FormField, control: FormControl}) => void } {
    return this.field.subscribers || {};
  }
}
