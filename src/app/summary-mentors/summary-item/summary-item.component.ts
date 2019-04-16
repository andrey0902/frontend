import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../models/user.model';
import { MentorProtegeId } from '../shared/models/mentor-protege-id.model';

@Component({
  selector: 'lt-summary-item',
  templateUrl: './summary-item.component.html',
  styleUrls: ['./summary-item.component.scss']
})
export class SummaryItemComponent implements OnInit {
  @Input() userMentor: User;
  @Output() fetchIteration = new EventEmitter<MentorProtegeId>();
  objectValues = Object.values;

  constructor() { }

  ngOnInit() {
  }


  getIteration(protegeId: string) {
    this.fetchIteration.emit(new MentorProtegeId({
      protegeId,
      mentorId: this.userMentor.id
    }));
  }
}
