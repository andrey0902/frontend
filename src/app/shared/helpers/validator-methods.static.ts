import {AbstractControl, ValidationErrors} from '@angular/forms';
import {Moment} from 'moment';

export class LtValidators {
  public static checkSpace(control: AbstractControl) {
    if (control.value !== null) {
      return (!control.value.trim().length && control.value.length) ? {strEmpty: true} : null;
    }
  }

  public static checkDataStartIteration(control: AbstractControl) {
    const value: Moment = control.value;

    if (value && value.valueOf()) {

      if (value.isSameOrAfter(new Date())) {
        return null;
      } else {
        return {startDateIteration: true};
      }
    }
    return null;
  }

  public static checkEndDateIteration(control: AbstractControl) {
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;

    if (startDate && endDate) {

      if (endDate.diff(startDate, 'months', true) < 1) {
        control.get('endDate').setErrors({endDateMin: true});
      } else if (endDate.diff(startDate, 'months', true) >= 6) {
        control.get('endDate').setErrors({endDateMax: true});
      } else {
        control.get('endDate').setErrors(null);
        return null;
      }

    }
  }

  public static noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value === 'string') {
      const isWhitespace = (control.value || '').trim().length === 0;
      return isWhitespace ? {whitespace: 'value is only whitespace'} : null;
    }
    return null;
  }
}
