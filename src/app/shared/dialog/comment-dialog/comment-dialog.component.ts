import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'lt-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  title = new FormControl('', [
    Validators.maxLength(1000)
  ]);

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    this.title.setValue(this.data.value);
  }
}
