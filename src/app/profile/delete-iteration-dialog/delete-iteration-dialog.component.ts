import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lt-delete-iteration-dialog',
  templateUrl: './delete-iteration-dialog.component.html',
  styleUrls: ['./delete-iteration-dialog.component.scss']
})
export class DeleteIterationDialogComponent {

  group: FormGroup = new FormGroup({
    conclusion: new FormControl(''),
    test_project: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  onSubmit($event) {
    $event.preventDefault();
  }
}
