import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {planReducer} from './plan.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PlanEffectsService} from './plan.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('plan', planReducer),
    EffectsModule.forFeature([PlanEffectsService])
  ]
})

export class PlanStoreModule { }
