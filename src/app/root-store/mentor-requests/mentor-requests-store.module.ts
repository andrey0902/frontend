import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {mentorRequestsReducer} from './mentor-requests.reducer';
import {EffectsModule} from '@ngrx/effects';
import {MentorRequestsEffectService} from './mentor-requests.effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('mentorRequests', mentorRequestsReducer),
    EffectsModule.forFeature([MentorRequestsEffectService])
  ]
})
export class MentorRequestsStoreModule { }
