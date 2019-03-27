import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {IterationEffectsService} from './iteration.effects';

@NgModule({
  declarations: [],
  imports: [
    EffectsModule.forFeature([IterationEffectsService])
  ]
})

export class IterationStoreModule { }
