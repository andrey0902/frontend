import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {DialogService} from '../../shared/dialog/services/dialog.service';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {MentorRequestMap} from '../../models/mentor-request';
import {AssignMentor, DeleteProtegeRequest, LoadProtegeRequests} from '../../root-store/protege-requests/protege-requests.actions';
import {selectProtegeRequests} from '../../root-store/protege-requests/protege-requests.selectors';

@Component({
  selector: 'lt-need-a-mentor',
  templateUrl: './need-a-mentor.component.html',
  styleUrls: ['./need-a-mentor.component.scss']
})
export class NeedAMentorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private store: Store<any>
  ) { }

  requests$: Observable<MentorRequestMap>;
  objectValues = Object.values;

  ngOnInit() {
    this.requests$ = this.store.select(selectProtegeRequests);
    this.store.dispatch(new LoadProtegeRequests());
  }

  assignMentor(request) {
    this.dialogService.openMentorshipManagementDialog({
      mode: 'assignMentor',
      protege: request.attributes.user.attributes
    }, (mentor) => {
      if (mentor) {
        this.store.dispatch(new AssignMentor({ protegeId: request.attributes.user.id, mentorId: mentor.id, requestId: request.id }));
      }
    });
  }

  clearStatus(request) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус «Нуждаюсь в менторе» для <b>${request.attributes.user.attributes.fullName}</b> ?</p>`;

    this.dialogService.openConfirmDialog({htmlContent}, (confirm) => {
      if (confirm) { this.store.dispatch(new DeleteProtegeRequest( request.id )); }
    });
  }

  checkIsEmpty(obj): boolean {
    return Object.values(obj).length !== 0;
  }
}
