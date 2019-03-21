import { AbstractControl } from '@angular/forms';
import { Moment } from 'moment';

export class LtValidators {
  public static checkSpace(control: AbstractControl) {
    if (control.value !== null) {
      return (!control.value.trim().length && control.value.length) ? {strEmpty: true} : null;
    }
  }

  public static checkDataStartIteration(control: AbstractControl) {
    // check first if date valid or on
    const value: Moment = control.value;

    if (value && value.valueOf()) {
      console.log(value.isSameOrAfter(new Date()));

      if (value.isSameOrAfter(new Date())) {
        return null;
      } else {
        return { startDateIteration: true };
      }
    }
    return null;
  }
}
