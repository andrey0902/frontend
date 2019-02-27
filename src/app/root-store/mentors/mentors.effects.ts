import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {UserService} from '../../core/services/user.service';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {LoadMentorsFail, LoadMentorsSuccess, MentorsActionTypes} from './mentors.actions';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';
import {UpdateProteges} from '../proteges/proteges.actions';

@Injectable() export class MentorsEffectService {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  @Effect() getMentors: Observable<Action> = this.actions$.pipe(
    ofType(MentorsActionTypes.LOAD_MENTORS),
    switchMap(() => {
      return this.userService.getMentors({include: 'proteges'}).pipe(
        mergeMap((res: any) => {
          const mentorList = res.data;
          const protegeList = res.included.filter(item => item.type === 'users');
          return [
            new LoadMentorsSuccess(mentorList),
            new UpdateProteges(protegeList)
          ];
        }),
        catchError(err => of(new LoadMentorsFail(err)))
      );
    })
  );
}
