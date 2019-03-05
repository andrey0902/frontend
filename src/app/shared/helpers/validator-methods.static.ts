import { AbstractControl } from '@angular/forms';

export class LtValidators {
  public static checkSpace(control: AbstractControl) {
    if (control.value !== null) {
      return (!control.value.trim().length && control.value.length) ? {strEmpty: true} : null;
    }
  }
}
