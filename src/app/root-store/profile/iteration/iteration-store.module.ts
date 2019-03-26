import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {iterationReducer} from './iteration.reducer';
import {IterationEffectsService} from './iteration.effects';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forFeature([IterationEffectsService])
  ]
})

export class IterationStoreModule { }
