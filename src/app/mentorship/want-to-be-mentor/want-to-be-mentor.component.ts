import { Component, OnInit } from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {DialogService} from '../../shared/dialog/services/dialog.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectMentorRequests} from '../../root-store/mentor-requests/mentor-requests.selectors';
import {DeleteMentorRequest, LoadMentorRequests, MakeMentor} from '../../root-store/mentor-requests/mentor-requests.actions';
import {MentorRequestMap} from '../../models/mentor-request';

@Component({
  selector: 'lt-want-to-be-mentor',
  templateUrl: './want-to-be-mentor.component.html',
  styleUrls: ['./want-to-be-mentor.component.scss']
})
export class WantToBeMentorComponent implements OnInit {

  constructor(
    private userService: UserService,
    private dialogService: DialogService,
    private store: Store<any>
  ) { }

  requests$: Observable<MentorRequestMap>;
  objectValues = Object.values;

  ngOnInit() {
    this.requests$ = this.store.select(selectMentorRequests);
    this.store.dispatch(new LoadMentorRequests());
  }

  makeMentor(request) {
    const htmlContent = `<p>Вы уверены, что нужно назначить <b>${request.attributes.user.attributes.fullName}</b> ментором ?</p>`;
    this.dialogService.openConfirmDialog({ isAssign: true, htmlContent }, (confirm) => {
      if (confirm) {
        this.store.dispatch(new MakeMentor({ requestId: request.id, userId: request.attributes.user.id }));
      }
    });
  }

  clearStatus(request) {
    const htmlContent = `<p>Вы уверены, что хотите очистить статус «Хочу быть ментором» для <b>${request.attributes.user.attributes.fullName}</b> ?</p>`;
    this.dialogService.openConfirmDialog({ htmlContent }, (confirm) => {
      if (confirm) {
        this.store.dispatch(new DeleteMentorRequest(request.id));
      }
    });
  }

}
