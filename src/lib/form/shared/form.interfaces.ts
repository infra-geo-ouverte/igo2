import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';

export interface Form {
  fields: FormField[];
  groups: FormFieldGroup[];
  control: FormGroup;
}

export interface FormFieldGroupConfig {
  name: string;
}

export interface FormFieldGroup extends FormFieldGroupConfig {
  fields: FormField[];
  control: FormGroup;
}

export interface FormFieldConfig<T extends FormFieldInputs = FormFieldInputs> {
  name: string;
  title: string;

  type?: string;
  options?: FormFieldOptions;
  inputs?: T;
  subscribers?: {[key: string]: ({field: FormField, control: FormControl}) => void};
}

export interface FormField<T extends FormFieldInputs = FormFieldInputs> extends FormFieldConfig<T> {
  control: FormControl;
}

export interface FormFieldOptions {
  validator?: ValidatorFn;
  disabled?: boolean;
  visible?: boolean;
  cols?: number;
}

export interface FormFieldInputs {}

export interface FormFieldSelectInputs extends FormFieldInputs {
  choices: Observable<FormFieldSelectChoice[]> | FormFieldSelectChoice[];
}

export interface FormFieldSelectChoice {
  value: any;
  title: string;
}
