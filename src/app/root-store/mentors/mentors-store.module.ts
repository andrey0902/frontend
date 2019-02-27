import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {mentorsReducer} from './mentors.reducer';
import {MentorsEffectService} from './mentors.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('mentors', mentorsReducer),
    EffectsModule.forFeature([MentorsEffectService])
  ]
})
export class MentorsStoreModule { }
