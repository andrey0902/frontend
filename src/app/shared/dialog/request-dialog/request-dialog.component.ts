import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lt-create-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent  {

  title = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(1000)
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
}
