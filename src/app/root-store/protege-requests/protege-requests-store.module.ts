import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {protegeRequestsReducer} from './protege-requests.reducer';
import {ProtegeRequestsEffectService} from './protege-requests.effects';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('protegeRequests', protegeRequestsReducer),
    EffectsModule.forFeature([ProtegeRequestsEffectService])
  ]
})
export class ProtegeRequestsStoreModule { }
