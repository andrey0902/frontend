import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store'
import {iterationReducer} from './iteration/iteration.reducer';
import {EffectsModule} from '@ngrx/effects';
import {IterationEffectsService} from './iteration/iteration.effects';
import {planReducer} from './plan/plan.reducer';
import {PlanEffectsService} from './plan/plan.effects';
import {userReducer} from './user/user.reducer';
import {UserEffectsService} from './user/user.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('profile', {
      iteration: iterationReducer,
      plan: planReducer,
      user: userReducer
    }),
    EffectsModule.forFeature([IterationEffectsService, PlanEffectsService, UserEffectsService]),
  ]
})

export class ProfileStoreModule { }
