import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'lt-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {
  @Input() userMentor: User;

  objectValues = Object.values;

  constructor() { }

  ngOnInit() {
  }

}
