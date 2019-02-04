import { FormFieldService } from './form-field.service';

export function FormFieldComponent(type: string): (cls: any) => any {
  return function (compType: any) {
    FormFieldService.register(type, compType);
  };
}
