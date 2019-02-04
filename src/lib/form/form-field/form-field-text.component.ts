import {
  Input,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

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

}
