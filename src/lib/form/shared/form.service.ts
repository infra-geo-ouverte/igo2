import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';


import {
  Form,
  FormField,
  FormFieldConfig,
  FormFieldGroup,
  FormFieldGroupConfig
} from 'src/lib/form';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private formBuilder: FormBuilder) {}

  form(fields: FormField[], groups: FormFieldGroup[]): Form {
    const control = this.formBuilder.group({});
    fields.forEach((field: FormField) => {
      control.addControl(field.name, field.control);
    });
    groups.forEach((group: FormFieldGroup) => {
      control.addControl(group.name, group.control);
    });

    return {fields, groups, control};
  }

  group(config: FormFieldGroupConfig, fields: FormField[]): FormFieldGroup {
    const control = this.formBuilder.group({});
    fields.forEach((field: FormField) => {
      control.addControl(field.name, field.control);
    });

    return Object.assign({}, config, {fields, control}) as FormFieldGroup;
  }

  field(config: FormFieldConfig): FormField {
    const options = config.options || {};
    const state = Object.assign({value: ''}, {
      disabled: options.disabled
    });
    const control = this.formBuilder.control(state);
    control.setValidators(options.validator);

    return Object.assign({type: 'text'}, config, {control}) as FormField;
  }

  extendFieldConfig(config: FormFieldConfig, partial: Partial<FormFieldConfig>): FormFieldConfig {
    const options = Object.assign({}, config.options || {}, partial.options || {});
    const inputs = Object.assign({}, config.inputs || {}, partial.inputs || {});
    const subscribers = Object.assign({}, config.subscribers || {}, partial.subscribers || {});
    return Object.assign({}, config, {options, inputs, subscribers});
  }

}
