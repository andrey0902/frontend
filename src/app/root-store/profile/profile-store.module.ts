import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store'
import {EffectsModule} from '@ngrx/effects';
import {IterationEffectsService} from './iteration/iteration.effects';
import {PlanEffectsService} from './plan/plan.effects';
import {UserEffectsService} from './user/user.effects';
import {PlanStoreModule} from './plan/plan-store.module';
import {profileReducers} from './profile.reducer';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('profile', profileReducers),
    EffectsModule.forFeature([IterationEffectsService, PlanEffectsService, UserEffectsService]),
    PlanStoreModule
  ]
})

export class ProfileStoreModule { }
