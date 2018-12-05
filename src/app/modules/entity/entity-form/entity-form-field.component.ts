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

@Component({
  selector: 'fadq-entity-form-field',
  templateUrl: './entity-form-field.component.html',
  styleUrls: ['./entity-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityFormFieldComponent {

  @Input()
  get field(): EntityFormField {
    return this._field;
  }
  set field(value: EntityFormField) {
    this._field = value;
  }
  private _field: EntityFormField;

  @Input()
  get control(): FormControl {
    return this._control;
  }
  set control(value: FormControl) {
    this._control = value;
  }
  private _control: FormControl;

  get input(): EntityFormFieldInput {
    return this.field.input || {};
  }

  get inputType(): string {
    return this.input.type || 'text';
  }

  get inputChoices(): EntityFormFieldSelectInputChoice[] {
    if (this.inputType === 'select') {
      return (this.input as EntityFormFieldSelectInput).choices || [];
    }
    return [];
  }
}
