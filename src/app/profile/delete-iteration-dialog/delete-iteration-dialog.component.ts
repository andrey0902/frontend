/*
import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lt-create-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent  {

  group: FormGroup = new FormGroup({
    reason: new FormControl('', ),
    password: new FormControl('', [Validators.required, Validators.minLength(8), CustomValidators.passwordOnlyNumbers]),
    dropdown: new FormControl('', [Validators.required]),
    textarea: new FormControl('', [Validators.required]),
    checkbox: new FormControl(''),
    firstField: new FormControl(''),
    secondField: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}
*/
