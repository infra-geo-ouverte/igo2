import { AbstractControl } from '@angular/forms';

export function formControlIsRequired(control: AbstractControl): boolean {
  if (control.validator) {
      const validator = control.validator({} as AbstractControl);
      if (validator && validator.required) {
        return true;
      }
  }

  if (control['controls']) {
    Object.keys(control['controls']).find((key: string) => {
      return formControlIsRequired(control['controls'][key]);
    });
  }

  return false;
}
