import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'lt-create-request-dialog',
  templateUrl: './create-request-dialog.component.html',
  styleUrls: ['./create-request-dialog.component.scss']
})
export class CreateRequestDialogComponent implements OnInit {

  title = new FormControl('');

  ngOnInit() {
  }

}
