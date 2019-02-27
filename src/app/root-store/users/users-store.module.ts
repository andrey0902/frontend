import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from './users.reducer';
import {EffectsModule} from '@ngrx/effects';
import {UsersEffectService} from './users.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffectService])
  ]
})
export class UsersStoreModule { }
