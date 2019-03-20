import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Validator} from '@angular/forms/src/directives/validators';

@Component({
  selector: 'lt-delete-iteration-dialog',
  templateUrl: './delete-iteration-dialog.component.html',
  styleUrls: ['./delete-iteration-dialog.component.scss']
})
export class DeleteIterationDialogComponent {

  group: FormGroup = new FormGroup({
    conclusion: new FormControl('', [Validators.required]),
    test_project: new FormControl(null)
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  onSubmit($event) {
    $event.preventDefault();
  }
}
