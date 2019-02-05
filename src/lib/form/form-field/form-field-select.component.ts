import {
  Input,
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { formControlIsRequired } from '../shared/form.utils';
import { FormFieldSelectChoice } from '../shared/form.interfaces';
import { FormFieldComponent } from '../shared/form-field-component';

/**
 * This component renders a select field
 */
@FormFieldComponent('select')
@Component({
  selector: 'fadq-form-field-select',
  templateUrl: './form-field-select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldSelectComponent {

  public choices$: Observable<FormFieldSelectChoice[]>;

  /**
   * The field's form control
   */
  @Input() formControl: FormControl;

  /**
   * Field placeholder
   */
  @Input() placeholder: string;

  /**
   * Select input choices
   */
  @Input()
  set choices(value: Observable<FormFieldSelectChoice[]> | FormFieldSelectChoice[]) {
    if (value instanceof Observable) {
      this.choices$ = value;
    } else {
      this.choices$ = of(value);
    }
  }

  /**
   * Whether the field is required
   */
  get required(): boolean {
    return formControlIsRequired(this.formControl);
  }

}
