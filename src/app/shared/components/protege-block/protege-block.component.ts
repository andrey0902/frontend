import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { User, UsersMap } from '../../../models/user.model';
import { sortByLastName } from '../../../root-store/mentors/mentors.selectors';

@Component({
  selector: 'lt-protege-block',
  templateUrl: './protege-block.component.html',
  styleUrls: ['./protege-block.component.scss']
})
export class ProtegeBlockComponent implements OnInit, OnChanges {
  @Input() protege: UsersMap;
  @Input() isAdmin: boolean;
  @Input() currentUser: User;
  @Input() mentorship: any;
  @Input() showAction = true;
  @Output() onChangeMentor = new EventEmitter<{mentorship: any, protege: User}>();
  @Output() onDeleteProtege = new EventEmitter<{mentorship: any, protege: User}>();

  public listProtege: User[];
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    this.handleUser(this.protege);
  }

  public changeMentor(protege): void {
    this.onChangeMentor.emit({mentorship: this.mentorship, protege});
  }

  public deleteProtege(protege): void {
    this.onDeleteProtege.emit({mentorship: this.mentorship, protege});
  }

  private handleUser(users: UsersMap): void {
    if (users) {
      this.listProtege = Object.values(users).sort(sortByLastName);
    }
  }
}
