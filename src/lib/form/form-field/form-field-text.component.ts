import {
  Input,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { formControlIsRequired } from '../shared/form.utils';
import { FormFieldComponent } from '../shared/form-field-component';

/**
 * This component renders a text field
 */
@FormFieldComponent('text')
@Component({
  selector: 'fadq-form-field-text',
  templateUrl: './form-field-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldTextComponent {

  /**
   * The field's form control
   */
  @Input() formControl: FormControl;

  /**
   * Field placeholder
   */
  @Input() placeholder: string;

  /**
   * Whether the field is required
   */
  get required(): boolean {
    return formControlIsRequired(this.formControl);
  }

}
