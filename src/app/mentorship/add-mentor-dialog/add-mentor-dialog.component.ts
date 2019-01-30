import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';

export interface DialogData {
  mentor: string;
}

@Component({
  selector: 'lt-add-mentor-dialog',
  templateUrl: './add-mentor-dialog.component.html',
  styleUrls: ['./add-mentor-dialog.component.scss']
})
export class AddMentorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  userInput: FormControl = new FormControl('');
  options = [
    'one',
    'two',
    'three'
  ];
}
