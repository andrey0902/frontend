import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {currentUserReducer} from './current-user.reducer';
import {EffectsModule} from '@ngrx/effects';
import {CurrentUserEffectService} from './current-user.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('currentUser', currentUserReducer),
    EffectsModule.forFeature([CurrentUserEffectService])
  ]
})
export class CurrentUserStoreModule { }
