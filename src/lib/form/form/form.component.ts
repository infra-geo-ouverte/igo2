import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import t from 'typy';

import { Form, FormField, FormFieldGroup } from '../shared/form.interfaces';

/**
 * A configurable form
 */
@Component({
  selector: 'fadq-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnChanges {

  /**
   * Form
   */
  @Input() form: Form;

  /**
   * Input data
   */
  @Input() formData: { [key: string]: any};

  /**
   * Event emitted when the form is submitted
   */
  @Output() submitForm = new EventEmitter<{[key: string]: any}>();

  constructor() {}

  /**
   * Is the entity or the template change, recreate the form or repopulate it.
   * @param changes
   * @internal
   */
  ngOnChanges(changes: SimpleChanges) {
    const formData = changes.formData;
    if (formData && formData.currentValue !== formData.previousValue) {
      if (formData.currentValue === undefined) {
        this.clear();
      } else {
        this.setData(formData.currentValue);
      }
    }
  }

  /**
   * Transform the form data to a feature and emit an event
   * @param event Form submit event
   * @internal
   */
  onSubmit() {
    this.submitForm.emit(this.getData());
  }

  private setData(data: {[key: string]: any}) {
    this.form.fields.forEach((field: FormField) => {
      field.control.setValue(t(data, field.name).safeObject);
    });

    this.form.groups.forEach((group: FormFieldGroup) => {
      group.fields.forEach((field: FormField) => {
        field.control.setValue(t(data, field.name).safeObject);
      });
    });
  }

  private getData(): { [key: string]: any} {
    const data = {};
    this.form.fields.forEach((field: FormField) => {
      data[field.name] = field.control.value;
    });

    this.form.groups.forEach((group: FormFieldGroup) => {
      Object.assign(data, group.control.value);
    });
    return data;
  }

  /**
   * Clear form
   */
  private clear() {
    this.form.control.reset();
  }

}
