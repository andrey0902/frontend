import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'lt-portrait-user',
  templateUrl: './portrait-user.component.html',
  styleUrls: ['./portrait-user.component.scss']
})
export class PortraitUserComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
